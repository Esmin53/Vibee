"use client"

import { useMutation } from "@tanstack/react-query"
import { ChevronDown, Ghost, Loader, MailQuestion } from "lucide-react"
import { useEffect, useState } from "react"
import Request from "./Request"

import { pusherClient } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"

type Request = {
    sender: {
        name: string,
        image: string,
        id: string
    }
}

const Requests = () => {
    const [requests, setRequests] = useState<Request[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const session = useSession()

const { mutate: getRequests} = useMutation({
    mutationFn:async () => {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/requests')

        const data = await response.json()

        setRequests(data)
    },
    onSettled() {
        setIsLoading(false)
    },
    onError() {
        setIsLoading(false)
    },

})

    useEffect(() => {
        getRequests()

    }, [])


    if(isLoading) {
        return  <div className="md:w-2/5 w-full h-full flex flex-col gap-2">
        <div className="w-full h-6 flex items-center px-2 justify-between">
            <p className="text-xl font-semibold">Message requests</p>
            <div className="w-16 h-7 bg-zinc-100 rounded-sm flex items-center justify-between px-1 animate-pulse">

            </div>
        </div>

        <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
        <div className="w-full h-full max-h-64 flex justify-center items-center bg-zinc-100 rounded-md">
            <Loader className="w-16 h-16 text-gray-200 " />
        </div>
      </div>       
    }

    if(requests.length === 0 && !isLoading) {
        return  <div className="md:w-2/5 w-full h-fit flex flex-col gap-2 py-1">
        <div className="w-full h-6 flex items-center px-2">
            <p className="md:text-xl text-md font-semibold">Message requests</p>
            <div className="w-16 h-7 bg-zinc-100 rounded-sm flex items-center justify-between px-1 ml-auto">
                <MailQuestion className="text-gray-500 font-semibold w-6 h-6"/>
                <p className="font-semibold">{requests.length}</p>
            </div>
            <ChevronDown className="flex h-full justify-center items-center text-gray-500"/>
        </div>

        <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
        <div className="w-full md:h-full max-h-72 flex flex-col justify-center items-center bg-zinc-100 rounded-md">
            <p className="text-center text-gray-400 px-1 font-semibold md:text-md text-xs">
                No new message requests at the moment. <br /> Check back later!</p>
            <Ghost className="md:w-16 md:h-16 h-8 w-8 text-gray-400"/>
        </div>
      </div> 
    }

    

    return (
        <div className="md:w-2/5 w-full h-full flex flex-col gap-2 ">
        <div className="w-full h-6 flex items-center px-2 justify-between">
            <p className="text-xl font-semibold">Message requests</p>
            <div className="w-16 h-7 bg-zinc-100 rounded-sm flex items-center justify-between px-1">
                <MailQuestion className="text-gray-500 font-semibold w-6 h-6"/>
                <p className="font-semibold">{requests.length}</p>
            </div>

        </div>

        <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
        
        <div className="flex flex-col gap-1 h-full ">
            {requests && requests.map((item, index) => {
                return <Link href={`/messages/${item.sender.id}`}>
                    <Request key={index} name={item.sender.name} image={item.sender.image} />
                </Link>
            })}
        </div>

      </div> 
    ) 

}

export default Requests