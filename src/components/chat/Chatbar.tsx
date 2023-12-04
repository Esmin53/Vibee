"use client"

import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"

const ChatBar = () => {
    const [input, setInput] = useState<string>("")
    const session = useSession()
    const pathname = usePathname()

    const {mutate: sendMessage} = useMutation({
        mutationFn: async () => {
            const response = await fetch('http://localhost:3000/api/sendMessage', {
                method: "POST",
                body: JSON.stringify({
                    text: input,
                    recieverId: pathname.split('/')[2]
                })
            })

            const data = await response.json()
        }
    })

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:incoming_messages`))

        const messagesHandler = () => {
            console.log("Chatbar") 
        }

        pusherClient.bind('incoming_messages', messagesHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:incoming_messages`))
            pusherClient.unbind('incoming_messages', messagesHandler)
        }

    }, [])

    return <div className="sticky bottom-0 left-0 flex items-center justify-center p-2 w-full h-auto shadow-xl bg-gray-200">
        <form className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl flex items-center gap-1" autoFocus>
            <Textarea className="h-10 resize-none py-3" onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message" rows={1} maxRows={4} />
            <Button aria-label="Send message" onClick={(e) => {
                e.preventDefault()
                sendMessage()
                }}>
                <Send />
            </Button>
        </form>
    </div>
}

export default ChatBar