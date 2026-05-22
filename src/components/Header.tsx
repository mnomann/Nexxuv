import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavLink } from '../types'

const navLinks: NavLink[] = [
  { label: 'GovTech', href: '#govtech' },
  { label: 'Casos de Éxito', href: '#casos' },
  { label: 'Capacidades', href: '#capacidades' },
]

function handleSmoothScroll(href: string) {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const NexxuvLogo = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 80M80 20L20 80" stroke="white" strokeWidth="12" strokeLinecap="round" />
    <path d="M10 85C30 65 60 35 90 10" stroke="#00e5ff" strokeWidth="6" strokeLinecap="round" />
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    handleSmoothScroll(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3"
          style={{ filter: 'drop-shadow(0 0 15px rgba(0, 229, 255, 0.25))' }}
        >
          <NexxuvLogo />
          <span className="text-lg font-extrabold tracking-tighter uppercase text-white">
            Nexxuv
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-12" aria-label="Navegación principal">
          <div className="flex space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="hover:text-[#00e5ff] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contacto')
            }}
            className="text-white text-[11px] font-bold uppercase tracking-widest border border-[#00e5ff]/40 px-6 py-2.5 rounded-full hover:bg-[#00e5ff] hover:text-black transition-all duration-300"
          >
            Contacto Institucional
          </Link>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-[#00e5ff] transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/5 bg-[#030712] overflow-hidden"
            aria-label="Navegación móvil"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to="/"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="block px-4 py-3 rounded-lg text-gray-400 hover:text-[#00e5ff] hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contacto')
                }}
                className="block px-4 py-3 rounded-full bg-[#00e5ff] text-black text-center text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                Contacto Institucional
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
