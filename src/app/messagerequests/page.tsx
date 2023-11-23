import Main from "@/components/Main"
import Sidebar from "@/components/Sidebar"
import UtilityBar from "@/components/UtilityBar"



const MessageRequests = () => {
    
    return (
        <main className="flex h-screen">
            <Sidebar />
            <Main />
            <UtilityBar />
        </main>
    )
}

export default MessageRequests