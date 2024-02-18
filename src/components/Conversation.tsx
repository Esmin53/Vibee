"use client"

import { ExtendedMessage } from "@/types/db"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

type ConversationProps = {
    image: string
    name: string
    text: string
    sentAt: Date
    senderId: string
    id: string
}

const Conversation = ({image, name, text, sentAt, senderId, id}: ConversationProps) => {
    const session = useSession()


    return (
        <Link href={`/messages/${id}`} className="w-full flex lg:gap-4 md:gap-1 gap-2 p-2 cursor-pointer border-y border-gray-300
         max-w-5xl shadow-sm">
            <div className="w-10 h-10 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-md">
                <UserAvatar image={image} />
            </div>
            <div className="flex flex-col gap-2 items-start flex-1 ">
                <div className="flex justify-between items-center flex-1 w-full">
                    <p className="lg:text-lg md:text-sm font-semibold">{name && name}</p>
                    
                    <p className="text-xs">{formatDistanceToNow(sentAt)}</p>
                </div>
                <p className="text-sm">
                    <span className="text-gray-500 font-semibold">{senderId === session.data?.user.id ? "You: " : null}</span>
                    {text}
                </p>
            </div>
        </Link>
    )
}

export default Conversation