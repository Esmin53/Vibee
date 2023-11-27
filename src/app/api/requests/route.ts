import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        
        if(!session || !session.user) {
            return new NextResponse(JSON.stringify("Unauthorised"), { status: 401 })
        }
    
        const requests = await db.messageRequest.findMany({
            where: {
                recieverId: session.user.id
            },
            include: {
                messages: true,
                sender: true
            }
        })
    
        return new NextResponse(JSON.stringify(requests), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}