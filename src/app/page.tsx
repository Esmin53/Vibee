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
    <div className="flex w-full h-screen relative">
        <UtilityBar data={data}/>
       <Main>
          <div className="w-full flex md:hidden px-2 pt-2 justify-center">
              <SearchBar />
          </div>
        <div className="w-full h-full hidden md:flex justify-center items-center">
            <h1 className="text-7xl lg:text-8xl xl:text-9xl text-slate-500 text-center">Wellcome to <br/> 
            <span className={`text-violet1 ${pacifico.className}`}>Vibee</span></h1>
        </div>
        <div className=" md:hidden">
          <Chats data={data} userId={session.user.id}/>
        </div>
        <div className="w-full md:hidden fixed bottom-0">
          <FooterComponent />
        </div>
      </Main>
    </div>
  )
}
