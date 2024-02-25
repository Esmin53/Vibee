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
    const [isInputActive, setIsInputActive] = useState(false)

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
              setData([])
              setIsInputActive(false)
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
        <div className={`flex items-center relative w-full h-10 sm:h-12 p-1`} ref={searchBarRef}>
            <div className="flex gap-2 items-center w-full z-50">
                <input type="text" placeholder="Search...?" 
                    className="px-2 w-full h-10  rounded-md bg-dark shadow-sm border border-dark3 outline-none text-zinc-100" 
                    onChange={(e) => handleChange(e)}
                    onFocus={() => setIsInputActive(true)}/>
                    <Link href={`/users/${input}`} className={`w-12 h-10 flex justify-center items-center rounded-sm border
                    sm:rounded-md shadow cursor-pointer ${isInputActive ? 'bg-dark border-dark3' : 'bg-dark3 border-dark'}`}>
                        <Search className="text-white w-6 h-6" />
                    </Link>
            </div>

            {data.length === 0 && input.length < 0 && !isLoading ? 
            <div className="w-full flex items-center justify-center font-semibold
             text-gray-600 flex-col relative ">
                <Ghost className="aboslute text-gray-400 w-12 h-12" />
                <p>No results</p>
                </div> : null}
            <div className={`w-full h-fit bg-dark3 absolute -top-1 left-0 z-40 shadow-md flex flex-col border border-dark p-2
                ${isInputActive ? 'pt-12' : 'hidden'} ${isInputActive && data.length === 0 && 'min-h-[24rem]'}`}>
                <p className="px-2">Search results:</p>
                {data.length > 0 && data?.map((item, index) => {
                    if(index > 7) {
                        return <></>
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