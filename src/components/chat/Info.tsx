import { headers } from "next/headers"
import UserAvatar from "../UserAvatar"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

type PageProps = {
    userId: string
}

const Info = ({userId}: PageProps) => {

    const [user, setUser] = useState<User >()

   const { mutate: getUser } = useMutation({
    mutationFn: async () => {
        const response = await fetch(`http://localhost:3000/api/accounts/${userId}`)

        const data = await response.json()

        setUser(data)
    }
   })

   useEffect(() => {
    getUser()
   }, [])

    return  <div className="w-full flex justify-center sticky top-0 mt-2 z-40 bg-gray-200">
    <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl h-12 flex 
    border-b-2 border-gray-300 opacity-75 shadow-b">
        <div className="flex gap-2 items-center">
        {user?.image ? (
            <div className="w-10 h-10">
                <UserAvatar image={user.image} />
            </div>
        )   : null}
            <p className="font-semibold text-lg">{user?.name}</p>
        </div>
    </div>
</div>
}

export default Info