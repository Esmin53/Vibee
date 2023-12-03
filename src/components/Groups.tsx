import { Button } from "./ui/button"

const Groups = () => {
    return (
        <div className="w-full gap-2 flex flex-col rounded-lg jusify-center ">
            <h2 className="text-xl font-semibold text-gray-500">Groups</h2>
            <div className="flex flex-wrap  gap-2 justify-center">
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
                <div className="w-20 h-20 bg-red-100 rounded-md">Test</div>
            </div>
            <Button >See All</Button>
        </div>
    )
}

export default Groups