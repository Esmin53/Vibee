import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image"
import SignOut from "./SignOut"
import Link from "next/link"
import { Cog, Home } from "lucide-react"


const FooterComponent = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full h-16 md:h-20 mt-auto border-t shadow-sm border-dark3 flex justify-between items-center px-2">
        <div className="flex gap-2 items-center">
              <div className="w-9 w-sm:10  h-9 sm:h-10 relative rounded-md overflow-hidden">
                  {session?.user.image && <Image src={session.user.image} fill alt="User profile pic"/>}
              </div>
          </div>
          <Link href='/settings' >
                <Cog className="text-slate-200 w-7 sm:w-8 h-7 :h-8"/>
            </Link>
            <Link href='/' >
                <Home className="text-slate-200 w-7 sm:w-8 h-7 :h-8"/>
            </Link>
            <SignOut />
        </div>
    )
}

export default FooterComponent