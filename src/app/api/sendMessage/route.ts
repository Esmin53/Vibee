import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { MessageValidator } from "@/lib/validators/message"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const body = await req.json()

        const {text, recieverId} = MessageValidator.parse(body)

        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
        }

        // This part checks if a conversation between the two users already exists
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

        //If yes Then it skips this entire block of code (37 - 114) if no then it runs if statement below
        if(!conversation) {

            // Since there is no conversation created from before this part checks if one user messaged the other before,
            let request = await db.messageRequest.findFirst({
                where: {
                    OR: [
                        {
                            senderId: recieverId,
                            recieverId: session.user.id
                        },
                        {
                            recieverId: recieverId,
                            senderId: session.user.id
                        }
                    ]              
                }
            })
            
            // If no then it creates new message request in the db
            if(!request) {  
                request = await db.messageRequest.create({
                data: {
                    senderId: session.user.id,
                    recieverId: recieverId,
                    status: "PENDING"
                }
            })
            }

            //If there already is request in the db - and reciever is logged in user (one sending this message) 
            //then this creates new CONVERSATION in the database 
            if(request && request.recieverId === session.user.id) {
                const conversation = await db.conversation.create({
                    data: {
                        UserAId: session.user.id,
                        UserBId: recieverId
                    }
                })

                //This updates all messages sent by user that sent message request with newly created conversation id
                await db.message.updateMany({
                    where: {
                        requestId: request.id
                    }, 
                    data: {
                        conversationId: conversation.id
                    }
                })

                //This creates new message with conversationId = newly created conversation id
                const message = await db.message.create({
                    data: {
                        senderId: session.user.id,
                        recieverId,
                        text,
                        conversationId: conversation.id
                    }
                })

                await db.messageRequest.delete({
                    where: {
                        id: request.id
                    }
                })
    
                return new NextResponse(JSON.stringify(message), { status: 200 })
            }

            // If the message is sent by the same user that initiated the conversation (sent previous messages) this creates new message with same requestId
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

        //If there is already a conversation this creates new message
        const message = await db.message.create({
            data: {
                senderId: session.user.id,
                recieverId,
                text,
                conversationId: conversation.id
            }
        })

        return new NextResponse(JSON.stringify(message), {status: 200} )
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 } )
    }
}