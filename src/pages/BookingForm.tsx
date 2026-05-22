import { useState } from 'react'
import { ArrowLeft, CheckCircle, Cpu, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Service, BookingInsert } from '../types'

interface BookingFormProps {
  onNavigate: (page: 'home' | 'booking' | 'admin') => void
}

type FormStep = 'select' | 'details' | 'success'

const CATEGORY_LABELS: Record<string, string> = {
  arquitectura: 'Arquitectura de Plataformas',
  automatizacion: 'Automatización de Procesos',
  consultoria: 'Consultoría Técnica',
  general: 'General',
  desarrollo: 'Desarrollo de Software',
}

const CATEGORY_COLORS: Record<string, string> = {
  arquitectura: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  automatizacion: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  consultoria: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  general: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  desarrollo: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
}

function GlowCard({ children, className = '', selected = false, onClick }: {
  children: React.ReactNode
  className?: string
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`relative border rounded-xl bg-gray-900/60 backdrop-blur-sm transition-all duration-300 ${
        selected
          ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(0,229,255,0.2)]'
          : 'border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {selected && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function InputField({
  label, name, type = 'text', value, onChange, placeholder, required, textarea = false
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder?: string
  required?: boolean
  textarea?: boolean
}) {
  const baseClasses = `w-full bg-gray-900/80 border border-gray-700/60 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm
    focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
    hover:border-gray-600/80 transition-all duration-200`

  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium tracking-widest uppercase mb-2">
        {label} {required && <span className="text-cyan-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  )
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]

export default function BookingForm({ onNavigate }: BookingFormProps) {
  const [step, setStep] = useState<FormStep>('select')
  const defaultServices: Service[] = [
    {
      id: '1',
      title: 'Desarrollo de Software',
      description: 'Python, integraciones avanzadas de bases de datos.',
      duration_minutes: 60,
      category: 'desarrollo',
      display_order: 1,
      created_at: '',
    },
    {
      id: '2',
      title: 'Automatización de Flujos',
      description: 'Salesforce, Make, Zapier.',
      duration_minutes: 45,
      category: 'automatizacion',
      display_order: 2,
      created_at: '',
    },
    {
      id: '3',
      title: 'Consultoría de Procesos',
      description: 'Análisis y optimización de flujos operativos críticos.',
      duration_minutes: 60,
      category: 'consultoria',
      display_order: 3,
      created_at: '',
    },
  ]
  const [services] = useState<Service[]>(defaultServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookingId, setBookingId] = useState('')

  const [form, setForm] = useState({
    organization_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_role: '',
    message: '',
    preferred_date: '',
    preferred_time: '',
  })



  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedService) return
    setLoading(true)
    setError('')

    const payload: BookingInsert = {
      service_id: selectedService.id,
      ...form,
    }

    const { data, error: err } = await supabase.from('bookings').insert(payload).select('id').single()

    if (err) {
      setError('Hubo un error al enviar la solicitud. Por favor intente nuevamente.')
      setLoading(false)
      return
    }

    setBookingId(data.id)
    setStep('success')
    setLoading(false)
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
            <CheckCircle className="w-16 h-16 text-emerald-400 relative z-10" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Solicitud Recibida</h1>
          <p className="text-gray-400 leading-relaxed mb-3">
            Tu requerimiento ha sido registrado correctamente. El equipo de NEXXUV revisará tu solicitud
            y confirmará la sesión en menos de 24 horas hábiles.
          </p>
          <p className="text-gray-600 text-xs mb-8 font-mono">
            ID de Solicitud: <span className="text-gray-400">{bookingId.slice(0, 8).toUpperCase()}</span>
          </p>

          <div className="space-y-3 mb-10">
            {[
              { step: '01', label: 'Recepción de Requerimiento', active: true },
              { step: '02', label: 'Análisis de Viabilidad Técnica', active: false },
              { step: '03', label: 'Reunión Agendada', active: false },
            ].map((s) => (
              <div
                key={s.step}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left ${
                  s.active
                    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400'
                    : 'border-gray-800/60 text-gray-600'
                }`}
              >
                <span className="text-xs font-mono font-bold">{s.step}</span>
                <span className="text-sm">{s.label}</span>
                {s.active && <span className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 text-sm font-medium rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] px-6 py-24">
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={() => step === 'details' ? setStep('select') : onNavigate('home')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 'details' ? 'Cambiar servicio' : 'Volver al inicio'}
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">
              Portal de Agendamiento B2B/G2B
            </p>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            {step === 'select' ? 'Selecciona una sesión' : 'Datos de Contacto'}
          </h1>
          <p className="text-gray-500 mt-2">
            {step === 'select'
              ? 'Elige el tipo de reunión que mejor se adapta a tu necesidad institucional.'
              : 'Completa tu información para que el equipo de NEXXUV prepare la sesión.'}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-10">
          {['Seleccionar Servicio', 'Datos de Contacto'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                (step === 'select' && i === 0) || (step === 'details' && i === 1)
                  ? 'bg-cyan-400 border-cyan-400 text-gray-900'
                  : i < (step === 'details' ? 1 : 0)
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-transparent border-gray-700 text-gray-600'
              }`}>
                {i < (step === 'details' ? 1 : 0) ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium tracking-wide hidden sm:block ${
                (step === 'select' && i === 0) || (step === 'details' && i === 1)
                  ? 'text-white'
                  : 'text-gray-600'
              }`}>{label}</span>
              {i < 1 && <div className={`flex-1 h-px w-8 mx-1 ${step === 'details' ? 'bg-emerald-500/50' : 'bg-gray-800'}`} />}
            </div>
          ))}
        </div>

        {step === 'select' && (
          <div className="space-y-4">
            {services.map((service) => (
              <GlowCard
                key={service.id}
                selected={selectedService?.id === service.id}
                onClick={() => setSelectedService(service)}
                className="p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase border ${CATEGORY_COLORS[service.category]}`}>
                    {CATEGORY_LABELS[service.category]}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mt-3 leading-tight">{service.title}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{service.description}</p>
                {selectedService?.id === service.id && (
                  <div className="mt-4 flex items-center gap-2 text-cyan-400 text-xs font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Servicio seleccionado
                  </div>
                )}
              </GlowCard>
            ))}

            <button
              disabled={!selectedService}
              onClick={() => setStep('details')}
              className={`w-full py-4 font-bold text-sm tracking-wider uppercase rounded transition-all duration-200 mt-6 ${
                selectedService
                  ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.4)]'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              Continuar con {selectedService ? `"${selectedService.title.split(':')[0]}"` : 'servicio seleccionado'}
            </button>
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedService && (
              <GlowCard className="p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase border ${CATEGORY_COLORS[selectedService.category]}`}>
                    {CATEGORY_LABELS[selectedService.category]}
                  </div>
                  <span className="text-white text-sm font-medium">{selectedService.title}</span>
                </div>
              </GlowCard>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="Organización / Institución"
                name="organization_name"
                value={form.organization_name}
                onChange={handleChange}
                placeholder="Ej: Municipalidad de Temuco"
                required
              />
              <InputField
                label="Cargo / Rol"
                name="contact_role"
                value={form.contact_role}
                onChange={handleChange}
                placeholder="Ej: Director de Modernización"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="Nombre Completo"
                name="contact_name"
                value={form.contact_name}
                onChange={handleChange}
                placeholder="Nombre y apellido"
                required
              />
              <InputField
                label="Correo Electrónico"
                name="contact_email"
                type="email"
                value={form.contact_email}
                onChange={handleChange}
                placeholder="correo@organizacion.cl"
                required
              />
            </div>

            <InputField
              label="Teléfono de Contacto"
              name="contact_phone"
              type="tel"
              value={form.contact_phone}
              onChange={handleChange}
              placeholder="+56 9 XXXX XXXX"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-400 text-xs font-medium tracking-widest uppercase mb-2">
                  Fecha Preferida <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={form.preferred_date}
                  onChange={handleChange}
                  min={minDateStr}
                  required
                  className="w-full bg-gray-900/80 border border-gray-700/60 rounded-lg px-4 py-3 text-white text-sm
                    focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                    hover:border-gray-600/80 transition-all duration-200"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium tracking-widest uppercase mb-2">
                  Horario Preferido
                </label>
                <select
                  name="preferred_time"
                  value={form.preferred_time}
                  onChange={handleChange}
                  className="w-full bg-gray-900/80 border border-gray-700/60 rounded-lg px-4 py-3 text-white text-sm
                    focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                    hover:border-gray-600/80 transition-all duration-200"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="">Seleccionar horario</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t} hrs</option>
                  ))}
                </select>
              </div>
            </div>

            <InputField
              label="Contexto del Requerimiento"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe brevemente el problema o proceso que deseas digitalizar. ¿Cuántos usuarios involucra? ¿Qué sistemas actuales existen?"
              textarea
            />

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !form.organization_name || !form.contact_name || !form.contact_email || !form.preferred_date}
              className={`w-full py-4 font-bold text-sm tracking-wider uppercase rounded transition-all duration-200 ${
                !loading && form.organization_name && form.contact_name && form.contact_email && form.preferred_date
                  ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.4)]'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-gray-600 border-t-gray-900 rounded-full animate-spin" />
                  Enviando solicitud...
                </span>
              ) : (
                'Enviar Solicitud de Reunión'
              )}
            </button>

            <p className="text-center text-gray-700 text-xs">
              Al enviar confirmas que representas a la organización indicada. NEXXUV responde en menos de 24 horas hábiles.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
