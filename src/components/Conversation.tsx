"use client"

import { ExtendedMessage } from "@/types/db"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"

type ConversationProps = {
    image: string
    name: string
    text: string
    sentAt: string
    senderId: string
}

const Conversation = ({image, name, text, sentAt, senderId}: ConversationProps) => {
    const session = useSession()


    return (
        <div className="w-full flex gap-4 p-2 cursor-pointer border-y border-gray-300 max-w-4xl shadow-sm">
            <div className="w-12 h-12 bg-lime-300 rounded-md">
                <UserAvatar image={image} />
            </div>
            <div className="flex flex-col gap-2 items-start flex-1 ">
                <div className="flex justify-between items-center flex-1 w-full">
                    <p className="text-lg font-semibold">{name && name}</p>
                    <p className="text-xs">{sentAt}</p>
                </div>
                <p className="text-sm">
                    <span className="text-gray-500">{senderId === session.data?.user.id ? "You: " : null}</span>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Conversation