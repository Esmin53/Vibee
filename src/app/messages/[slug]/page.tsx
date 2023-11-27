import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Messages from "@/components/chat/Messages"

const SendMessage = () => {
    
    return (
        <div className="flex h-screen flex-1">
            <Main>
                <Messages />
                <ChatBar />
            </Main>
        </div>
    )
}

export default SendMessage