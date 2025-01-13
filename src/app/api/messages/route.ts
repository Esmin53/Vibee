import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { MessageValidator } from "@/lib/validators/message"
import { getServerSession } from "next-auth"
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

            let sortedIds = [q, session.user.id].sort()
            let sortedIdString = `${sortedIds[0]}${sortedIds[1]}`

        const conversation = await db.conversation.findFirst({
            where: {
                id: sortedIdString
            },
            include: {
                messages: {
                    take: 20,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                image: true,
                                name: true
                            }
                        },
                        reciever: {
                            select: {
                                id: true,
                                image: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        const messages = await db.message.findMany({
            where: {
                conversationId: sortedIdString
            },
            select: {
                senderId: true,
                recieverId: true,
                text: true,
                id: true,
                createdAt: true
            },
            take: 20,
            orderBy: {
                createdAt: 'desc'
            },
        })
        
        return new NextResponse(JSON.stringify(messages), {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), {status: 500} )
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

    let sortedIds = [recieverId, session.user.id].sort()
    let sortedIdString = `${sortedIds[0]}${sortedIds[1]}`

    // This part checks if a conversation between the two users already exists
    const conversationExists = await db.conversation.count({
        where: {
            id: sortedIdString
        }
    })
    

    if(conversationExists === 0) {
         await db.conversation.create({
            data: {
                UserAId: recieverId,
                UserBId: session.user.id,
                id: `${sortedIds[0]}${sortedIds[1]}`
            }
        })
    }

    const message = await db.message.create({
        data: {
            senderId: session.user.id,
            recieverId,
            text,
            conversationId: sortedIdString
        },
        include: {
            sender: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            },
            reciever: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            }
        }        
    })


    await pusherServer.trigger(
        toPusherKey(`conversation:${`${sortedIds[0]}${sortedIds[1]}`}`), 
        'incoming-message', 
        {
            id: new Date().toString(),
            text,
            createdAt: new Date(),
            recieverId: recieverId,
            senderId: session.user.id,
        }
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
        return new NextResponse(JSON.stringify(error), {status: 500} )
    }
}