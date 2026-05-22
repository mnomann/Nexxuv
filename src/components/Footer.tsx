export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-white/5 text-center bg-black/20">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 mb-4">
        NEXXUV DIGITAL INFRASTRUCTURE
      </p>
      <p className="text-gray-500 text-xs max-w-2xl mx-auto px-6 font-light leading-relaxed">
        Nexxuv es una marca comercial operada por Millahual Servicios Integrales SpA. Temuco, Región de la Araucanía, Chile.
      </p>
      <p className="text-gray-600 text-[10px] mt-4">
        &copy; {currentYear} Millahual Servicios Integrales SpA. Todos los derechos reservados.
      </p>
    </footer>
  )
}
