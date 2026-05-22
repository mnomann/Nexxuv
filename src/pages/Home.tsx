import { motion } from 'framer-motion'
import {
  ArrowRight, Building2, Users, Smartphone,
  Bot, Monitor, Radio,
  Code, Workflow, ClipboardCheck,
} from 'lucide-react'
import type { GovTechModule, SuccessCase, Capability } from '../types'

const govTechModules: GovTechModule[] = [
  {
    id: 'municipio',
    title: 'Módulo Municipio / DIDECO',
    description: '',
    icon: 'Building2',
    features: [
      'Tableros analíticos en tiempo real para la toma de decisiones',
      'Control de vigencias y centralización de datos locales',
      'Aceleración de procesos administrativos municipales',
    ],
  },
  {
    id: 'juntas',
    title: 'Módulo Juntas de Vecinos',
    description: '',
    icon: 'Users',
    features: [
      'Automatización de actas bajo la Ley N° 19.418',
      'Eliminación de la burocracia del papel',
      'Aceleración de solicitudes vecinales',
    ],
  },
  {
    id: 'vecinal',
    title: 'Módulo Vecinal',
    description: '',
    icon: 'Smartphone',
    features: [
      'Canal digital móvil directo de información',
      'Transparencia para cada sector',
      'Comunicación inmediata con delegados municipales',
    ],
  },
]

const successCases: SuccessCase[] = [
  {
    id: 'pjud',
    title: 'Automatización de Procesos Legales',
    subtitle: '(Extracción PJUD)',
    client: '',
    description:
      'Desarrollo de un bot inteligente basado en Python para el monitoreo, lectura automatizada y alertas de causas en el Poder Judicial de Chile, optimizando radicalmente los tiempos de respuesta de firmas legales.',
    icon: 'Bot',
    technologies: ['Python', 'Web Scraping', 'Automatización', 'Alertas'],
  },
  {
    id: 'iworld',
    title: 'Infraestructura Digital y Consultoría',
    subtitle: '(iWorld)',
    client: '',
    description:
      'Implementación de arquitectura tecnológica integral y flujos de marketing digital avanzado para iWorld, servicio técnico especializado Apple y venta de accesorios líder en la zona.',
    icon: 'Monitor',
    technologies: ['Arquitectura TI', 'Marketing Digital', 'E-commerce'],
  },
  {
    id: 'gps',
    title: 'Plataformas Corporativas de Telemetría',
    subtitle: '(Seguimiento GPS)',
    client: '',
    description:
      'Estructuración y desarrollo de plataformas web empresariales para el control y gestión de datos logísticos basados en hardware GPS.',
    icon: 'Radio',
    technologies: ['Desarrollo Web', 'GPS Tracking', 'Data Analytics', 'API REST'],
  },
]

const capabilities: Capability[] = [
  {
    id: 'software',
    title: 'Desarrollo de Software',
    description:
      'Python, integraciones avanzadas de bases de datos.',
    icon: 'Code',
    technologies: ['Python', 'SQL/NoSQL', 'APIs'],
  },
  {
    id: 'automatizacion',
    title: 'Automatización de Flujos',
    description:
      'Salesforce, Make, Zapier.',
    icon: 'Workflow',
    technologies: ['Salesforce', 'Make', 'Zapier'],
  },
  {
    id: 'consultoria',
    title: 'Consultoría de Procesos',
    description:
      'Análisis y optimización de flujos operativos críticos.',
    icon: 'ClipboardCheck',
    technologies: ['Auditoría TI', 'Optimización', 'Metodologías'],
  },
]

const iconMap: Record<string, typeof Building2> = {
  Building2, Users, Smartphone, Bot, Monitor, Radio, Code, Workflow, ClipboardCheck,
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <>
      <section className="relative pt-52 pb-24 px-6 text-center mesh-gradient">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-[#00e5ff]/30 px-4 py-2 rounded-full mb-10"
          >
            <span className="text-[#00e5ff] text-[10px] font-black uppercase tracking-[0.3em]">
              Enterprise SaaS & GovTech Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none max-w-4xl mx-auto"
          >
            Transformación Digital y Soluciones Inteligentes para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-emerald-400 font-black">
              Empresas y Gobiernos Locales.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Optimizamos procesos complejos, automatizamos flujos de datos y construimos software a la medida para conectar organizaciones de manera eficiente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#contacto"
              className="inline-block bg-[#00e5ff] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' }}
            >
              Contacto Institucional
            </a>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="govtech"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-[#00e5ff] uppercase tracking-[0.4em] mb-4">
            Sector Público
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
            Modernización de la Gestión Comunitaria
          </h3>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {govTechModules.map((module, idx) => {
            return (
              <motion.div
                key={module.id}
                variants={fadeInUp}
                className="p-8 bg-gray-950/40 rounded-[2rem] border border-[#00e5ff]/30 hover:border-[#00e5ff] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center mb-6 text-[#00e5ff] font-bold text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-white group-hover:text-[#00e5ff] transition-colors">
                    {module.title}
                  </h4>
                  <ul className="space-y-3">
                    {module.features.map((feature, i) => (
                      <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 shrink-0 text-[#00e5ff]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-black tracking-widest uppercase text-gray-500">
                  {idx === 0 ? 'Gestión Gubernamental' : idx === 1 ? 'Cumplimiento Normativo' : 'Vinculación Ciudadana'}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      <motion.section
        id="casos"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="mb-16">
          <h2 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] mb-4">
            Ingeniería Desplegada
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
            Casos de Éxito
          </h3>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {successCases.map((caseItem, idx) => (
            <motion.div
              key={caseItem.id}
              variants={fadeInUp}
              className={idx === 0 ? 'md:col-span-12 rounded-[3rem] p-8 md:p-12 border border-[#00e5ff] flex flex-col justify-between min-h-[380px]' : 'md:col-span-6 bg-gray-950/40 rounded-[3rem] p-8 md:p-10 border border-[#00e5ff]/30 hover:border-[#00e5ff] transition-all duration-300 flex flex-col justify-between min-h-[300px]'}
              style={idx === 0 ? {
                background: 'linear-gradient(-45deg, #0b0f1a, #0f172a, #042f2e, #0c1e2e)',
                backgroundSize: '400% 400%',
                animation: 'gradient-flow 12s ease infinite',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.15)',
              } : undefined}
            >
              <div>
                {idx === 0 && (
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      Infraestructura Crítica
                    </span>
                  </div>
                )}
                <h4 className={idx === 0 ? 'text-3xl md:text-5xl font-extrabold mb-6 tracking-tighter text-white' : 'text-2xl font-bold mb-4 text-white'}>
                  {caseItem.title}{idx < 2 ? ` ${caseItem.subtitle}` : ''}
                </h4>
                <p className={idx === 0 ? 'text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed font-light' : 'text-gray-400 text-sm leading-relaxed'}>
                  {caseItem.description}
                </p>
              </div>
              <div className={`mt-8 border-t border-white/5 text-[10px] font-black tracking-widest uppercase ${idx === 0 ? 'pt-6 text-gray-400' : 'pt-4'} ${idx === 1 ? 'text-emerald-400' : idx === 2 ? 'text-blue-400' : ''}`}>
                {idx === 0 ? 'Core Automation Engine' : idx === 1 ? 'Arquitectura Comercial' : 'Hardware & Data Logistics'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="capacidades"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="p-8 md:p-12 bg-gray-950/30 rounded-[3rem] border border-[#00e5ff]/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <h2 className="text-xs font-black text-[#00e5ff] uppercase tracking-[0.4em] mb-4">
                Core Business
              </h2>
              <h3 className="text-3xl font-extrabold tracking-tighter text-white">
                Capacidades Técnicas
              </h3>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {capabilities.map((cap) => {
                const Icon = iconMap[cap.icon] ?? Code
                return (
                  <motion.div
                    key={cap.id}
                    variants={fadeInUp}
                    className="p-6 bg-white/5 rounded-2xl border border-white/5"
                  >
                    <Icon size={20} className="text-[#00e5ff] mb-3" />
                    <h4 className="text-white font-bold text-sm mb-2">{cap.title}</h4>
                    <p className="text-gray-400 text-xs font-light">{cap.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contacto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="py-20 px-6 max-w-3xl mx-auto border-t border-white/5 scroll-mt-24"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-extrabold tracking-tighter mb-4 text-white">
            Contacto Institucional
          </h3>
          <p className="text-gray-400 text-sm font-light">
            Inicie un canal formal de comunicación para evaluaciones técnicas o de interoperabilidad.
          </p>
        </div>

        <form
          className="space-y-6 bg-gray-950/50 p-8 md:p-10 rounded-[2.5rem] border border-[#00e5ff]/30"
          style={{ boxShadow: '0 0 25px rgba(0, 229, 255, 0.05)' }}
        >
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Nombre
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Correo Institucional
            </label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Entidad / Municipio
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Mensaje
            </label>
            <textarea
              rows={4}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e5ff] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00e5ff] text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-cyan-400 transition-colors"
            style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' }}
          >
            Enviar Requerimiento
          </button>
        </form>
      </motion.section>
    </>
  )
}
