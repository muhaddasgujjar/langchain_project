import { motion } from 'framer-motion'
import { Hexagon } from 'lucide-react'

export function AppHeader({ onMobileNavOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-tf-border/90 bg-tf-navy-950/98 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          {typeof onMobileNavOpen === 'function' ? (
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-tf-sm transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              onClick={onMobileNavOpen}
            >
              <span className="sr-only">Menu</span>
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          ) : null}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 text-white shadow-lg ring-1 ring-white/20">
            <Hexagon className="size-6" strokeWidth={1.6} aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="font-display truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
              TenderForge PK
            </h1>
            <p className="truncate text-xs text-slate-400 sm:text-sm">
              Enterprise tender desk · Private deployment
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2">
          <span className="relative flex size-2.5 sm:size-3">
            <motion.span
              className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75"
              animate={{ scale: [1, 1.35, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 sm:size-3" />
          </span>
          <span className="hidden text-xs font-medium text-slate-200 sm:inline sm:text-sm">
            Engine ready
          </span>
          <span className="text-xs font-medium text-slate-200 sm:hidden">Ready</span>
        </div>
      </div>
    </header>
  )
}
