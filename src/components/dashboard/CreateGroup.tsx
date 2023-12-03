import { Check } from "lucide-react"

const CreateGroup = () => {

    return (
        <div>
            <h2 className="text-xl font-semibold">Create new group</h2>
            <div className="w-full flex flex-col gap-2">
                <p className="px-1 font-semibold text-gray-400">Name your groupchat</p>
                <div className="flex justify-center gap-1">
                    <input type="text" className="w-full py-2 rounded-md pl-1 shadow bg-zinc-100" placeholder="My groupchat"/>
                    <button className="w-12 rounded-md flex justify-center items-center bg-green-600 text-white">
                        <Check />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup