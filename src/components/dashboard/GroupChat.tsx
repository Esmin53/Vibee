import Conversation from "../Conversation"
import Groups from "../Groups"

const GroupChat = () => {

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col h-fit max-h-full bg-gray-200 p-2 gap-1 border-2 border-zinc-100 shadow">
            <div className="w-full bg-gray-200 flex items-center px-4 py-2">
                <p className="text-gray-400 font-semibold text-xl">My Chats</p>
            </div>
            <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow mb-2" />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />

            </div>
   
        </div>

    )
}

export default GroupChat