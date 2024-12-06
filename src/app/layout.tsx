import Providers from '@/components/Providers'
import './globals.css'
import { Inter} from 'next/font/google'

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
      <body className={`bg-dark text-zinc-200 ${inter.className} w-screen`}>
        <Providers>
              {children}
        </Providers>
      </body>
    </html>
  )
}
