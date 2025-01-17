"use client"

import {signIn, useSession} from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


const SignIn = () => {
    const router = useRouter()
    const session = useSession()

    if(session?.data) {
        router.push('/')
    }

    if(session.status === 'unauthenticated') {
    return (
            <div className="items-center justify-center h-screen flex w-screen overflow-hidden relative">
                <div className="flex flex-col sm:gap-32 h-full justify-evenly p-6 sm:h-fit overflow-hidden w-full sm:w-96">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl text-center font-thin">Welcome to 
                            <span className={`text-violet1 `}> Vibee</span>
                        </h1>
                        <h2 className="text-center text-8xl">Sign In</h2>
                    </div>
                    <div>
                        <button className="w-full h-12 gap-2 shadow bg-violet1 rounded-md text-lg font-semibold hover:bg-violet1/80" 
                        onClick={() => signIn('google', { callbackUrl: "http://localhost:3000"})}>
                            Continue with Google
                        </button>
                        <p className="text-sm text-end py-2">Don&apos;t have an account? 
                        <Link href={'/sign-up'} className="text-violet1"> Sign Up</Link></p>
                    </div>

                    <p className="text-slate-400 absolute bottom-2 right-2">Developed by <a href="https://github.com/Esmin53/Vibee">Esmin53</a></p>
                </div>
            </div>
    )
    } else {
        return <div></div>
    }
}

export default SignIn