import Link from "next/link"
import FooterComponent from "./FooterComponent"
import SearchBar from "./Searchbar"

const EmptySideBar = () => {
    return (
        <div className={` h-full hidden md:flex flex-col md:w-72 lg:w-96  bg-dark2 border-r border-dark3`}>
        <div className="w-full h-20 flex items-center px-4 border-b border-dark3 shadow-sm">
          <Link href='/' className={`text-violet1 text-5xl`}>Vibee</Link>
        </div>
        <div className="w-full flex px-2 pt-2 justify-center">
          <SearchBar />
        </div>
          <FooterComponent />
        </div>
    )
}

export default EmptySideBar