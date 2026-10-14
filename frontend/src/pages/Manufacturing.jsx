import { Check, Factory, Layers, Package, Ruler, Scissors, Search, Shirt } from 'lucide-react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Container from '../components/Container'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getCapabilities } from '../services/manufacturing'
import { DEFAULT_CAPABILITIES } from '../data/homeContent'
import { MANUFACTURING_INTRO, WORKING_PRINCIPLES } from '../data/pagesContent'
import { mediaUrl } from '../utils/media'

const iconMap = { scissors: Scissors, shirt: Shirt, ruler: Ruler, package: Package, search: Search, check: Check, layers: Layers }

function Manufacturing() {
  usePageMeta({
    title: 'Garment Manufacturing Capabilities in Nepal | MK Garments',
    description: 'From product development and sampling to cutting, sewing, finishing and packaging, see how MK Garments manufactures apparel for brands and businesses.',
  })
  const fetcher = useCallback(() => getCapabilities(), [])
  const { data, loading } = useFetch(fetcher)
  const apiCapabilities = Array.isArray(data) ? data : []
  const capabilities = (apiCapabilities.length ? apiCapabilities : DEFAULT_CAPABILITIES)
    .map((item) => ({ ...item, title: item.title || item.name }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  const hasImages = capabilities.some((item) => item.image)

  return (
    <>
      <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Manufacturing' }]} eyebrow="Manufacturing" title="Our manufacturing capabilities" description={MANUFACTURING_INTRO} />
      <main aria-label="Manufacturing capabilities">
        <Container className="py-20 lg:py-28">
          {loading ? (
            <div className="space-y-6">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-56 animate-pulse bg-surface" />)}</div>
          ) : (
            <div className="space-y-16 lg:space-y-24">
              {capabilities.map((capability, index) => {
                const Icon = iconMap[capability.icon_name?.toLowerCase()] || Factory
                return (
                  <Reveal key={capability.id || capability.slug || capability.title}>
                    <article className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${hasImages && index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                      {hasImages && (
                        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface">
                          {capability.image ? <img src={mediaUrl(capability.image)} alt={capability.title} loading="lazy" className="h-full w-full object-cover" /> : <Icon size={52} className="text-muted" strokeWidth={1} aria-hidden="true" />}
                        </div>
                      )}
                      <div className={hasImages ? '' : 'max-w-3xl'}>
                        <p className="font-serif text-5xl text-muted/50">{String(index + 1).padStart(2, '0')}</p>
                        <h2 className="mt-5 font-serif text-3xl lg:text-4xl">{capability.title}</h2>
                        {capability.description && <p className="mt-4 max-w-xl leading-7 text-muted">{capability.description}</p>}
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}
        </Container>
        <section className="bg-surface py-20 lg:py-28" aria-label="Working principles">
          <Container>
            <h2 className="font-serif text-3xl lg:text-4xl">How we work</h2>
            <ul className="mt-10 grid border-l border-t border-border md:grid-cols-3">
              {WORKING_PRINCIPLES.map((principle) => <li key={principle.title} className="border-b border-r border-border p-6 lg:p-8"><h3 className="font-serif text-2xl">{principle.title}</h3><p className="mt-3 leading-7 text-muted">{principle.description}</p></li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
              <Link to="/process" className="text-accent hover:text-accent-dark">See our process →</Link>
              <Link to="/quality" className="text-accent hover:text-accent-dark">How we control quality →</Link>
            </div>
          </Container>
        </section>
      </main>
      <CTASection title="Ready to discuss your manufacturing requirements?" description="Send us your product specification or reference and our team will review it." />
    </>
  )
}

export default Manufacturing
