"use client"

import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Message from "./Message"
import { ExtendedMessage } from "@/types/db"
import { Conversation } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"

const Messages = (conversation: Conversation) => {
    const [messages, setMessages] = useState<ExtendedMessage[] >()

    const {mutate: getMessages} = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3000/api/messages/${conversation.id}`)

            const messages = await response.json()

            setMessages(messages)

        }
    })

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {

        pusherClient.subscribe(toPusherKey(`conversation:${conversation.id}`))
        
            const messagesHandler = (message: ExtendedMessage) => {
                setMessages((prev) => [...prev!, message])  
                console.log("Test")
            }
    
        pusherClient.bind(`incoming-message`, messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`conversation:${conversation.id}`))
            pusherClient.unbind('incoming-message', messagesHandler)
        }
    }, [])

    if(!messages) {
        return ( <div className="flex w-full justify-center items-center h-full flex-col relative">
            <Loader2 className="w-16 h-16 text-gray-400 animate-spin" />  
        </div>)
    }

    return (
        <div className="flex w-full justify-end items-center h-full flex-col relative overflow-x-hidden">
            <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl space-y-1
              max-h-full h-fit overflow-y-scroll">
                {messages.map((item, index) => {
                    //@ts-ignore
                    return <Message key={index} {...item} name={item.sender.name} image={item.sender.image} />
                })}
            </div>
        </div>

    )
}

export default Messages