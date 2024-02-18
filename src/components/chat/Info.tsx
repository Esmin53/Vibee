import UserAvatar from "../UserAvatar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type PageProps = {
    userId: string
}

const Info = async ({userId}: PageProps) => {

    const response = await fetch(`http://localhost:3000/api/accounts/${userId}`)

    const user = await response.json()
    return  <div className="w-full flex justify-center sticky top-0 md:mt-2 z-40 ">
    <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl flex bg-dark2 h-12 sm:h-20 rounded-sm shadow-sm border border-dark">
        <div className="flex gap-2 items-center w-full px-2">
        {user?.image ? (
            <div className="md:w-10 md:h-10 w-8 h-8">
                <UserAvatar image={user.image} />
            </div>
        )   : null}
            <p className="font-semibold md:text-lg text-slate-50">{user?.name}</p>
            <Link href="/" replace  prefetch={true} className="ml-auto">
                <ArrowLeft className="text-slate-50 cursor-pointer"/>
            </Link>
        </div>
    </div>
</div>
}

export default Info