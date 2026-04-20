import { motion } from 'framer-motion'
import { Building2, CheckCircle2, FileText, Loader2, Sparkles } from 'lucide-react'

import { WORKFLOW } from '../hooks/useTenderEngine.js'
import { PrimaryButton } from '../components/ui/PrimaryButton.jsx'

function analyzeButtonLabel(workflowState) {
  switch (workflowState) {
    case WORKFLOW.UPLOADING:
      return 'Uploading…'
    case WORKFLOW.VECTORIZING:
      return 'Preparing index…'
    case WORKFLOW.AGENT_LOOP:
      return 'Generating…'
    default:
      return 'Generate technical proposal'
  }
}

export function UploadSection({
  workflowState,
  tenderFile,
  profileFile,
  disabled,
  onTenderFileChange,
  onProfileFileChange,
  onAnalyze,
}) {
  const idle = workflowState === WORKFLOW.IDLE
  const processing =
    workflowState === WORKFLOW.UPLOADING ||
    workflowState === WORKFLOW.VECTORIZING ||
    workflowState === WORKFLOW.AGENT_LOOP

  const hasBoth = Boolean(tenderFile && profileFile)
  const canClickAnalyze = hasBoth && idle && !disabled
  const analyzeDisabled = disabled || !idle || !hasBoth

  return (
    <section className="mx-auto w-full max-w-4xl">
      <motion.div
        layout
        className="relative overflow-hidden rounded-3xl border border-tf-border/90 bg-gradient-to-b from-white via-white to-tf-elevated/80 p-[1px] shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]"
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-white px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-tf-border bg-tf-elevated/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-tf-muted"
            >
              <Sparkles className="size-3.5 text-tf-navy-700" aria-hidden />
              Proposal intelligence
            </motion.div>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold tracking-tight text-tf-text sm:text-4xl">
              Win public-sector bids with structured rigor
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-tf-text-secondary sm:text-lg">
              Pair the solicitation with your corporate profile. TenderForge aligns requirements to
              evidence, screens authenticity, and delivers an executive-ready Word proposal — all
              through your own backend.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
            <DropZone
              processing={processing}
              disabled={disabled}
              icon={FileText}
              title="Government tender"
              subtitle="Official RFP / tender notice (PDF)"
              file={tenderFile}
              onPick={onTenderFileChange}
            />
            <DropZone
              processing={processing}
              disabled={disabled}
              icon={Building2}
              title="Company profile"
              subtitle="Credentials, PEC, track record (PDF)"
              file={profileFile}
              onPick={onProfileFileChange}
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <PrimaryButton
              type="button"
              disabled={analyzeDisabled}
              className="min-h-14 w-full max-w-md rounded-xl px-8 py-4 text-base font-semibold shadow-[0_12px_28px_-8px_rgba(12,30,60,0.45)] sm:min-h-[3.25rem] sm:text-lg"
              onClick={() => {
                if (canClickAnalyze) onAnalyze?.()
              }}
            >
              {processing ? (
                <>
                  <Loader2 className="size-5 shrink-0 animate-spin" aria-hidden />
                  {analyzeButtonLabel(workflowState)}
                </>
              ) : (
                analyzeButtonLabel(workflowState)
              )}
            </PrimaryButton>
            {!hasBoth && idle ? (
              <p className="text-center text-sm text-tf-muted">Select both PDFs to continue.</p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function DropZone({ processing, disabled, icon: Icon, title, subtitle, file, onPick }) {
  return (
    <label
      className={`group relative flex min-h-[220px] cursor-pointer flex-col justify-between rounded-2xl border-2 border-dashed border-tf-border-strong bg-tf-elevated/50 p-6 transition-all duration-200 hover:border-tf-navy-700/60 hover:bg-white hover:shadow-tf-md ${
        processing ? 'pointer-events-none opacity-60' : ''
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        if (processing) return
        const f = e.dataTransfer.files?.[0]
        if (f?.type === 'application/pdf') onPick?.(f)
      }}
    >
      <input
        type="file"
        accept="application/pdf"
        className="sr-only"
        disabled={processing || disabled}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onPick?.(f)
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-tf-md ring-1 ring-tf-border transition-transform duration-200 group-hover:scale-[1.03]">
          <Icon className="size-6 text-tf-navy-900" aria-hidden />
        </span>
        {file ? (
          <CheckCircle2 className="size-6 shrink-0 text-emerald-600" aria-hidden />
        ) : null}
      </div>
      <div>
        <p className="font-display text-base font-semibold text-tf-text">{title}</p>
        <p className="mt-1 text-sm text-tf-muted">{subtitle}</p>
        {file ? (
          <p className="mt-4 truncate rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-tf-navy-900 ring-1 ring-tf-border">
            {file.name}
          </p>
        ) : (
          <p className="mt-4 text-xs font-medium text-tf-navy-700/80">Drop file or browse</p>
        )}
      </div>
    </label>
  )
}
