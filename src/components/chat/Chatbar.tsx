"use client"

import { Loader2, Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { RefObject, useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { redirect, usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import { pusherClient } from "@/lib/pusher"
import { Message } from "@prisma/client"
import { ExtendedMessage } from "@/types/db"
import { toPusherKey } from "@/lib/utils"



const ChatBar = ({conversationId}: {conversationId: string | null}) => {
    const [input, setInput] = useState<string>("")
    const [message, setMessage] = useState<ExtendedMessage >()
    const textareaRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;
    const pathname = usePathname()
    const [isSending, setIsSending] = useState<boolean >(false)


    const {mutate: sendMessage} = useMutation({
        mutationFn: async () => {
            setIsSending(true)
            const response = await fetch('http://localhost:3000/api/messages', {
                method: "POST",
                body: JSON.stringify({
                    text: input,
                    recieverId: pathname.split('/')[2]
                })
            })

            const data: ExtendedMessage = await response.json()

            setMessage(data)
        },
        onSettled: () => {
            setInput("")
            if (textareaRef.current) {
                textareaRef.current.value = "";
              }
              setIsSending(false)

        }
    })



    return <div className="sticky bottom-0 left-0 flex items-center justify-center p-2 md:py-4 w-full h-auto  bg-dark">
        <form className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl flex items-center gap-1" autoFocus>
            <Textarea className="h-10 resize-none py-3 bg-dark3 text-slate-50 border-none" onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message" rows={1} maxRows={4} ref={textareaRef} />
            <Button aria-label="Send message" className={`${isSending && 'cursor-wait'} bg-violet1 hover:bg-violet1/90`} onClick={(e) => {
                e.preventDefault()
                sendMessage()
            
                }} disabled={isSending}>
                {isSending ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
        </form>
    </div>
}

export default ChatBar