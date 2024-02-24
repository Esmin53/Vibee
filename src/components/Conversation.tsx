"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

type ConversationProps = {
    image: string
    name: string
    text: string
    sentAt: Date
    senderId: string
    id: string
    userId: string
    recieverId: string
}

const Conversation = ({image, name, text, sentAt, senderId, id, userId, recieverId}: ConversationProps) => {
    

    return (
        <Link href={`/messages/${id}`} className={`w-full flex cursor-pointer md:bg-dark3 p-2 rounded-sm border-b md:border
         border-dark3 md:border-dark
         max-w-4xl shadow-sm gap-2 sm:gap-6 relative`}>

        <div className="w-10 h-10 sm:w-14 sm:h-14 relative rounded-md overflow-hidden">
            <Image fill alt="User avatar" src={image} />
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex w-full justify-between items-center">
                <p className="text-white text-sm sm:text-md font-semibold sm:font-normal">{name}</p>
                <p className="text-xs text-white sm:font-semibold">{formatDistanceToNow(sentAt)} ago</p>
            </div>
            <div className="w-full flex-1 sm:pr-6 items-start flex gap-1">
                <p className={` text-slate-200 text-sm sm:text-md`}>
                    {senderId === userId ? <span className="text-xs text-slate-200 sm:font-semibold">You: </span> : null}
                    {text.slice(0, 57)}{text.length > 57 ? '...' : null}</p>
            </div>
        </div>
        </Link>
    )
}

export default Conversation