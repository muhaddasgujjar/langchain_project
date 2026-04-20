import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Loader2 } from 'lucide-react'

import { WORKFLOW } from '../hooks/useTenderEngine.js'

const PHASE = {
  [WORKFLOW.UPLOADING]: { label: 'Ingesting files', detail: 'Secure handoff to your engine.' },
  [WORKFLOW.VECTORIZING]: {
    label: 'Indexing knowledge',
    detail: 'Tender and company profiles are being prepared for retrieval.',
  },
  [WORKFLOW.AGENT_LOOP]: { label: 'Synthesizing proposal', detail: null },
}

/**
 * Compact premium status — replaces the full compliance workflow theater.
 */
export function GenerationStatus({ workflowState, logs = [] }) {
  const active =
    workflowState === WORKFLOW.UPLOADING ||
    workflowState === WORKFLOW.VECTORIZING ||
    workflowState === WORKFLOW.AGENT_LOOP

  const phase = PHASE[workflowState]
  const lastLine =
    workflowState === WORKFLOW.AGENT_LOOP && logs.length > 0
      ? logs[logs.length - 1]?.text
      : null

  return (
    <AnimatePresence mode="wait">
      {active && phase ? (
        <motion.section
          key="gen-status"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-tf-navy-950 px-5 py-5 shadow-[0_24px_48px_-16px_rgba(10,22,40,0.45)] sm:px-8 sm:py-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 90% 80% at 50% -30%, white, transparent)',
              }}
            />
            <div className="relative flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                {workflowState === WORKFLOW.AGENT_LOOP ? (
                  <Activity className="size-5 animate-pulse" aria-hidden />
                ) : (
                  <Loader2 className="size-5 animate-spin" aria-hidden />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {phase.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {lastLine ??
                    phase.detail ??
                    'Working locally — your data stays on this machine.'}
                </p>
              </div>
            </div>
            <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 w-[35%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                initial={{ left: '-35%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.65, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}
