import { Roboto } from 'next/font/google';
import './Tailwind.css';
import './Style.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


const lato = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Bikers Clan',
  description: 'Make Bikers Happy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-gray-50 transition-all overflow-x-hidden`}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
