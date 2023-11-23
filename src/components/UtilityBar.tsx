import SearchBar from "./Searchbar"
import { Button } from "./ui/button"

//bg-[#bdc1c5]

const UtilityBar = () => {
    return (
        <div className="flex-none h-full bg-gray-200 flex flex-col border-l-4 border-l-zinc-50">
            <SearchBar />
            <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
        </div>
    )
}

export default UtilityBar