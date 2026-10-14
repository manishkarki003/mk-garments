import Container from '../components/Container'
import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import usePageMeta from '../hooks/usePageMeta'
import { SUSTAINABILITY_INTRO, SUSTAINABILITY_SECTIONS } from '../data/pagesContent'

function Sustainability() {
  usePageMeta({ title: 'Sustainability | MK Garments', description: 'How MK Garments approaches responsible production, materials, sourcing, worker-focused practices and packaging.' })

  return (
    <>
      <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Sustainability' }]} eyebrow="Sustainability" title="Responsible garment manufacturing" description={SUSTAINABILITY_INTRO} />
      <main aria-label="Sustainability practices">
        <Container className="py-20 lg:py-28">
          <div className="grid border-l border-t border-border md:grid-cols-2">
            {SUSTAINABILITY_SECTIONS.map((section) => <section key={section.title} className="border-b border-r border-border p-6 lg:p-8" aria-label={section.title}><h2 className="font-serif text-2xl">{section.title}</h2>{section.description ? <p className="mt-4 whitespace-pre-line leading-7 text-muted">{section.description}</p> : <p className="mt-4 italic text-muted">Details for this section will be provided by MK Garments.</p>}</section>)}
          </div>
        </Container>
      </main>
      <CTASection title="Want to discuss your production requirements?" description="Send us your specification and our team will review how we can support your project." />
    </>
  )
}

export default Sustainability
