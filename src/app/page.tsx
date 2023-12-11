import Chats from "@/components/Chats";
import Conversation from "@/components/Conversation";
import Main from "@/components/Main";
import UtilityBar from "@/components/UtilityBar";
import { authOptions } from "@/lib/auth";
import { Mail, MailQuestion } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)

 if(!session) {
  redirect('/sign-in')
 }

  return (
    <div className="flex w-full h-screen relative">
      <UtilityBar />
      <Main>
        <Chats />

      </Main>
    </div>
  )
}
