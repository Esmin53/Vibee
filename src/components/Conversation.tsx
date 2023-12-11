"use client"

import { ExtendedMessage } from "@/types/db"
import { useSession } from "next-auth/react"
import UserAvatar from "./UserAvatar"

type ConversationProps = {
    image: string
    name: string
    text: string
    sentAt: string
}

const Conversation = ({image, name, text, sentAt}: ConversationProps) => {
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
                <p className="text-sm">{text}</p>
            </div>
        </div>
    )
}

export default Conversation