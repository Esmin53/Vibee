import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorized"), { status: 401 })
        }

        const conversation = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        UserAId: session.user.id
                    },
                    {
                        UserBId: session.user.id
                    }
                ]
            },
            include: {
                sender: true,
                reciever: true,
                    messages: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 1,
                    },
            }
        })

        const data: {}[] = conversation
        .filter(item => item.messages.length > 0) // Filter out items with no messages
        .map(item => ({
            name: item.sender.id === session.user.id ? item.reciever.name : item.sender.name,
            image: item.sender.id === session.user.id ? item.reciever.image : item.sender.image,
            text: item.messages[0].text,
            sentAt: item.messages[0].createdAt,
            senderId: item.messages[0].senderId,
            conversationId: item.id
        })).sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());


        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 400 })
    }
}