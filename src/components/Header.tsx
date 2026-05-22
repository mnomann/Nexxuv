import { useState, useEffect, useRef } from 'react'
import { Cpu, Menu, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface HeaderProps {
  currentPage: 'home' | 'booking' | 'admin'
  onNavigate: (page: 'home' | 'booking' | 'admin') => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [session, setSession] = useState<import('@supabase/supabase-js').Session | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const tapRef = useRef({ count: 0, lastTap: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setShowLoginModal(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLogoClick = () => {
    const now = Date.now()
    if (now - tapRef.current.lastTap > 1000) {
      tapRef.current.count = 1
    } else {
      tapRef.current.count += 1
    }
    tapRef.current.lastTap = now
    if (tapRef.current.count >= 5) {
      setShowLoginModal(true)
      tapRef.current.count = 0
    }
    onNavigate('home')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert('Acceso denegado: Credenciales inválidas.')
    } else {
      setShowLoginModal(false)
      setEmail('')
      setPassword('')
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onNavigate('home')
  }

  const navLinks = [
    { label: 'Inicio', page: 'home' as const },
    { label: 'Servicios', page: 'home' as const, anchor: '#servicios' },
    { label: 'Nosotros', page: 'home' as const, anchor: '#nosotros' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <Cpu className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm group-hover:bg-cyan-300/30 transition-all" />
            </div>
            <span className="text-white font-bold text-xl tracking-widest">
              NEX<span className="text-cyan-400">XUV</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.page)
                  if (link.anchor) {
                    setTimeout(() => {
                      document.querySelector(link.anchor!)?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                }}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium tracking-wider uppercase transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}

            {session && (
              <button
                onClick={() => onNavigate('admin')}
                className="text-red-400 hover:text-red-300 text-xs font-medium tracking-wider uppercase transition-colors duration-200 border border-red-500/30 hover:border-red-500/50 bg-red-500/10 px-3 py-1.5 rounded"
              >
                Panel Admin
              </button>
            )}

            {session && (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-300 text-xs font-medium tracking-wider uppercase transition-colors duration-200"
              >
                Salir
              </button>
            )}

            <button
              onClick={() => onNavigate('booking')}
              className={`px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded border transition-all duration-200 ${
                currentPage === 'booking'
                  ? 'bg-cyan-400 text-gray-900 border-cyan-400'
                  : 'bg-transparent text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
              }`}
            >
              Agendar Reunión
            </button>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#030712]/98 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMenuOpen(false)
                  onNavigate(link.page)
                  if (link.anchor) {
                    setTimeout(() => {
                      document.querySelector(link.anchor!)?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                }}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium tracking-wider uppercase transition-colors text-left"
              >
                {link.label}
              </button>
            ))}

            {session && (
              <button
                onClick={() => { setMenuOpen(false); onNavigate('admin') }}
                className="w-full px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-center"
              >
                Panel Admin
              </button>
            )}
            {session && (
              <button
                onClick={() => { setMenuOpen(false); handleLogout() }}
                className="w-full px-5 py-2 text-sm font-semibold tracking-wider uppercase text-gray-500 hover:text-gray-300 transition-all text-center"
              >
                Cerrar Sesión
              </button>
            )}

            <button
              onClick={() => { setMenuOpen(false); onNavigate('booking') }}
              className="w-full px-5 py-2 text-sm font-semibold tracking-wider uppercase rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all"
            >
              Agendar Reunión
            </button>
          </div>
        )}
      </nav>

      {showLoginModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)'
          }}
          className="px-4"
        >
          <div
            style={{ maxWidth: '400px', width: '100%' }}
            className="bg-[#0b0f19] border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(0,229,255,0.15)] relative p-8 px-8 md:px-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <h3 className="text-lg font-bold text-white tracking-wide mb-2">Terminal de Infraestructura</h3>
            <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Acceso Restringido</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Identificador corporativo</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="acceso@restringido.com"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Clave de acceso</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold text-xs uppercase tracking-widest rounded transition-colors"
              >
                {loading ? 'Validando...' : 'Autenticar'}
              </button>
            </form>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full text-center text-xs text-gray-600 hover:text-gray-400 mt-5 transition-colors uppercase tracking-widest"
            >
              Abortar Conexión
            </button>
          </div>
        </div>
      )}
    </>
  )
}
