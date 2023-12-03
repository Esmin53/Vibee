"use client"

import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Message from "./Message"
import { ExtendedMessage } from "@/types/db"

const Messages = () => {
    const [messages, setMessages] = useState<ExtendedMessage[] >()
    const pathname = usePathname()

    const {mutate: getMessages} = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3000/api/messages/${pathname.split('/')[2]}`)

            const messages = await response.json()

            setMessages(messages)
        }
    })

    useEffect(() => {
        getMessages()

    }, [])

    return (
        <div className="flex w-full justify-end items-center h-full flex-col relative">
            <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl gap-1 h-full flex justify-end flex-col ">
                {messages && messages.map((item, index) => {
                    //@ts-ignore
                    return <Message {...item} name={item.sender.name} image={item.sender.image} />
                })}
            </div>
        </div>

    )
}

export default Messages