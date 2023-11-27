import { authOptions } from "@/lib/auth"
import { getServers } from "dns/promises"
import { getServerSession } from "next-auth"
import Image from "next/image"


const Profile = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full h-1/2 bg-zinc-100 gap-2 flex flex-col rounded-lg">
            <div className="flex sm:px-12 px-2 pt-6">
                <div className=" w-44 h-44 bg-zinc-100 rounded-xl overflow-hidden relative border-4 border-gray-200">
                    {session?.user.image ? (
                        <Image fill src={session.user.image} alt="User profile picture" quality={100} style={{objectFit: "cover"}} />
                    ) : null}
                </div>
            </div>           
            <p className="sm:px-12 px-2">{session?.user.email}</p>
            <p className="sm:px-12 px-2 text-2xl text-gray-700 font-bold">{session?.user.name}</p>
            <p className="sm:px-12 px-2 text-md font-gray-500 letter-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptate ipsum quos nisi nostrum tenetur quas qui ut voluptatem?</p>
        </div>
    )
}

export default Profile