import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { MessageValidator } from "@/lib/validators/message"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

export const POST = async (req: Request) => {
    try {
        const body = await req.json()

        const {text, recieverId} = MessageValidator.parse(body)

        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
        }

        console.log(session.user.id)

        const conversation = await db.conversation.findFirst({
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
            let request = await db.messageRequest.findFirst({
                where: {
                    senderId: session.user.id,
                    recieverId: recieverId ,                    
                }
            })

            if(!request) {
                
                request = await db.messageRequest.create({
                data: {
                    senderId: session.user.id,
                    recieverId: recieverId,
                    status: "PENDING"
                }
            })
            }

            if(request && request.recieverId === session.user.id) {
                const conversation = await db.conversation.create({
                    data: {
                        UserAId: session.user.id,
                        UserBId: recieverId
                    }
                })

                await db.message.updateMany({
                    where: {
                        requestId: request.id
                    }, 
                    data: {
                        conversationId: conversation.id
                    }
                })

                const message = await db.message.create({
                    data: {
                        senderId: session.user.id,
                        recieverId,
                        text,
                        conversationId: conversation.id
                    }
                })
    
                return new NextResponse(JSON.stringify(message), { status: 200 })
            }

            const message = await db.message.create({
                data: {
                    senderId: session.user.id,
                    recieverId,
                    text,
                    requestId: request.id
                }
            })

            return new NextResponse(JSON.stringify(message), { status: 200 })
        }

        const message = await db.message.create({
            data: {
                senderId: session.user.id,
                recieverId,
                text,
                conversationId: conversation.id
            }
        })

        return new NextResponse(JSON.stringify(message), {status: 200})
    } catch (error) {
        console.log(error)
    }
}