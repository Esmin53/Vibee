"use client"

import { usePathname } from "next/navigation"

const Chats = () => {

    const pathname = usePathname()

    return (
        <div className="w-full p-2 flex flex-col gap-2">
            <h2 className="sm:text-lg text-md font-semibold text-gray-700">My chats</h2>
            <div className="w-full flex flex-col gap-2 bg-gray-100 p-1 rounded-md">
                <div className="w-full flex gap-2">
                    <div className="w-10 h-10 bg-green-600 rounded-md"></div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start flex-1">
                            <p className="truncate text-md font-bold">Esmin</p>
                            <p className="text-sm text-gray-500">6 mins ago</p>
                        </div>
                        <p className="text-sm">Lorem ipsum dolor sit amet cons adipisicing elit. Accusantium odio...</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Chats