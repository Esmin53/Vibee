import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { MessageValidator } from "@/lib/validators/message"
import { data } from "autoprefixer"
import { getServerSession } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const q = url.searchParams.get('q')

        if(!q) {
            return new NextResponse(JSON.stringify(q), {status: 404})
        }

        const session = await getServerSession(authOptions)
    
        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
        }

        const conversation = await db.conversation.findFirst({
            where: {
                OR: [
                    {
                        UserAId: q,
                        UserBId: session.user.id
                    
                    },
                    {
                        UserBId: q,
                        UserAId: session.user.id
                    
                    },
                ]
            },
            include: {
                messages: {
                    take: 20,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        sender: true,
                        reciever: true
                    }
                }
            }
        })
        
        return new NextResponse(JSON.stringify(conversation), {status: 200})
    } catch (error) {
        console.log(error)
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json()

    const {text, recieverId} = MessageValidator.parse(body)

    const session = await getServerSession(authOptions)
    
    if(!session || !session.user) {
        return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
    }

    // This part checks if a conversation between the two users already exists
    let conversation = await db.conversation.findFirst({
        where: {
            OR: [
                {
                    UserAId: recieverId,
                    UserBId: session.user.id
                },
                {
                    UserBId: recieverId,
                    UserAId: session.user.id
                }
            ]

        }
        
    })


    if(!conversation) {
        conversation = await db.conversation.create({
            data: {
                UserAId: recieverId,
                UserBId: session.user.id
            }
        })
    }

    const message = await db.message.create({
        data: {
            senderId: session.user.id,
            recieverId,
            text,
            conversationId: conversation.id
        },
        include: {
            sender: true,
            reciever: true
        }        
    })

    let sortedIds = [session.user.id, recieverId].sort()
    console.log(`${sortedIds[0]}${sortedIds[1]}`)

    


    await pusherServer.trigger(
        toPusherKey(`conversation:${`${sortedIds[0]}${sortedIds[1]}`}`), 
        'incoming-message', 
        message
    )

    await pusherServer.trigger(
        toPusherKey(`message:${recieverId}`), 
        'newest-message', 
        {
            name: message.sender.name,
            image: message.sender.image,
            text: message.text,
            sentAt: message.createdAt,
            senderId: message.senderId,
            recieverId: message.recieverId,
            conversationId: message.conversationId,
            id: message.sender.id,
            
        }
    )

    await pusherServer.trigger(
        toPusherKey(`message:${session.user.id}`), 
        'newest-message', 
        {
            name: message.reciever.name,
            image: message.reciever.image,
            text: message.text,
            sentAt: message.createdAt,
            senderId: message.senderId,
            recieverId: message.recieverId,
            conversationId: message.conversationId,
            id: message.reciever.id,
        }
    )

    return new NextResponse(JSON.stringify(message), {status: 200} )
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), {status: 500} )
    }
}