import Chats from "@/components/Chats";
import Main from "@/components/Main";
import UtilityBar from "@/components/UtilityBar";
import { authOptions } from "@/lib/auth";
import { ConversationType } from "@/types/db";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)

  if(!session) {
    redirect('/sign-in')
  }

  const response = await fetch('http://localhost:3000/api/chats', {
    cache: 'no-store',
    headers: headers()
  })

  const data: ConversationType[] = await response.json()

  return (
    <div className="flex w-full h-screen relative">
      <div className="hidden">
        <UtilityBar />
      </div>
      <Main>
        <Chats data={data}/>

      </Main>
    </div>
  )
}
