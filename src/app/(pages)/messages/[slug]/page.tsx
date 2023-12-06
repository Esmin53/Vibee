import Main from "@/components/Main"
import ChatBar from "@/components/chat/Chatbar"
import Info from "@/components/chat/Info"
import Messages from "@/components/chat/Messages"
import { Ghost } from "lucide-react"
import { headers } from "next/headers"

interface PageProps {
    params: {
      slug: string
    }
  }

const SendMessage = async ({params}: PageProps) => {
    
    const { slug } = params

    const response = await fetch(`http://localhost:3000/api/messages?q=${slug}`, {
        method: 'GET',
        cache: 'no-store',
        headers: headers()
    })

    const data = await response.json()

    return (

            <Main>
                <Info userId={slug} />
                {data?.id ? <Messages {...data} /> : <div className="flex w-full items-center h-full flex-col relative">
                  <div className="w-full xl:max-w-4xl lg:max-w-2xl md:max-w-xl gap-1 h-full flex justify-center items-center flex-col overflow-y-auto">
                    <Ghost className="w-24 h-24 text-gray-400" />
                    <h1 className="text-xl text-gray-400 font-semibold">Pretty empty in here.</h1>
                  </div>
                </div>}
                <ChatBar />
            </Main>


    )
}

export default SendMessage