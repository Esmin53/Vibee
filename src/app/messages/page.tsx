import Main from "@/components/Main"
import Sidebar from "@/components/Sidebar"
import UtilityBar from "@/components/UtilityBar"
import ChatBar from "@/components/chat/Chatbar"

const Messages = () => {
     
    return (
        <main className="flex h-screen flex-1">
            <Main 
            >
                <ChatBar />
            </Main>
        </main>
    )
}

export default Messages