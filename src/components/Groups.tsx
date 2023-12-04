"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"

const Groups = () => {
    const session = useSession()

    useEffect(() => {

        const messagesHandler = () => {
            console.log("TEST")
        }

        pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:incoming_messages`))
    

        pusherClient.bind('incoming_messages', messagesHandler)


        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:incoming_messages`))
            pusherClient.unbind('incoming_messages', messagesHandler)
        }
    }, [])

    return (
        <div className="w-24 h-24 bg-red-300 ">
            Test mali
        </div>
    )
}

export default Groups