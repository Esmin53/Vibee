import Conversation from "@/components/Conversation";
import Groups from "@/components/Groups";
import Main from "@/components/Main";
import Requests from "@/components/Requests";
import Sidebar from "@/components/Sidebar";
import UtilityBar from "@/components/UtilityBar";
import CreateGroup from "@/components/dashboard/CreateGroup";
import UserInfo from "@/components/dashboard/UserInfo";
import { Mail, MailQuestion } from "lucide-react";

export default async function Home() {

  return (
    <div className="flex w-full h-screen relative">
      <UtilityBar />
      <Main>

              <div className="w-full h-full flex flex-col-reverse md:flex-row gap-2 md:p-2">
              
              <div className="md:w-3/5 w-full h-full bg-zinc-100 shadow-sm flex flex-col gap-2 p-2">
                <div className="w-full h-6 px-1 flex justify-between items-center">
                  <p className="text-xl font-semibold">Messages</p>
                  <div className="w-16 h-7 bg-gray-200 rounded-sm flex items-center justify-between px-1 shadow-sm">
                        <Mail className="text-gray-500 font-semibold w-6 h-6"/>
                        <p className="font-semibold">27</p>
                    </div>
                </div>
                <hr className="w-full border-b-2 border-gray-300 my-2 opacity-80 shadow" />
              </div>



                <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
                <Requests />

        </div>
      </Main>
    </div>
  )
}
