"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { MouseEvent } from "react"

const SignOut = () => {

    const handleLogOut = async (e: MouseEvent<HTMLDivElement>) => {
        try {
            e.preventDefault()
            signOut()
            redirect('/sign-in')
        } catch (error) {
            
        }
    }

    return <div onClick={(e) => handleLogOut(e)}>
        <LogOut className="cursor-pointer text-gray-500" />
    </div>
}

export default SignOut