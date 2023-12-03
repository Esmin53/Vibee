
const Conversation = () => {

    return (
        <div className="w-full flex min-h-14 p-1 gap-2 cursor-pointer hover:-mt-1">
            <div className="w-12 h-12 rounded-md bg-rose-400"></div>
            <div className="flex flex-col flex-1  h-fit max-h-20">
                <div className="flex justify-between w-full items-center">
                    <p className="text-mds font-semibold">Kemal Malovcic</p>
                    <p className="text-gray-400 text-xs">5 mins ago</p>
                </div>
                <p className="text-sm border-b-2 border-gray-200">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus provident optio iusto quibusdam impedit temporibus.</p>
            </div>
        </div>
    )
}

export default Conversation