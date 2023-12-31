"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import {signIn, useSession} from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const signInWithGoogle = async () => {
        setIsLoading(true)
        try {
            
            await signIn('google')
        } catch (error) {
            console.log(error)
        }
    }

    /*const {data} = useSession()
     if(data) {
        router.push("/")
     }*/

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
                <form className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl font-semibold mb-4 text-gray-800">Sign Up </h1>
                    <input type="text" placeholder="Email adress" className="w-80 px-2 py-3 rounded-md border border-gray-300 shadow-sm outline-none"/>
                    <input type="password" placeholder="Your password" className="w-80 px-2 py-3 rounded-md border border-gray-300 my-2 shadow-sm outline-none"/>
                    <Button className="w-full h-12 shadow-sm font-semibold">Sign Up</Button>
                    <p className="text-sm text-gray-400">Already an user? 
                    <Link href="/sign-in" className="text-emerald-500 font-semibold">{" "} Sign In</Link></p>
                </form>
                <p className="flex my-2"> OR </p>
                <Button variant="outline" className="w-full h-12 gap-2 shadow" onClick={() => signIn("google")}>
                    <Image src="/google.png" width={20} height={20} alt="google"/>
                    Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12 shadow">
                    <Image src="/facebook.png" width={20} height={20} alt="facebook"/>
                    Continue with Facebook
                </Button>
            </div>
        </div>
    )
}

export default SignUp