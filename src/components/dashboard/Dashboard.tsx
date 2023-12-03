
import UserInfo from "./UserInfo"
import Groups from "../Groups"
import CreateGroup from "./CreateGroup"
import Conversation from "../Conversation"
import GroupChat from "./GroupChat"

const Dashboard = () => {

    return (
        <div className="w-full h-full flex-col md:flex-row flex gap-2 justify-center">
            <div className="h-full w-1/4 flex flex-col py-2 ">
                <UserInfo />
                <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow my-2" />
                <Groups />
                <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow my-2" />
                <CreateGroup />
            </div>

            <div className="w-2/4 h-full flex py-2 gap-2 ">
        
                <div className="flex flex-col h-full bg-gray-200 p-2 gap-1 border-2 border-zinc-100 shadow">
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
     
                <GroupChat />
     
            </div>
        </div>
    )
}

export default Dashboard