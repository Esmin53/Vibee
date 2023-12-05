import { ReactNode } from "react"
import Navbar from "./Navbar"

const Main = ({children}: {children: ReactNode}) => {
    
    return (
        <div className={`h-full bg-gray-200 md:flex-1 w-full 
        md:flex flex-col shadow relative`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Main