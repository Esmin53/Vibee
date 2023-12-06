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

        const conversationId = pathname.split('/')[3]
        console.log(conversationId)
        
        const messages = await db.message.findMany({
            where: {
                conversationId
            },
            include: {
                sender: true,
                reciever: true
            },

        })

            return new NextResponse( JSON.stringify(messages), { status: 200 } )
         
    } catch (error) {
        console.log(error)
    }
}