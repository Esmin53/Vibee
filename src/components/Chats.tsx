"use client"

import { Conversation as ConversationType, User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"
import Link from "next/link"



const Chats = () => {
    const [chats, setChats] = useState<User[]>()

    const {mutate: getChats} = useMutation({
        mutationFn: async () => {
            const response = await fetch('http://localhost:3000/api/chats')

            const data = await response.json()
            setChats(data)


        }
    })

    useEffect(() => {
        getChats()
    }, [])

    if(!chats || chats.length === 0) {
        return <div>You have no chats to display</div>
    }

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <p className="text-md md:text-lg text-gray-500 font-bold px-2">Chats</p>
            {chats && chats.map((item) => {
                return <Link href={`/messages/${item.id}`} className="w-full flex gap-2 p-1 hover:bg-zinc-100 rounded-md cursor-pointer"> 
                    <div className="w-10 h-10">
                        {item.image && <UserAvatar image={item.image} />}
                    </div>
                    <p className="text-lg font-semibold">{item.name}</p>
                </Link>
            })}                      
        </div>
    )
}

export default Chats