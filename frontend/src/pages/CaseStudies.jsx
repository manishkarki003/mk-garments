import { useCallback, useState } from 'react'
import CaseStudyCard from '../components/CaseStudyCard'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getCaseStudies } from '../services/content'
import { PHASE9_COPY } from '../data/pagesContent'

function CaseStudies() {
  usePageMeta({ title: 'Garment Manufacturing Projects | MK Garments', description: 'Examples of garment manufacturing projects, from product development and sampling to production and delivery.' })
  const [retry, setRetry] = useState(0)
  const fetcher = useCallback(() => getCaseStudies(), [])
  const { data, loading, error } = useFetch(fetcher, [fetcher, retry])
  const projects = Array.isArray(data) ? data : []
  return <>
    <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} eyebrow="Projects" title="Manufacturing case studies" description={PHASE9_COPY.projectsDescription} />
    <main aria-label="Manufacturing projects"><Container className="py-20 lg:py-28">
      {loading && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[4/3] animate-pulse bg-surface" />)}</div>}
      {error && <div className="border border-border p-8 text-center"><p className="text-muted">We could not load the projects.</p><Button variant="outline" className="mt-5" onClick={() => setRetry((value) => value + 1)}>Try again</Button></div>}
      {!loading && !error && projects.length > 0 && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <CaseStudyCard key={project.id || project.slug} project={project} />)}</div>}
      {!loading && !error && projects.length === 0 && <div className="border border-border p-8 text-center"><p className="text-muted">{PHASE9_COPY.projectsEmpty}</p><Button to="/quote" variant="accent" className="mt-5">Request a Quote</Button></div>}
    </Container></main>
    <CTASection title="Have a similar project in mind?" description="Share your garment requirements and our team will review how we can support your project." />
  </>
}
export default CaseStudies
