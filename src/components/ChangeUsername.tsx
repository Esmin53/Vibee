"use client"

import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

const ChangeUsername = () => {

    const session = useSession()
    const [newUsername, setewUsername] = useState(session.data?.user.name || '')
    const [isLoading, setIsLoading] = useState(false)

    const { mutate: changeUsername } = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch('http://localhost:3000/api/settings/username', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: newUsername
                    })
                })

                const data = await response.json()

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full flex justify-center p-2">
            <form className="w-full max-w-4xl bg-dark2 flex flex-col p-2 gap-2" onSubmit={(e) => {
                e.preventDefault()
                setIsLoading(true)
                changeUsername()
            }}>
                <h2>Change username</h2>
                <div className="flex flex-col sm:flex-row w-full gap-2">
                    <input type="text" className="flex-1 h-10 bg-dark3 p-2 rounded-sm border border-dark outline-none" 
                    placeholder={session?.data?.user.name || 'New username'} value={newUsername} onChange={(e) => setewUsername(e.target.value)}/>
                    <button className="p-2 bg-violet1 rounded-sm text-sm" type="submit" disabled={isLoading}>{
                    isLoading ? <Loader2 className="animate-spin" /> : 'Change username'}</button>
                </div>
            </form>
        </div>
    )
}

export default ChangeUsername