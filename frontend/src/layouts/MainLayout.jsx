import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default MainLayout
