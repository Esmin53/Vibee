"use client"

import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Accounts = () => {

    const pathname = usePathname()
    const q = pathname.split('/')[2]
    const [users, setUsers] = useState<User[] >([])

    console.log(q)

    const {mutate: getUsers} = useMutation({
        mutationFn: async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/accounts?q=${q}`)

                const data: User[] = await response.json()

                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }
    })

    useEffect(() => {
        getUsers()
    }, [])



    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 p-2">
            <div className="w-full max-w-3xl border-b-2 py-2 border-b-dark3 flex gap-1 sm:gap-2 items-bottom my-2">
                <h1 className="text-lg sm:text-2xl">Search results for: </h1>
                <p className="sm:text-lg flex items-end justify-end">&quot;{q}&quot;</p>
            </div>   
            {users?.map((item: User) => {
                return <Link href={`/messages/${item.id}`} key={item?.id} className="max-w-3xl w-full bg-dark2 p-1 sm:p-2 flex gap-2 sm:gap-4 
                sm:rounded-md rounded-sm border border-dark3 shadow-sm">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative overflow-hidden rounded-md">
                        {item?.image && <Image fill src={item?.image} alt="User avatar" />}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-xl md:text-2xl">{item.name}</h1>
                        <p className="text-sm sm:text-md">{item.email}</p>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default Accounts