import { NextResponse } from "next/server"

export const GET = (req: Request) => {
    try {
        const url = new URL(req.url)
        const q = url.searchParams.get('q')
        
        return new NextResponse(JSON.stringify(q))
    } catch (error) {
        
    }
}