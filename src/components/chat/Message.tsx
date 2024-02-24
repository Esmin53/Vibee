"use client"

import { Message } from "@prisma/client"
import UserAvatar from "../UserAvatar"
import { format} from "date-fns"

type ExtendedMessage = Message & {
    image: string | null,
    name: string | null,
    userId: string | null
    isNewest?: boolean 
}

const Message = ({text, image, name, createdAt, senderId, userId}: ExtendedMessage) => {
    
    return (
        <div className={`w-full flex ${senderId === userId ? 'justify-end' : 'justify-start'} relative`}>
            <div className="flex w-3/5 px-1 rounded-md">
                <div className={`flex ${senderId !== userId ? 'flex-row' : 'flex-row-reverse '} w-full gap-1 lg:gap-2`}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden">
                        {image ? <UserAvatar image={image}/> : null}
                    </div>
                    <div className={`${senderId === userId ? 'bg-violet1 text-white items-end' : 'bg-dark3'} shadow
                    flex flex-col sm:p-2 py-1 px-4 rounded-md w-fit relative`}>
                        <p className="text-sm sm:text-md text-white">{text}</p>
                        <p className={`${senderId === userId ? 'justify-start' : 'justify-end'} w-full text-xs font-extralight 
                        text-slate-300 flex`}>{format(createdAt, 'h:mm a')}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message