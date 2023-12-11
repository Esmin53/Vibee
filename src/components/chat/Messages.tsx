"use client"

import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import Message from "./Message"
import { ExtendedMessage } from "@/types/db"
import { Conversation } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"

const Messages = ({conversationId}: {conversationId: string | null}) => {
    const [messages, setMessages] = useState<ExtendedMessage[] >([])
    const [isLoading, setIsloading] = useState<boolean >()
    const [page, setPage] = useState<number >(1)
    const [hasMore, setHasMore] = useState<boolean >(true)

    const observer = useRef<IntersectionObserver | null>()          //@ts-ignore
    const lastElementRef = useCallback(node => {
        if(observer.current) observer.current.disconnect()

        if(!hasMore) return
        if(isLoading) return
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                setIsloading(true)
                getMessages()
            }
        })

        if(node) observer.current.observe(node)
    }, [isLoading] )


    const {mutate: getMessages} = useMutation({
        mutationFn: async () => {
            setIsloading(true)
            const response = await fetch(`http://localhost:3000/api/messages/${conversationId}?page=${page}`)

            const newMessages = await response.json()
            if(!newMessages.length) {
                setHasMore(false)
            }

            const test = [...messages, ...newMessages]

            setMessages([...test])

        },
        onSettled: () => {
            setIsloading(false)
            setPage(prev => prev + 1)
        },
    })

    useEffect(() => {
        setIsloading(true)
       
        return () => getMessages()

    }, [])

    useEffect(() => {

        pusherClient.subscribe(toPusherKey(`conversation:${conversationId}`))
        
            const messagesHandler = (message: ExtendedMessage) => {
                //@ts-ignore
                if(!conversationId) {
                    conversationId = message.conversationId
                    getMessages()
                }
                setMessages((prev) => [message, ...prev!])  
            }
    
        pusherClient.bind(`incoming-message`, messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`conversation:${conversationId}`))
            pusherClient.unbind('incoming-message', messagesHandler)
        }
    }, [])

    if(!messages) {
        return ( <div className="flex w-full justify-center items-center h-full flex-col relative">
            <Loader2 className="w-16 h-16 text-gray-400 animate-spin" />  
        </div>)
    }

    if(!messages.length) {
        return ( <div className="flex w-full justify-center items-center h-full flex-col relative">
            
            <h2 className="text-3xl text-gray-400 font-semibold">No previous messages</h2>
    </div>)
    }

    return (
        <div className="flex w-full justify-end items-center h-full flex-col relative overflow-x-hidden">
            <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl space-y-1
              max-h-full h-fit overflow-y-scroll flex flex-col-reverse">
                {messages.map((item, index) => {

                    if(messages.length === index + 1) {
                            //@ts-ignore
                        return <div ref={lastElementRef}> <Message key={index} {...item} name={item.sender.name} image={item.sender.image} />                           
                        </div>
                    }
                    //@ts-ignore
                    return <Message key={index} {...item} name={item.sender.name} image={item.sender.image} />
                })}
            </div>
        </div>

    )
}

export default Messages