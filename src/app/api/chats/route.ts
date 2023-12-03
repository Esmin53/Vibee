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
                        UserBId: session.user.id
                    },
                    {
                        UserAId: session.user.id
                    }
                ],
            }
        })

        //@ts-ignore
        let chats: [] = conversation.map((item) => {
            if(item.UserAId !== session.user.id) {
                return item.UserAId
            } else if(item.UserBId !== session.user.id) {
                return item.UserBId
            }
        })

        const users = await db.user.findMany({
            where: {
                id: { in: chats }
            }, 
        })

        return new NextResponse(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 400 })
    }
}