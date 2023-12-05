"use client"

import { useSidebarContext } from "@/app/context/context"
import { Sidebar } from "lucide-react"

const ToggleSidebar = () => {

    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()

    return <button className="md:hidden"
    onClick={() => setIsSidebarOpen(prev => !prev)}>
        <Sidebar className="w-8 h-8 text-gray-500 " />
    </button>
}

export default ToggleSidebar