import { motion } from 'framer-motion'
import { AlertTriangle, Download, FileDown } from 'lucide-react'

import { WORKFLOW } from '../hooks/useTenderEngine.js'
import { PrimaryButton } from '../components/ui/PrimaryButton.jsx'
import { StatusBadge } from '../components/ui/StatusBadge.jsx'

export function ResultSection({
  workflowState,
  auditStatus,
  auditFeedback,
  revisionCount,
  onDownload,
  downloading,
}) {
  const visible = workflowState === WORKFLOW.SUCCESS_REVIEW
  if (!visible) return null

  const pass = auditStatus === 'PASS'
  const warnManual = !pass && revisionCount >= 3

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-4xl"
    >
      <div className="text-center">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-tf-muted">
          Deliverable
        </p>
        <h2 className="font-display mt-3 text-balance text-2xl font-semibold tracking-tight text-tf-text sm:text-3xl">
          Your technical proposal is ready
        </h2>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-tf-border/90 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)]">
        <div className="border-b border-tf-border bg-gradient-to-r from-tf-elevated to-white px-6 py-8 sm:px-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-tf-navy-950 text-white shadow-tf-lg ring-1 ring-black/10">
                <FileDown className="size-8" aria-hidden />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-tf-text">Final_Proposal.docx</p>
                <p className="mt-1 text-sm text-tf-muted">
                  Structured export · Ready for partner review and redlines
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <StatusBadge
                    variant={pass ? 'success' : 'danger'}
                    label={pass ? 'Quality gate: cleared' : 'Quality gate: attention'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10">
          <p className="text-center text-base leading-relaxed text-tf-text-secondary sm:text-left">
            {pass
              ? 'Automated checks indicate core checklist items are addressed. Apply final legal and commercial review before lodgement.'
              : auditFeedback ||
                'The review surfaced gaps versus extracted requirements. Adjust source material or revise before relying on this draft.'}
          </p>

          {warnManual ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 flex gap-4 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 to-white p-5 text-amber-950 shadow-tf-sm"
            >
              <AlertTriangle className="size-6 shrink-0 text-amber-600" aria-hidden />
              <div>
                <p className="font-display font-semibold">Escalate to bid leadership</p>
                <p className="mt-2 text-sm leading-relaxed text-amber-950/85">
                  Revision cycles are exhausted and the gate still reports issues. Treat this as a
                  draft only until a senior reviewer signs off.
                </p>
              </div>
            </motion.div>
          ) : null}

          <div className="mt-10">
            <PrimaryButton
              type="button"
              disabled={downloading}
              className="min-h-14 w-full rounded-xl px-8 py-4 text-base font-semibold shadow-tf-lg sm:max-w-md"
              onClick={() => onDownload?.()}
            >
              <Download className="size-5" aria-hidden />
              Download proposal
            </PrimaryButton>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
