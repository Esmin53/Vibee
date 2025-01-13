"use client"

import { useMutation } from "@tanstack/react-query"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import Message from "./Message"
import { ExtendedMessage } from "@/types/db"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { isSameDay } from "date-fns"
import { MessageContext } from "./MessageContext"

const Messages = ({conversationId, initialMessages, userId, slug}: {
    conversationId: string | null
    initialMessages: ExtendedMessage[]
    userId: string
    slug: string
    }) => {

    const sortedIds = [userId, slug].sort()
    const [messages, setMessages] = useState<ExtendedMessage[] >(initialMessages)
    const [isLoading, setIsloading] = useState<boolean >(false)
    const [page, setPage] = useState<number >(1)
    const [hasMore, setHasMore] = useState<boolean >(true)

    const {setIsUpLoading} = useContext(MessageContext)

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${conversationId}?page=${page}`)

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
        pusherClient.subscribe(toPusherKey(`conversation:${`${sortedIds[0]}${sortedIds[1]}`}`))
        
            const messagesHandler = (message: ExtendedMessage) => {
                //@ts-ignore
                if(!conversationId) {
                    conversationId = message.conversationId
                }

                 if(message.senderId === userId) {
                    setIsUpLoading(false)
                 }   


                setMessages((prev) => [message, ...prev!])
            }
    
        pusherClient.bind(`incoming-message`, messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`conversation:${`${sortedIds[0]}${sortedIds[1]}`}`))
            pusherClient.unbind('incoming-message', messagesHandler)
        }
    }, [])


    if(!messages.length) {
        return ( <div className="flex w-full justify-center items-center h-full flex-col relative">
            
            <h2 className="text-3xl text-gray-400 font-semibold">No previous messages</h2>
    </div>)
    }

    return (
        <div className="flex w-full justify-end items-center flex-1 flex-col relative overflow-x-hidden bg-dark">
            <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl space-y-1 
              max-h-full overflow-y-auto flex flex-col-reverse h-screen no-scrollbar">
                {messages?.map((item, index) => {                    
                    isSameDay(item.createdAt, messages[index + 1]?.createdAt) 
                    
                    if(messages.length === index + 1) {
                        return <div ref={lastElementRef} className="" key={index}> 
                        <Message {...item} image={item.sender.image} userId={userId} />                           
                        </div>
                    }
                    
                    if(index === 0) {
                        return <div className="py-1 pb-2 relative" key={index} >
                                    <Message  {...item} image={item.sender.image} userId={userId} isNewest={true}/>
                                </div>

                    }
                    return <div key={index}>
                        <Message {...item} image={item.sender.image} userId={userId}/>
                        </div>
                })}
                { isLoading ? <div className="w-full flex justify-center py-2">
                    <Loader2 className="animate-spin duration-700 w-7 h-7 text-gray-800 font-bold" />
                </div> : null}
            </div>
        </div>
    )
}

export default Messages