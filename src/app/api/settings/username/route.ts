import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"


export const POST = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || !session.user) {
            return new Response(JSON.stringify("Unauthorised"), { status: 401 })
        }

        const { name } = await req.json()


        if(!name || !name.length) {
            return new Response(JSON.stringify("Bad request"), { status: 400 })
        }

        console.log("Name: ", name)

        const newUsername = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: name
            }
        })

        return new Response(JSON.stringify(newUsername), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}