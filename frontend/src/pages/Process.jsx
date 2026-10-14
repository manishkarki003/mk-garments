import { useCallback } from 'react'
import { Check } from 'lucide-react'
import CTASection from '../components/CTASection'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getProcess } from '../services/manufacturing'
import { DEFAULT_PROCESS } from '../data/homeContent'
import { PROCESS_INTRO, PROCESS_NOTES } from '../data/pagesContent'

function Process() {
  usePageMeta({ title: 'Garment Manufacturing Process | MK Garments', description: 'From inquiry and tech pack review to sampling, production, quality control and delivery, see each step of working with MK Garments.' })
  const fetcher = useCallback(() => getProcess(), [])
  const { data } = useFetch(fetcher)
  const steps = (Array.isArray(data) && data.length ? data : DEFAULT_PROCESS).slice().sort((a, b) => (a.step_number ?? 999) - (b.step_number ?? 999))

  return (
    <>
      <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Process' }]} eyebrow="Our Process" title="From inquiry to delivery" description={PROCESS_INTRO} />
      <main aria-label="Manufacturing process">
        <Container className="py-20 lg:py-28">
          <ol className="border-l border-border">
            {steps.map((step, index) => <Reveal key={step.id || step.step_number || index}><li className="grid gap-5 border-b border-border py-8 pl-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pl-10"><div><p className="font-serif text-4xl text-accent">{String(step.step_number || index + 1).padStart(2, '0')}</p><h2 className="mt-3 font-serif text-2xl lg:text-3xl">{step.title || step.name}</h2></div><p className="leading-7 text-muted lg:pt-3">{step.description}</p></li></Reveal>)}
          </ol>
          <div className="mt-12 border border-border p-6 lg:p-8">
            <h2 className="font-serif text-2xl">A few things to know</h2>
            <ul className="mt-4 space-y-3 text-muted">{PROCESS_NOTES.map((note) => <li key={note} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />{note}</li>)}</ul>
          </div>
        </Container>
      </main>
      <CTASection title="Ready to start with an inquiry?" description="Share your garment requirements and our team will help you understand the next steps." />
    </>
  )
}

export default Process
