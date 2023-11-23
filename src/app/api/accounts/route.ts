import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const q = url.searchParams.get('q')

        if(!q) return new Response('Invalid query', { status: 400 })

        const results = await db.user.findMany({
            where: {
                name: {
                    startsWith: q,
                    mode: 'insensitive'
                }
            },
            take: 6
        })

        return new NextResponse(JSON.stringify(results), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}