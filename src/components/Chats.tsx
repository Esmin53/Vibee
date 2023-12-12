"use client"

import { Conversation as ConversationType, User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { Ghost, Loader2 } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"

const Chats = () => {
    const [isLoading, setIsloading] = useState<boolean >(true)

    const session = useSession()

    const [chats, setChats] = useState<{
        name: string
        image: string
        text: string
        sentAt: string
        senderId: string
        conversationId: string
    }[]>([])

    const {mutate: getChats} = useMutation({
        mutationFn: async () => {
            setIsloading(true)
            const response = await fetch('http://localhost:3000/api/chats')

            const data = await response.json()
            setChats(data)
        },
        onSettled: () => {
            setIsloading(false)
        }
    })

    useEffect(() => {
        getChats()
    }, [])

    useEffect(() => {

        pusherClient.subscribe(toPusherKey(`message:${session.data?.user.id}`))
        
            const messagesHandler = (message: {
                name: string
                image: string
                text: string
                sentAt: string
                senderId: string,
                conversationId: string
            }) => {
                console.log("Nova poruka")
                    setChats((prev) => [message, ...prev.filter((item) => item.conversationId !== message.conversationId)])
            }
    
        pusherClient.bind(`newest-message`, messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`message:${session.data?.user.id}`))
            pusherClient.unbind('newest-message', messagesHandler)
        }
    }, [session])

    if(isLoading && !chats.length) {
        return <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader2 className="w-28 h-28 text-gray-400 animate-spin" />
        <h2 className="text-2xl text-gray-400 font-semibold">Getting your chatts</h2>
        <p className="text-gray-400">Please wait</p>
    </div>
    }

    if(!chats.length) {
        return <div className="w-full h-full flex flex-col justify-center items-center">
            <Ghost className="w-36 h-36 text-gray-400" />
            <h2 className="text-2xl text-gray-400 font-semibold">Pretty empty in here</h2>
            <p className="text-gray-400">Try finding some people</p>
        </div>
    }

    return (

        <div className="flex w-full items-center flex-col py-2 ">
            <div className="w-full max-w-5xl p-2">
                <p className="text-2xl text-gray-500 font-semibold">My chats</p>
            </div>
            <div className="w-full h-full py-2 flex items-center flex-col">
                {chats?.map((item) => {

                    return <Conversation name={item.name} text={item.text} image={item.image} sentAt={item.sentAt}
                    senderId={item.senderId}/>

                })}
            </div>
        </div>
    )
}

export default Chats