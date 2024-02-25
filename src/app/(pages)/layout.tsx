export default function RootLayout({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full h-screen">
        {children}
    </div>
  )
}
