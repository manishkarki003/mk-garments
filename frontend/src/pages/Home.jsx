import { Check } from 'lucide-react'
import { useCallback, useState } from 'react'
import { getCapabilities, getProcess } from '../services/manufacturing'
import { getProducts } from '../services/products'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import useFetch from '../hooks/useFetch'
import {
  ABOUT_COPY,
  CTA_COPY,
  DEFAULT_CAPABILITIES,
  DEFAULT_PROCESS,
  QUALITY_STAGES,
  TRUST_ITEMS,
  WHO_WE_SERVE,
} from '../data/homeContent'

function itemsFrom(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  return []
}

function Home() {
  const capabilitiesFetcher = useCallback(() => getCapabilities(), [])
  const processFetcher = useCallback(() => getProcess(), [])
  const productsFetcher = useCallback(() => getProducts(), [])
  const capabilitiesState = useFetch(capabilitiesFetcher)
  const processState = useFetch(processFetcher)
  const productsState = useFetch(productsFetcher)
  const [heroImageVisible, setHeroImageVisible] = useState(true)

  const capabilities = itemsFrom(capabilitiesState.data)
  const process = itemsFrom(processState.data)
  const products = itemsFrom(productsState.data).slice(0, 6)
  const displayedCapabilities = capabilities.length ? capabilities : DEFAULT_CAPABILITIES
  const displayedProcess = process.length ? process : DEFAULT_PROCESS

  return (
    <>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal text-white lg:min-h-[85vh]" aria-label="Garment manufacturing hero">
        {/* Drop a real factory photo at frontend/public/images/hero.jpg */}
        {heroImageVisible && (
          <img
            src="/images/hero.jpg"
            alt="Garment manufacturing floor"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setHeroImageVisible(false)}
          />
        )}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <Container className="relative py-24">
          <Reveal>
            <h1 className="max-w-4xl text-5xl leading-tight lg:text-7xl">
              Garments Made in Nepal.<br />
              Built for Your Brand.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/80">
              From product development and sampling to production and quality control, we manufacture apparel for brands, retailers, institutions, and businesses.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/quote" variant="accent" className="w-full sm:w-auto">Request a Quote</Button>
              <Button to="/manufacturing" variant="outlineLight" className="w-full sm:w-auto">Explore Our Manufacturing</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-surface" aria-label="Our manufacturing strengths">
        <Container className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-24 items-center gap-3 px-3 py-5 text-sm md:justify-center lg:flex-col lg:gap-2 lg:px-2 lg:text-center">
              <Icon size={20} className="shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-label="About MK Garments">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Who We Are" title="A manufacturing partner for brands and businesses" />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 leading-7 text-muted">
              {ABOUT_COPY.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <Button to="/about" variant="outline" className="mt-3">About Us</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-28" aria-label="Manufacturing capabilities">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Manufacturing Capabilities" title="From concept to carton" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {displayedCapabilities.map((capability, index) => (
              <Reveal key={capability.id || capability.name || capability.title || index} delay={index * 50}>
                <article className="h-full border-b border-r border-border p-6 lg:p-8">
                  <p className="font-serif text-4xl text-muted/50">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-8 font-serif text-2xl">{capability.name || capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{capability.description || capability.short_description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Button to="/manufacturing" variant="outline" className="mt-8">See full manufacturing capabilities</Button>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-label="Featured products">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Product Portfolio"
              title="What we can manufacture"
              description="Examples of garments we produce for brands and businesses, not a store catalogue."
            />
          </Reveal>
          {productsState.loading ? (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse bg-surface" />)}
            </div>
          ) : products.length ? (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => <ProductCard key={product.id || product.slug} product={product} />)}
            </div>
          ) : (
            <p className="mt-12 border border-border p-8 text-muted">Product examples will be available soon.</p>
          )}
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-28" aria-label="Our production process">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Process" title="A clear path from inquiry to delivery" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 border-l border-t border-border lg:grid-cols-5">
            {displayedProcess.map((step, index) => (
              <Reveal key={step.id || step.step_number || index} delay={index * 40}>
                <article className="min-h-48 border-b border-r border-border p-5 lg:min-h-56 lg:p-6">
                  <p className="font-serif text-3xl text-accent">{String(step.step_number || index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-6 font-serif text-xl">{step.name || step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Button to="/process" variant="outline" className="mt-8">See the full process</Button>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-label="Quality control">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Quality Control" title="Inspection at every stage" description="Quality checks are built into the production workflow, from incoming materials through final preparation." />
            <Button to="/quality" variant="outline" className="mt-8">How we control quality</Button>
          </Reveal>
          <Reveal delay={100}>
            <ol className="border-t border-border">
              {QUALITY_STAGES.map((stage, index) => (
                <li key={stage} className="flex items-center gap-5 border-b border-border py-4">
                  <span className="font-serif text-xl text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <span>{stage}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-label="Who we work with">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Who We Work With" title="Built for B2B partnerships" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {WHO_WE_SERVE.map((clientType) => (
              <div key={clientType} className="flex items-center gap-3 border-b border-r border-border p-6">
                <Check size={18} className="shrink-0 text-accent" aria-hidden="true" />
                <span>{clientType}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection title={CTA_COPY.title} description={CTA_COPY.description} />
    </>
  )
}

export default Home
