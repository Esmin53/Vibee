import { headers } from "next/headers"
import UserAvatar from "../UserAvatar"
import { User } from "@prisma/client"

type PageProps = {
    userId: string
}

const Info = async ({userId}: PageProps) => {

    const response = await fetch(`http://localhost:3000/api/accounts/${userId}`, {
        method: 'GET',
        headers: headers()
    })

    const data: User = await response.json()

    return  <div className="w-full flex justify-center sticky top-0 mt-2 z-50 bg-gray-200">
    <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl h-12 flex 
    border-b-2 border-gray-300 opacity-75 shadow-b">
        <div className="flex gap-2 items-center">
        {data.image ? (
            <div className="w-10 h-10">
                <UserAvatar image={data.image} />
            </div>
        )   : null}
            <p className="font-semibold text-lg">{data.name}</p>
        </div>
    </div>
</div>
}

export default Info