import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const {pathname} = url

        const userId = pathname.split('/')[3]

        const user = await db.user.findFirst({
            where: {
                id: userId
            }
        })

        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}