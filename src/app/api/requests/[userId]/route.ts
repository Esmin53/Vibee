import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
        }
    
        const url = new URL(req.url)
        const {pathname} = url

        const userId = pathname.split('/')[3]

        const conversation = await db.conversation.create({
            data: {
                UserAId: userId,
                UserBId: session.user.id
            }
        })

        console.log("Conversation: ", conversation)
    
        return new NextResponse(JSON.stringify(conversation), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify(error), { status: 400 })
    }
}