import { ReactNode } from "react"
import Navbar from "./Navbar"

const Main = ({children}: {children: ReactNode}) => {
    
    return (
        <div className={` bg-gray-200 md:flex-1 w-full 
        md:flex flex-col shadow`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Main