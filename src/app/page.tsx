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
    <div className="flex w-full h-screen">
      <Sidebar />
      <Main>
        <div className="h-full w-full flex justify-center items-center p-2 ">
          <div className="h-full w-full flex gap-2 p-2 ">
              <div className="w-1/3 h-full px-2 flex flex-col">
                <UserInfo />
                <hr className="h-0 border-b border-gray-300 mx-3 my-4 opacity-80 shadow" />
                <CreateGroup />
              </div>

              <div className="w-2/3 h-full flex gap-2">
              
              <div className="w-3/5 h-full bg-zinc-100 shadow-sm flex flex-col gap-2 p-2">
                <div className="w-full h-6 px-1 flex justify-between items-center">
                  <p className="text-xl font-semibold">Messages</p>

                  <div className="w-16 h-7 bg-gray-200 rounded-sm flex items-center justify-between px-1 shadow-sm">
                        <Mail className="text-gray-500 font-semibold w-6 h-6"/>
                        <p className="font-semibold">27</p>
                    </div>
                </div>

                <hr className="h-0 border-b border-gray-300 mx-2 opacity-80 shadow" />

                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
              </div>

              <hr className="h-full border-r-2 border-gray-300 ml-2 opacity-80 shadow" />

                <hr className="h-0 border-b border-gray-300 mx-3 opacity-80 shadow" />
                <Requests />


              </div>







          </div>
        </div>
      </Main>
      <UtilityBar />
    </div>
  )
}
