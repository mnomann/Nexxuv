export default function Footer() {
  return (
    <footer className="border-t border-gray-800/60 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold tracking-widest text-sm">
            NEX<span className="text-cyan-400">XUV</span>
          </span>
          <span className="text-gray-700 text-xs">·</span>
          <span className="text-gray-600 text-xs">Millahual Servicios Integrales SpA</span>
        </div>
        <p className="text-gray-700 text-xs tracking-wide">
          © {new Date().getFullYear()} NEXXUV · Ingeniería de Automatización · Chile
        </p>
      </div>
    </footer>
  )
}
