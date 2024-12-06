import Chats from "@/components/Chats";
import EmptySideBar from "@/components/EmptySidebar";
import FooterComponent from "@/components/FooterComponent";
import Main from "@/components/Main";
import SearchBar from "@/components/Searchbar";
import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/lib/auth";
import { ConversationType } from "@/types/db";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Home() {

  const session = await getServerSession(authOptions)

  if(!session) {
    redirect('/sign-in')
  } else {
    toast({variant: 'default', title: 'test', description: 'test'})
  }

  const myHeaders = headers()

  const response = await fetch('http://localhost:3000/api/chats', {
    cache: 'no-store',
    headers: myHeaders
  })

  const data: ConversationType[] = await response.json()

  return (
    <div className="flex w-full h-screen relative overflow-hidden">
          <EmptySideBar />
          <Main>
          <div className="w-full flex md:hidden px-2 pt-2 justify-center">
              <SearchBar />
          </div>
          <Chats data={data} userId={session?.user?.id || ''} className="pb-20 md:pb-2"/>
        <div className="w-full md:hidden fixed bottom-0">
          <FooterComponent />
        </div>
      </Main>
    </div>
  )
}
