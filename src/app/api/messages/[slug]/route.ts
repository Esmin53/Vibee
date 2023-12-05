import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised!"), { status: 401 })
        }

        const url = new URL(req.url)
        const {pathname} = url

        const userId = pathname.split('/')[3]
        
        const conversation = await db.conversation.findFirst({
            where: {
                OR: [
                    {
                        UserAId: userId,
                        UserBId: session.user.id
                    },
                    {
                        UserBId: userId,
                        UserAId: session.user.id
                    }
                ]
            }
        })

        if(conversation) {
            const messages = await db.message.findMany({
                where: {
                    conversationId: conversation.id
                },
                include: {
                    sender: true,
                    reciever: true
                }
            })

            return new NextResponse( JSON.stringify(messages), { status: 200 } )
        } else {
            const messages = await db.message.findMany({
                where: {
                    OR: [
                        {
                            senderId: userId,
                            recieverId: session.user.id
                        },
                        {
                            senderId: session.user.id,
                            recieverId: userId
                        }
                    ]
                },
                include: {
                    sender: true,
                    reciever: true
                }
            })

            return new NextResponse( JSON.stringify(messages), { status: 200 } )
        }

    } catch (error) {
        console.log(error)
    }
}