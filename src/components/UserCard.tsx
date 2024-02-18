"use client"

import UserAvatar from "./UserAvatar"
import { Button } from "./ui/button"

interface UserProps {
    id: string
    name?: string
    image?: string
    email?: string
}

const UserCard = ({name, id, image, email}: UserProps) => {

    return (
        <div className="w-full hover:bg-dark2 p-2 rounded-md">
            <div className="flex gap-2 items-start">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                    <UserAvatar image={image} />
                </div>
                <div>
                    <p className="text-sm text-white font-semibold">{name}</p>
                    <p className="text-xs text-slate-100">{email}</p>
                </div>
            </div>

        </div>
    )
}

export default UserCard