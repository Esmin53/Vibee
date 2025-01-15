import Providers from '@/components/Providers'
import './globals.css'
import { Inter} from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Vibee',
  description: 'Vibee messaging app',
  icons: {
    icon: "/icon.ico",
    href: "/icon.ico"
  }
}

export default function RootLayout({
  children,

}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/icon.ico' />
      </head>
      <body className={`bg-dark text-zinc-200 ${inter.className} w-screen`}>
        <Providers>
              {children}
        </Providers>
      </body>
    </html>
  )
}
