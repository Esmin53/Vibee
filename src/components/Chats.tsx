"use client"

import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { Ghost } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { ConversationType } from "@/types/db"

interface ChatProps {
    data: ConversationType[]
}

const Chats = ({data}: ChatProps) => {

    const session = useSession()

    const [chats, setChats] = useState<ConversationType[]>(data)

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`message:${session.data?.user.id}`))
        
            const messagesHandler = (message: ConversationType) => {
                setChats((prev) => [message, ...prev.filter((item) => item.conversationId !== message.conversationId)])
            }
    
        pusherClient.bind(`newest-message`, messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`message:${session.data?.user.id}`))
            pusherClient.unbind('newest-message', messagesHandler)
        }
    }, [session])


    if(!chats.length) {
        return <div className="w-full h-full flex flex-col justify-center items-center">
            <Ghost className="w-36 h-36 text-gray-400" />
            <h2 className="lg:text-2xl md:text-md  text-gray-400 font-semibold">Pretty empty in here</h2>
            <p className="text-gray-400">Try finding some people</p>
        </div>
    }

    return (
        <div className="flex w-full items-center flex-col py-2 ">
            <div className="w-full max-w-5xl px-2">
                <p className="lg:text-2xl md:text-md  text-gray-500 font-semibold">My chats</p>
            </div>
            <div className="w-full h-full py-2 flex items-center flex-col">
                {chats?.map((item) => {
                    return <Conversation name={item.name} text={item.text} image={item.image} sentAt={item.sentAt}
                    senderId={item.senderId} id={item.id} key={item.id}/>
                })}
            </div>
        </div>
    )
}

export default Chats