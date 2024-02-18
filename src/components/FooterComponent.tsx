import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image"
import SignOut from "./SignOut"


const FooterComponent = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full h-20 mt-auto border-t shadow-sm border-dark3 flex justify-between items-center px-2">
        <div className="flex gap-2 items-center">
              <div className="sm:w-12 sm:h-12 w-10 h-10 relative rounded-md overflow-hidden">
                  {session?.user.image && <Image src={session.user.image} fill alt="User profile pic"/>}
              </div>
              <div className="flex flex-col h-full">
                  <p className="text-slate-50">{session?.user.name}</p>
                  <p className="text-sm text-slate-50">{session?.user.email}</p>
              </div>
          </div>
            <SignOut />
        </div>
    )
}

export default FooterComponent