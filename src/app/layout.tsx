import Providers from '@/components/Providers'
import './globals.css'
import { Inter, Pacifico } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const pacifico = Pacifico({ weight: '400', subsets: ['latin']})

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
      <body className={`bg-zinc-100 ${inter.className} w-screen`}>
        <Providers>
              {children}
        </Providers>
      </body>
    </html>
  )
}
