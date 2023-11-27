"use client"

import { Message } from "@prisma/client"
import UserAvatar from "../UserAvatar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { useSession } from "next-auth/react"

type ExtendedMessage = Message & {
    image?: string,
    name?: string
}

const Message = ({text, image, name, createdAt, senderId}: ExtendedMessage) => {
    
    const session = useSession()

    const userId = session.data?.user.id
    console.log("Sender: ", senderId),
    console.log("User: ", userId)

    return (
        <div className={`w-full flex ${senderId === userId ? 'justify-end' : 'justify-start'}`}>
            <div className="flex w-3/5 px-1 rounded-md">
                <div className={`flex ${senderId !== userId ? 'flex-row' : 'flex-row-reverse '} w-full gap-2`}>
                    <div className="w-10 h-10 rounded-md overflow-hidden">
                        <UserAvatar image={image}/>
                    </div>
                    <div className={`${senderId === userId ? 'bg-green-600 text-zinc-100 items-end' : 'bg-zinc-100'} shadow
                    flex flex-col p-1 rounded-md w-fit`}>
                        
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message