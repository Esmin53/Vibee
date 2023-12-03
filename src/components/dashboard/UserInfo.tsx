"use client"

import { useSession } from "next-auth/react"
import UserAvatar from "../UserAvatar"


const UserInfo = () => {

    const session = useSession()

    return (
        <div className="w-full h-60 bg-zinc-100 rounded-md p-2">
            <div className="w-full flex justify-center">
                <div className="w-36 h-36">
                    {session.data?.user.image && <UserAvatar image={session.data.user.image} />}
                </div>
            </div>
            <div className="flex flex-col justify-center px-8 py-4">
                <p className="text-xl font-semibold text-center">{session.data?.user.name}</p>
                <p className="text-gray-500 text-sm text-center">{session.data?.user.email}</p>
            </div>
        </div>
    )
}

export default UserInfo