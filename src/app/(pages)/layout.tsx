import Main from "@/components/Main"
import UtilityBar from "@/components/UtilityBar"

export default function RootLayout({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full max-h-screen">
      <UtilityBar />
      {children}
    </div>
  )
}
