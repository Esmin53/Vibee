
import Accounts from "@/components/Accounts"
import FooterComponent from "@/components/FooterComponent"
import Main from "@/components/Main"
import UtilityBar from "@/components/UtilityBar"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { headers } from "next/headers"
import { usePathname } from "next/navigation"




const Users = () => {
    


    

      

    return (
        <Main>
            <Accounts />
            <div className="w-full md:hidden fixed bottom-0">
                <FooterComponent />
            </div>
        </Main>
    )
}

export default Users