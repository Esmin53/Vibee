

const Request = () => {

    return (
        <div className="w-full flex min-h-14 p-1.5 gap-2 bg-zinc-100 shadow-sm rounded-sm cursor-pointer">
            <div className="w-10 h-10 rounded-md bg-indigo-400"></div>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between w-full items-center -mt-1">
                    <p className="text-mds font-semibold">Kemal Malovcic</p>
                    <p className="text-gray-400 text-xs">5 mins ago</p>
                </div>
                <p className="text-sm truncate -mb-1">Sent you a message request!</p>
            </div>
        </div>
    )
}

export default Request