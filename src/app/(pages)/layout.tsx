import Sidebar from "@/components/Sidebar"
import UtilityBar from "@/components/UtilityBar"

export default function RootLayout({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full h-screen">
        <UtilityBar />
        {children}
    </div>
  )
}
