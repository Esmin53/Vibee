import Providers from '@/components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import UtilityBar from '@/components/UtilityBar'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vibee',
  description: 'Vibee messaging app',
}

export default function RootLayout({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-zinc-100 ${inter.className}`}>
        <Providers>
          <div className='flex h-screen w-screen overflow-x-hidden'>
            <Sidebar />
            <div className='flex w-screen flex-row-reverse md:flex-row'>
              {children}
              <UtilityBar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
