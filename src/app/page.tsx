import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)

  if(session) {
    redirect("/messages")
  }

  //console.log(session)

  return (
    <main className="flex justify-center items-center h-screen">
        <div className="w-1/2 flex items-center justify-center h-full flex-col px-6 gap">
          <h1 className="text-5xl font-semibold">Welcome to <span className="text-green-600 font-bold">Vibee</span></h1>
          <p className="text-xl text-gray-600">Free and secure text messaging app! Chat with anyone anywhere in the world.</p>
          <Button className="mt-6 w-40 py-6">Get Started</Button>
        </div>
        <div className="w-1/2 h-full">
        </div> 
    </main>
  )
}
