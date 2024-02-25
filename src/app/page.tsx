import Chats from "@/components/Chats";
import FooterComponent from "@/components/FooterComponent";
import Main from "@/components/Main";
import SearchBar from "@/components/Searchbar";
import UtilityBar from "@/components/UtilityBar";
import { authOptions } from "@/lib/auth";
import { ConversationType } from "@/types/db";
import { pacifico } from "@/app/layout"
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
    <div className="flex w-full h-screen relative overflow-hidden">
      <div className={` h-full hidden md:flex flex-col md:w-72 lg:w-96  bg-dark2 border-r border-dark3`}>
            <div className="w-full h-20 flex items-center px-4 border-b border-dark3 shadow-sm">
              <h2 className={`text-violet1 text-5xl ${pacifico.className} `}>Vibee</h2>
            </div>
            <div className="w-full flex px-2 pt-2 justify-center">
              <SearchBar />
            </div>
              <FooterComponent />
            </div>
          <Main>

          <div className="w-full flex md:hidden px-2 pt-2 justify-center">
              <SearchBar />
          </div>
          <Chats data={data} userId={session.user.id} className="pb-20 md:pb-2"/>
        <div className="w-full md:hidden fixed bottom-0">
          <FooterComponent />
        </div>

      </Main>
    </div>
  )
}
