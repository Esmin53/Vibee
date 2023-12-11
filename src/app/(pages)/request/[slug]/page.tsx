"use client"

import Main from "@/components/Main"
import UserAvatar from "@/components/UserAvatar"
import Info from "@/components/chat/Info"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { redirect, usePathname, useRouter } from "next/navigation"
import { MouseEvent, useEffect, useState } from "react"


export const Request = () => {

    const pathname = usePathname()
    const userId = pathname.split('/')[2]
    const redirectUri = `/messages/${userId}`

    const router = useRouter()

    const [user, setUser] = useState<User >()

    const { mutate: getUser } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3000/api/accounts/${userId}`)
        
            const data = await response.json()

            setUser(data)
        }
    })

    const { mutate: createConversation } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3000/api/requests/${userId}`, {
                method: 'POST'
            })

            const data = await response.json()


        },
        onSettled: () => {
            router.push(`/messages/${userId}`)
        }
    })

    const handleClick = async (e: MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault()
        createConversation()
        
    }

    useEffect(() => {
        getUser()
    }, [])

    return  <Main>
                <div className="flex w-full justify-center items-center h-full flex-col relative overflow-x-hidden">
            <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl space-y-2 flex flex-col justify-center items-center">
                <div className="w-40 h-40 rounded-md">
                    { user?.image ? <UserAvatar image={user?.image} /> : null }
                </div>
                <p className="text-gray-400">{user?.email}</p>
                <h1 className="text-4xl font-semibold">{user?.name}</h1>
                <p className="text-2xl text-blue-400 cursor-pointer" 
                   onClick={(e) => {
                    handleClick(e)
                   }} > Start chatting
                </p>
            </div>
        </div>
    </Main>

    }

export default Request