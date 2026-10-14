import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import ImageGallery from '../components/ImageGallery'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getGalleryImages } from '../services/gallery'
import { PHASE9_COPY } from '../data/pagesContent'
import { mediaUrl } from '../utils/media'

function Gallery() {
  usePageMeta({ title: 'Factory & Production Gallery | MK Garments', description: 'Photos from our factory, production floor and finished garments.' })
  const [retry, setRetry] = useState(0)
  const fetcher = useCallback(() => getGalleryImages(), [])
  const { data, loading, error } = useFetch(fetcher, [fetcher, retry])
  const allImages = Array.isArray(data) ? data : []
  const categories = [...new Map(allImages.filter((item) => item.category?.slug).map((item) => [item.category.slug, item.category])).values()].sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name))
  const [category, setCategory] = useState('')
  const images = allImages.filter((item) => !category || item.category?.slug === category).map((item) => ({ id: item.id, src: mediaUrl(item.image), alt: item.alt_text || item.caption || 'MK Garments gallery photo', caption: item.caption }))
  return <>
    <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} eyebrow="Gallery" title="Inside our production" description={PHASE9_COPY.galleryDescription} />
    <main aria-label="Production gallery"><Container className="py-20 lg:py-28">
      {categories.length > 0 && <div className="mb-10 flex gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => setCategory('')} aria-pressed={!category} className={`min-h-11 shrink-0 border px-4 text-sm ${!category ? 'border-charcoal bg-charcoal text-warm-white' : 'border-border'}`}>All</button>{categories.map((item) => <button type="button" key={item.slug} onClick={() => setCategory(item.slug)} aria-pressed={category === item.slug} className={`min-h-11 shrink-0 border px-4 text-sm ${category === item.slug ? 'border-charcoal bg-charcoal text-warm-white' : 'border-border'}`}>{item.name}</button>)}</div>}
      {loading && <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[4/3] animate-pulse bg-surface" />)}</div>}
      {error && <div className="border border-border p-8 text-center"><p className="text-muted">We could not load the gallery.</p><Button variant="outline" className="mt-5" onClick={() => setRetry((value) => value + 1)}>Try again</Button></div>}
      {!loading && !error && images.length > 0 && <ImageGallery images={images} />}
      {!loading && !error && images.length === 0 && <div className="border border-border p-8 text-center"><p className="text-muted">{PHASE9_COPY.galleryEmpty}</p><Link to="/manufacturing" className="mt-5 inline-block text-accent">Back to manufacturing</Link></div>}
    </Container></main>
    <CTASection title="Discuss your production requirements" description="Share your product specification with our team to begin a conversation." />
  </>
}
export default Gallery
