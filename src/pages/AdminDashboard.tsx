import { useEffect, useState } from 'react'
import { ArrowLeft, RefreshCw, Clock, CheckCircle, Calendar, ChevronDown, ChevronUp, Building2, Mail, Phone, User, MessageSquare, Edit3, Save, X, Search, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Booking, BookingStatus } from '../types'

interface AdminDashboardProps {
  onNavigate: (page: 'home' | 'booking' | 'admin') => void
}

const STATUS_CONFIG: Record<BookingStatus, {
  label: string
  color: string
  bg: string
  border: string
  dot: string
  icon: React.ReactNode
}> = {
  pending: {
    label: 'Recepción de Requerimiento',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  under_review: {
    label: 'Análisis de Viabilidad Técnica',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    icon: <RefreshCw className="w-3.5 h-3.5" />,
  },
  scheduled: {
    label: 'Reunión Agendada',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-CL', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

function formatRelative(dateStr: string) {
  const d = new Date(dateStr)
  const diff = Date.now() - d.getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (hours < 1) return 'Hace menos de 1 hora'
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
  if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`
  return formatDate(dateStr)
}

interface BookingCardProps {
  booking: Booking
  onStatusChange: (id: string, status: BookingStatus) => void
  onNotesChange: (id: string, notes: string) => void
}

function BookingCard({ booking, onStatusChange, onNotesChange }: BookingCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes] = useState(booking.admin_notes || '')
  const [saving, setSaving] = useState(false)

  async function saveNotes() {
    setSaving(true)
    await onNotesChange(booking.id, notes)
    setEditingNotes(false)
    setSaving(false)
  }

  return (
    <div className={`border rounded-xl bg-gray-900/60 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 ${
      booking.status === 'scheduled' ? 'border-emerald-500/30' : 'border-gray-800/60'
    }`}>
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <StatusBadge status={booking.status} />
              <span className="text-gray-600 text-xs font-mono">
                #{booking.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg truncate mt-2">
              {booking.organization_name}
            </h3>
            <p className="text-gray-500 text-sm">
              {booking.contact_name}
              {booking.contact_role && <span className="text-gray-600"> · {booking.contact_role}</span>}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-gray-600 text-xs">{formatRelative(booking.created_at)}</p>
            {booking.preferred_date && (
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1 justify-end">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(booking.preferred_date)}</span>
                {booking.preferred_time && <span>· {booking.preferred_time}</span>}
              </div>
            )}
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600 mt-2 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600 mt-2 ml-auto" />
            )}
          </div>
        </div>

        {booking.services && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800/60 border border-gray-700/40 text-gray-400 text-xs">
            <Building2 className="w-3 h-3" />
            {booking.services.title}
          </div>
        )}
      </div>

      {expanded && (
        <div className="border-t border-gray-800/60 p-5 space-y-5">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: <Mail className="w-3.5 h-3.5" />, label: 'Email', value: booking.contact_email },
              { icon: <Phone className="w-3.5 h-3.5" />, label: 'Teléfono', value: booking.contact_phone || '—' },
              { icon: <User className="w-3.5 h-3.5" />, label: 'Cargo', value: booking.contact_role || '—' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
                <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-1">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <p className="text-gray-300 text-sm font-medium truncate">{item.value}</p>
              </div>
            ))}
          </div>

          {booking.message && (
            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contexto del Requerimiento</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{booking.message}</p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Notas Internas</span>
              </div>
              {!editingNotes && (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="text-gray-600 hover:text-cyan-400 text-xs flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  Editar
                </button>
              )}
            </div>
            {editingNotes ? (
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Agregar notas internas..."
                  className="w-full bg-gray-800/60 border border-gray-700/60 rounded-lg px-3 py-2 text-white text-sm
                    placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveNotes}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-medium rounded hover:bg-cyan-500/30 transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button
                    onClick={() => { setEditingNotes(false); setNotes(booking.admin_notes || '') }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/60 border border-gray-700/40 text-gray-500 text-xs font-medium rounded hover:text-gray-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30 min-h-[52px]">
                <p className={`text-sm leading-relaxed ${notes ? 'text-gray-300' : 'text-gray-700 italic'}`}>
                  {notes || 'Sin notas internas'}
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-600 text-xs tracking-widest uppercase mb-3">Cambiar Estado</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map((s) => {
                const c = STATUS_CONFIG[s]
                const isActive = booking.status === s
                return (
                  <button
                    key={s}
                    onClick={() => !isActive && onStatusChange(booking.id, s)}
                    disabled={isActive}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                      isActive
                        ? `${c.color} ${c.bg} ${c.border} cursor-default`
                        : 'text-gray-500 bg-gray-800/40 border-gray-700/40 hover:border-gray-600 hover:text-gray-300'
                    }`}
                  >
                    {c.icon}
                    {c.label}
                    {isActive && <span className="ml-1 text-[10px] opacity-70">(actual)</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all')
  const [refreshing, setRefreshing] = useState(false)

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*, services(*)')
      .order('created_at', { ascending: false })
    if (data) setBookings(data as Booking[])
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    supabase
      .from('bookings')
      .select('*, services(*)')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setBookings(data as Booking[])
        setLoading(false)
      })
  }, [])

  async function handleStatusChange(id: string, status: BookingStatus) {
    await supabase.from('bookings').update({ status }).eq('id', id)
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  async function handleNotesChange(id: string, admin_notes: string) {
    await supabase.from('bookings').update({ admin_notes }).eq('id', id)
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, admin_notes } : b))
    )
  }

  function handleRefresh() {
    setRefreshing(true)
    fetchBookings()
  }

  const filtered = bookings.filter((b) => {
    const matchStatus = filterStatus === 'all' || b.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch = !q || [
      b.organization_name, b.contact_name, b.contact_email, b.contact_role
    ].some((v) => v?.toLowerCase().includes(q))
    return matchStatus && matchSearch
  })

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    under_review: bookings.filter((b) => b.status === 'under_review').length,
    scheduled: bookings.filter((b) => b.status === 'scheduled').length,
  }

  return (
    <div className="min-h-screen bg-[#030712] px-6 py-10">
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al sitio
            </button>
            <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-1">
              Panel de Control
            </p>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Prospectos Institucionales
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Gestión de solicitudes y agendamiento B2B/G2B · NEXXUV
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700/60 text-gray-500 text-sm rounded hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {([
            { key: 'all' as const, label: 'Total Solicitudes', color: 'text-white', border: 'border-gray-700/40' },
            { key: 'pending' as const, label: 'En Recepción', color: 'text-amber-400', border: 'border-amber-500/20' },
            { key: 'under_review' as const, label: 'En Análisis', color: 'text-cyan-400', border: 'border-cyan-500/20' },
            { key: 'scheduled' as const, label: 'Agendadas', color: 'text-emerald-400', border: 'border-emerald-500/20' },
          ]).map(({ key, label, color, border }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`p-4 rounded-xl border bg-gray-900/60 text-left transition-all duration-200 ${border} ${
                filterStatus === key ? 'ring-1 ring-cyan-500/30' : 'hover:border-gray-600/60'
              }`}
            >
              <div className={`text-2xl font-black ${color}`}>{counts[key]}</div>
              <div className="text-gray-600 text-xs mt-1 tracking-wide">{label}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar organización, contacto..."
              className="w-full bg-gray-900/80 border border-gray-700/60 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm
                placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
              className="bg-gray-900/80 border border-gray-700/60 rounded-lg pl-10 pr-8 py-2.5 text-sm text-gray-300
                focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
              style={{ colorScheme: 'dark' }}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Recepción</option>
              <option value="under_review">En Análisis</option>
              <option value="scheduled">Agendadas</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-700 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-gray-600 text-sm">Cargando solicitudes...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-gray-800/60 rounded-xl bg-gray-900/30">
            <p className="text-gray-600 text-lg font-medium">Sin solicitudes</p>
            <p className="text-gray-700 text-sm mt-1">
              {search || filterStatus !== 'all' ? 'No hay resultados para los filtros aplicados.' : 'Aún no se han recibido solicitudes.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            ))}
          </div>
        )}

        <p className="text-center text-gray-800 text-xs mt-8">
          NEXXUV · Panel Administrativo · {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} mostrado{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
