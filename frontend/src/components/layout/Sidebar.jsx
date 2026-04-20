import { Cpu, Lock, Sparkles, Target } from 'lucide-react'

const pillars = [
  {
    icon: Target,
    title: 'Dual-source intelligence',
    body: 'Tender rules and your company vault inform every paragraph — no generic placeholders.',
  },
  {
    icon: Sparkles,
    title: 'Submission-grade output',
    body: 'Structured Word proposals aligned with how public-sector evaluators read bids.',
  },
  {
    icon: Lock,
    title: 'Your infrastructure',
    body: 'Runs beside your backend; sensitive PDFs never leave your controlled environment.',
  },
  {
    icon: Cpu,
    title: 'Serious retrieval stack',
    body: 'Purpose-built RAG pipeline so evidence maps to requirements, not buzzwords.',
  },
]

/**
 * Desktop value panel — concise, executive messaging (no placeholder nav).
 */
export function Sidebar({ className = '' }) {
  return (
    <aside
      aria-label="Product highlights"
      className={`flex w-[17.5rem] max-w-full shrink-0 flex-col border-r border-tf-border bg-tf-surface/90 backdrop-blur-sm ${className}`}
    >
      <div className="border-b border-tf-border px-5 py-6">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-tf-muted">
          Why TenderForge
        </p>
        <p className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-tf-text">
          Built for teams who cannot afford careless bids.
        </p>
      </div>
      <div className="flex flex-col gap-0 px-3 py-4">
        {pillars.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="group rounded-xl px-3 py-3.5 transition-colors hover:bg-tf-elevated"
            >
              <div className="flex gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-tf-navy-950 text-white shadow-tf-sm ring-1 ring-black/5 transition-transform group-hover:scale-[1.03]">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight text-tf-text">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-tf-muted">{item.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
