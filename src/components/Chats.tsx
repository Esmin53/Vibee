"use client"

import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { Ghost } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { cn, toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { ConversationType } from "@/types/db"
import { useMutation } from "@tanstack/react-query"

interface ChatProps {
    data: ConversationType[],
    userId: string
    className?: string
}

const Chats = ({data, userId, className}: ChatProps) => {

    const session = useSession()

    const [chats, setChats] = useState<ConversationType[]>(data)

    const {mutate: getChats} = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chats`)

                const data: ConversationType[] = await response.json()

                setChats(data)
            } catch (error) {
                console.log(data)
            }
        }
    })

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

    useEffect(() => {
        getChats()
    }, [])

    if(!chats.length) {
        return <div className="w-full h-full flex flex-col justify-center items-center flex-1">
            <Ghost className="w-36 h-36 text-slate-500" />
            <h2 className="lg:text-2xl md:text-md text-slate-500 font-semibold">Try finding some people</h2>
        </div>
    }

    return (
        <div className="flex w-full items-center flex-col flex-1 p-2 max-w-3xl relative overflow-y-scroll h-screen no-scrollbar pb-24 md:pb-2">
            <div className={cn("w-full py-2 flex items-center flex-col gap-1 h-fit", className)}>
                {chats?.map((item) => {
                    return <Conversation name={item.name} text={item.text} image={item.image} sentAt={item.sentAt}
                    senderId={item.senderId} id={item.id} key={item.id} userId={userId} recieverId={item.recieverId}/>
                })}
            </div>
        </div>
    )
}

export default Chats