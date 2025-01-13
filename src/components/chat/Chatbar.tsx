"use client"

import { Loader2, Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { RefObject, useContext, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { ExtendedMessage } from "@/types/db"
import { MessageContext } from "./MessageContext"




const ChatBar = ({conversationId}: {conversationId: string | null}) => {
    const [input, setInput] = useState<string>("")
    const textareaRef = useRef<HTMLTextAreaElement>(null) as RefObject<HTMLTextAreaElement>;
    const pathname = usePathname()

    const { isUpLoading, setIsUpLoading} = useContext(MessageContext)

    const {mutate: sendMessage} = useMutation({
        mutationFn: async () => {
            if(input.length < 1) return
            setIsUpLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`, {
                method: "POST",
                body: JSON.stringify({
                    text: input,
                    recieverId: pathname.split('/')[2]
                })
            })

            const data: ExtendedMessage = await response.json()

        },
        onSettled: () => {
            setInput("")
            if (textareaRef.current) {
                textareaRef.current.value = "";
              }
        }
    })

    return <div className="sticky bottom-0 left-0 flex items-center justify-center p-2 md:py-4 w-full h-auto  bg-dark">
        <form className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl flex items-center gap-1" autoFocus>
            <Textarea className="h-10 resize-none py-3 bg-dark3 text-slate-50 border-none outline-none" onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message" rows={1} maxRows={4} ref={textareaRef} />
            <Button aria-label="Send message" className={`${isUpLoading && 'cursor-wait'} bg-violet1 hover:bg-violet1/90`} onClick={(e) => {
                e.preventDefault()
                sendMessage()
            
                }} disabled={isUpLoading}>
                  <Send className={`${isUpLoading ? '' : ''}`}/>
            </Button>
        </form>
    </div>
}

export default ChatBar