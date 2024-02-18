"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { usePathname } from "next/navigation"


type ConversationProps = {
    image: string
    name: string
    text: string
    sentAt: Date
    senderId: string
    id: string
}

const Conversation = ({image, name, text, sentAt, senderId, id}: ConversationProps) => {
    const pathname = usePathname()
    const urlId = pathname.split('/')[2]
    

    return (
        <Link href={`/messages/${id}`} className={`w-full flex cursor-pointer sm:bg-dark3 p-2 rounded-sm border-b sm:border border-dark3 sm:border-dark
         max-w-4xl shadow-sm gap-2 sm:gap-6`}>

        <div className="w-10 h-10 sm:w-14 sm:h-14 relative rounded-sm overflow-hidden">
            <Image fill alt="User avatar" src={image} />
        </div>
        <div className="flex flex-col flex-1 gap-1 sm:gap-2">
            <div className="flex w-full justify-between items-center">
                <p className="text-white sm:text-md font-thin">{name}</p>
                <p className="text-xs sm:text-sm text-white font-semibold">{formatDistanceToNow(sentAt)}</p>
            </div>
            <div className="w-full flex-1 pr-6">
                <p className=" text-gray-300 text-sm sm:text-md">{text}</p>
            </div>
        </div>
        </Link>
    )
}

export default Conversation