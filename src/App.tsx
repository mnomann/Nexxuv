import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BookingForm from './pages/BookingForm'
import AdminDashboard from './pages/AdminDashboard'

type Page = 'home' | 'booking' | 'admin'

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  function navigate(page: Page) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#030712] min-h-screen">
      {currentPage !== 'admin' && (
        <Header currentPage={currentPage} onNavigate={navigate} />
      )}
      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'booking' && <BookingForm onNavigate={navigate} />}
      {currentPage === 'admin' && <AdminDashboard onNavigate={navigate} />}
      {currentPage !== 'admin' && <Footer />}
    </div>
  )
}

export default App
