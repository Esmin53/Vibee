"use client"

import { Message } from "@prisma/client"
import UserAvatar from "../UserAvatar"

type ExtendedMessage = Message & {
    image: string | null,
    name: string | null,
    userId: string | null
}

const Message = ({text, image, name, createdAt, senderId, userId}: ExtendedMessage) => {
    
    return (
        <div className={`w-full flex ${senderId === userId ? 'justify-end' : 'justify-start'}`}>
            <div className="flex w-3/5 px-1 rounded-md">
                <div className={`flex ${senderId !== userId ? 'flex-row' : 'flex-row-reverse '} w-full gap-1 lg:gap-2`}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden">
                        {image ? <UserAvatar image={image}/> : null}
                    </div>
                    <div className={`${senderId === userId ? 'bg-green-600 text-zinc-100 items-end' : 'bg-zinc-100'} shadow
                    flex flex-col p-1 rounded-md w-fit`}>
                        
                        <p className="text-sm sm:text-md">{text}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message