import Groups from "@/components/Groups"
import Main from "@/components/Main"
import Profile from "@/components/Profile"
import Requests from "@/components/Requests"

const MessageRequests = () => {
    
    return (
        <div className="flex h-screen flex-1">
            <Main>
                <div className="w-full h-full flex gap-2 p-2">
                    <div className="flex flex-col w-1/3 gap-2 pb-2">
                        <Profile />
                        <Groups />
                    </div>
                    <div className="flex-1 h-full pb-2">
                        <Requests />
                    </div>
                </div>
            </Main>
        </div>
    )
}

export default MessageRequests