import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image"

const Main = async () => {
    
    const session = await getServerSession(authOptions)


    return (
        <div className="h-full bg-gray-200 w-full flex flex-col shadow">
            <div className="w-full h-16 bg-gray-200 flex justify-end items-center px-2 border-b-4 border-b-zinc-50">
                <div className="flex gap-2 items-center h-full py-2">
                    <div className="py-2 border-r h-full border-slate-800 text-center flex items-center justify-center opacity-75">
                        <p className="text-lg text-white opacity-100 px-4">Messages</p>
                    </div>
                    {session?.user?.image &&  <Image src={session?.user?.image} alt="user image" width={28} height={28} className="rounded-full ml-2"/>}
                    <p className=" text-white">{session?.user?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Main