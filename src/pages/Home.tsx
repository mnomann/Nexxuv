import { useEffect, useState, useRef } from 'react'
import {
  ArrowRight, Shield, Zap, Database, GitBranch,
  Building2, Scale, FileSearch, Terminal, ChevronDown,
  CheckCircle, Globe, Clock
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Service } from '../types'

interface HomeProps {
  onNavigate: (page: 'home' | 'booking' | 'admin') => void
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  arquitectura: <Building2 className="w-6 h-6" />,
  automatizacion: <Terminal className="w-6 h-6" />,
  consultoria: <FileSearch className="w-6 h-6" />,
  general: <Zap className="w-6 h-6" />,
}

const CATEGORY_LABELS: Record<string, string> = {
  arquitectura: 'Arquitectura de Plataformas',
  automatizacion: 'Automatización de Procesos',
  consultoria: 'Consultoría Técnica',
  general: 'General',
}

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-cyan-400 tracking-tight">{value}</div>
      <div className="text-gray-500 text-sm mt-1 tracking-wide">{label}</div>
    </div>
  )
}

function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative group border border-cyan-500/20 rounded-xl bg-gray-900/50 backdrop-blur-sm
        hover:border-cyan-400/60 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function Home({ onNavigate }: HomeProps) {
  const [services, setServices] = useState<Service[]>([])
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .order('display_order')
      .then(({ data }) => {
        if (data) setServices(data)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 md:pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-500/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Ingeniería de Automatización · Chile
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white">Infraestructura Digital</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              para el Estado Moderno
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Construimos pilotos tecnológicos de alto impacto para municipios y organizaciones que necesitan
            eliminar la burocracia en papel y conectar ciudadanos con servicios públicos digitales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('booking')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-gray-900 font-bold text-sm tracking-wider uppercase rounded hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)]"
            >
              Agendar Sesión de Trabajo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-gray-300 font-medium text-sm tracking-wider uppercase rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200"
            >
              Ver Servicios
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <StatCounter value="Ley 19.418" label="Marco Legal" />
            <StatCounter value="Python / SQL" label="Stack Core" />
            <StatCounter value="48h" label="Time to Pilot" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </div>
      </section>

      <section className="border-y border-gray-800/60 bg-gray-900/30 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10">
          {[
            { icon: <Shield className="w-4 h-4" />, text: 'Cumplimiento Normativo Chileno' },
            { icon: <Database className="w-4 h-4" />, text: 'Integración con Bases de Datos Estatales' },
            { icon: <Zap className="w-4 h-4" />, text: 'Automatización de Flujos Críticos' },
            { icon: <GitBranch className="w-4 h-4" />, text: 'Desarrollo Ágil a Medida' },
            { icon: <Globe className="w-4 h-4" />, text: 'Cobertura Nacional e Internacional' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="text-cyan-500/70">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="servicios" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Portafolio Técnico
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Capacidades de Ejecución
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Cada servicio está diseñado para resolver un problema institucional concreto con tecnología lista para producción.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <GlowCard key={service.id} className="p-6 cursor-pointer">
                <div className="flex items-start justify-between mb-5">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {CATEGORY_ICONS[service.category] || CATEGORY_ICONS.general}
                  </div>
                  <span className="text-xs text-gray-600 bg-gray-800/80 border border-gray-700/50 px-2 py-1 rounded tracking-wider">
                    {service.duration_minutes} min
                  </span>
                </div>

                <p className="text-xs text-emerald-400/80 font-medium tracking-widest uppercase mb-2">
                  {CATEGORY_LABELS[service.category]}
                </p>
                <h3 className="text-white font-bold text-lg leading-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full py-2.5 text-sm font-semibold tracking-wider uppercase text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Agendar esta sesión
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-24 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
                Por qué NEXXUV
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                El socio técnico que el sector público{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  necesita hoy
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                No somos un proveedor de software empaquetado. Somos ingenieros que entienden el marco
                legal administrativo chileno y construimos soluciones a medida que se integran con los
                sistemas existentes del Estado.
              </p>
              <div className="space-y-4">
                {[
                  'Conocimiento del marco normativo (Ley 19.418, ChileAtiende, PMG-SSI)',
                  'Stack Python + PostgreSQL + APIs REST para integración institucional',
                  'Pilotos funcionales entregables en 4-6 semanas',
                  'Documentación técnica y capacitación de equipos internos',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <Scale className="w-5 h-5" />,
                  title: 'Marco Legal Chileno',
                  desc: 'Diseñamos con pleno conocimiento de la normativa municipal, DIDECO y organismos públicos. Nuestras soluciones son auditables y replicables.',
                },
                {
                  icon: <Terminal className="w-5 h-5" />,
                  title: 'Automatización Real',
                  desc: 'Bots de extracción, pipelines de datos, integraciones con sistemas legados. Casos de uso probados en producción, no prototipos.',
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: 'Agilidad de Ejecución',
                  desc: 'De la sesión de diagnóstico a un piloto funcional en semanas, no en meses. Ciclos cortos con entregables concretos.',
                },
              ].map((item) => (
                <GlowCard key={item.title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Primer Paso
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Iniciemos la conversación técnica
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Agenda una sesión de trabajo de 60 minutos. Sin compromiso. Sin presentaciones genéricas.
            Llegamos con una propuesta técnica adaptada a tu organización.
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-cyan-400 text-gray-900 font-black text-sm tracking-wider uppercase rounded hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]"
          >
            Agendar Reunión Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-600 text-xs mt-4 tracking-wider">
            Respuesta en menos de 24 horas hábiles · Disponibilidad Nacional e Internacional
          </p>
        </div>
      </section>
    </div>
  )
}
