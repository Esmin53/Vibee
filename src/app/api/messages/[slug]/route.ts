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
        //@ts-ignore
        let page: number = url.searchParams.get('page')
        const {pathname} = url

        const conversationId = pathname.split('/')[3]
        console.log(page)
        
        const messages = await db.message.findMany({
            where: {
                conversationId
            },
            include: {
                sender: true,
                reciever: true
            },
            skip: (page - 1) * 20,
            take: 20,
            orderBy: {
                createdAt: 'desc'
            }

        })

            return new NextResponse( JSON.stringify(messages), { status: 200 } )
         
    } catch (error) {
        console.log(error)
    }
}