import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../hooks/usePageMeta'
import { QUALITY_DETAILS, QUALITY_INTRO } from '../data/pagesContent'

function Quality() {
  usePageMeta({ title: 'Quality Control in Garment Manufacturing | MK Garments', description: 'Inspection at every stage of garment production, from raw materials and fabric to cutting, stitching, finishing and packaging.' })

  return (
    <>
      <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Quality Control' }]} eyebrow="Quality Control" title="Inspection at every stage" description={QUALITY_INTRO} />
      <main aria-label="Quality control information">
        <Container className="py-20 lg:py-28">
          <ol className="grid border-l border-t border-border md:grid-cols-2">
            {QUALITY_DETAILS.map((detail, index) => <li key={detail.title} className="border-b border-r border-border p-6 lg:p-8"><p className="font-serif text-3xl text-accent">{String(index + 1).padStart(2, '0')}</p><h2 className="mt-6 font-serif text-2xl">{detail.title}</h2><p className="mt-3 leading-7 text-muted">{detail.description}</p></li>)}
          </ol>
          <section className="mt-12 border border-border p-6 lg:p-8" aria-label="Certifications">
            <h2 className="font-serif text-2xl">Certifications</h2>
            <p className="mt-3 text-muted">Certification details are listed on our certifications page.</p>
            <Button to="/certifications" variant="outline" className="mt-6">View certifications</Button>
          </section>
        </Container>
      </main>
      <CTASection title="Have quality requirements to discuss?" description="Share your specification with our team so we can review the requirements for your garment." />
    </>
  )
}

export default Quality
