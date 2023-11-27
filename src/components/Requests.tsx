import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import {headers} from "next/headers"
import type { MessageRequest } from "@prisma/client"
import type { ExtendedRequest } from "@/types/db"
import Request from "./Request"
import Image from "next/image"
import Link from "next/link"


const Requests = async () => {
    const session = await getServerSession(authOptions )

    console.log(session?.user.name)

    const res = await fetch("http://localhost:3000/api/requests", {
        method: "GET",
        headers: headers()
    })
    const data: ExtendedRequest[]  = await res.json()

    return (
        <div className="cursor-pointer overflow-auto">
            {data && data.map((item, index) => {
                return <Link href={`/messages/${item.senderId}`} className="flex gap-2 p-2 w-full bg-zinc-100 rounded-md shadow" key={index} > 
                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                        {item.sender.image && <Image fill src={item.sender.image} alt="User profile image"/>}
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-lg font-semibold">{item.sender.name}</p>
                            <p className="text-sm text-gray-500 font-semibold">
                                {"12.11.2023" /*item.messages[item.messages.length - 1].createdAt.toString()*/}</p>
                        </div>
                        <hr className="h-0 border-b border-gray-300 opacity-80 shadow" />
                        <p>
                            {item.messages[item.messages.length - 1].text}
                        </p>
                    </div>
                </Link>
            })}
        </div>
    )

}

export default Requests