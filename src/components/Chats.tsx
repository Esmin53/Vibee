"use client"

import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { Ghost } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { ConversationType } from "@/types/db"

interface ChatProps {
    data: ConversationType[],
    userId: string
}

const Chats = ({data, userId}: ChatProps) => {

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
        return <div className="w-full h-full flex flex-col justify-center items-center flex-1">
            <Ghost className="w-36 h-36 text-slate-500" />
            <h2 className="lg:text-2xl md:text-md text-slate-500 font-semibold">Try finding some people</h2>
        </div>
    }

    return (
        <div className="flex w-full items-center flex-col flex-1 p-2 max-w-3xl">
            <div className="w-full h-full py-2 flex items-center flex-col gap-1">
                {chats?.map((item) => {
                    return <Conversation name={item.name} text={item.text} image={item.image} sentAt={item.sentAt}
                    senderId={item.senderId} id={item.id} key={item.id} userId={userId} recieverId={item.recieverId}/>
                })}
            </div>
        </div>
    )
}

export default Chats