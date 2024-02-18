"use client"

import { SearchRequest } from "@/lib/validators/search"
import {  useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import UserCard from "./UserCard"
import Link from "next/link"
import { Ghost, Search } from "lucide-react"

export type Data = 
    {
        id: string
        name?: string
        email?: string
        image?: string
    }


const SearchBar = () => {
    const [input, setInput] = useState<SearchRequest>("")
    const [data, setData] = useState<Data[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const searchBarRef = useRef<HTMLDivElement>(null)

     const { mutate: search } = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            const response =await fetch(`http://localhost:3000/api/accounts?q=${input}`) 

            const  data  = await response.json()

            if(data.length - 1 <= 0) setData([])
            setData(data)
        },
        onSettled: async () => {
            if(!input.trim()) {
                setData([])
                setIsLoading(false)
            }
        }
     })

     const debouncedRequest = debounce(() => {
        search()
     }, 300)
     

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        input.length + 1 > 0 && debouncedRequest()
        data.length === 0 && setData([])
     }
   

      useEffect(() => {
        const handleClickOutside = (event: React.MouseEvent) => {
            if ( !searchBarRef.current?.contains(event.target as Node)) {
              setInput('')
              setData([])
            }   
          };

          //@ts-ignore
          window.addEventListener("mousedown", handleClickOutside);

          return () => {
            //@ts-expect-error
            window.removeEventListener("mousedown", handleClickOutside);
          };

      }, [searchBarRef]);


    return (
        <div className="flex items-center relative w-full h-10 sm:h-12" ref={searchBarRef}>
            <div className="flex gap-2 items-center w-full">
                <input type="text" placeholder="Search...?" 
                    className="px-2 w-full h-10  rounded-md bg-dark shadow-sm border border-dark3 outline-none text-zinc-100" 
                    onChange={(e) => handleChange(e)}/>
                    <div className="w-12 h-10 bg-dark3 flex justify-center items-center rounded-sm sm:rounded-md shadow cursor-pointer">
                        <Search className="text-white w-6 h-6" />
                    </div>
            </div>
            {data.length === 0 && input.length < 0 && !isLoading ? <div className="w-full flex items-center justify-center font-semibold
             text-gray-600 py-2 flex-col relative">
                <Ghost className="aboslute text-gray-400 w-12 h-12" />
                <p>No results</p>
                </div> : null}
            <div className="w-full h-fit px-2 bg-dark3 rounded-md absolute top-14 left-0 z-50 shadow flex flex-col">
                {data.length > 0 && data?.map((item, index) => {
                    if(index === 7) {
                        return <Link href={`/users/${input}`} key={index} >
                            <p className="w-full text-center font-semibold text-sm text-blue-500 cursor-pointer 
                                   hover:text-md">See all results</p>
                            </Link>
                    }

                    return <Link href={`/messages/${item.id}`} key={index} className="w-full py-1  cursor-pointer"> 
                        <UserCard {...item} />
                    </Link> 
                })}
            </div>
        </div>
    )
}

export default SearchBar