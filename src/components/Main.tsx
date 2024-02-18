import { ReactNode } from "react"
import Navbar from "./Navbar"

const Main = ({children}: {children: ReactNode}) => {
    
    return (
        <div className={` bg-dark md:flex-1 w-full 
        md:flex flex-col`}>
            <Navbar />
            {children}
        </div>
    )
}

export default Main