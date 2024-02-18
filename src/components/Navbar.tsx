
import { useSession } from "next-auth/react"
import SearchBar from "./Searchbar"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { pacifico } from "@/app/layout"

const Navbar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full flex justify-center items-center bg-dark2 h-14 md:h-20 border-b border-dark3">
            <div className="flex w-full h-full max-w-5xl items-center justify-between md:justify-end p-2">
            <h2 className={`text-violet1 text-4xl sm:text-5xl ${pacifico.className} md:hidden`}>Vibee</h2>
                <div className="flex gap-2 items-center">
                    <div className="sm:w-12 sm:h-12 w-9 h-9 relative rounded-md overflow-hidden">
                        {session?.user.image && <Image src={session.user.image} fill alt="User profile pic"/>}
                    </div>
                    <div className="hidden sm:flex flex-col h-full">
                        <p className="text-slate-50">{session?.user.name}</p>
                        <p className="text-sm text-slate-50">{session?.user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar