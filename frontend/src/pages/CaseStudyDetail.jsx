import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import ImageGallery from '../components/ImageGallery'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getCaseStudyBySlug } from '../services/content'
import { mediaUrl } from '../utils/media'
import { splitParagraphs } from '../utils/format'

function CaseStudyDetail() {
  const { slug } = useParams()
  const fetcher = useCallback(() => getCaseStudyBySlug(slug), [slug])
  const [retry, setRetry] = useState(0)
  const { data: project, loading, error } = useFetch(fetcher, [fetcher, retry])
  usePageMeta({ title: project ? (project.seo_title || `${project.title} | MK Garments Projects`) : 'Project | MK Garments', description: project?.seo_description || [project?.industry, project?.product_type].filter(Boolean).join(' - ') })
  if (loading) return <Container className="py-24"><div className="h-72 animate-pulse bg-surface" /></Container>
  if (error) return <Container className="py-24"><div className="border border-border p-10 text-center"><h1 className="font-serif text-4xl">{error.response?.status === 404 ? 'Project not found' : 'Unable to load this project'}</h1>{error.response?.status === 404 ? <Button to="/projects" variant="outline" className="mt-6">Back to Projects</Button> : <Button variant="outline" className="mt-6" onClick={() => setRetry((value) => value + 1)}>Try again</Button>}</div></Container>
  const blocks = [['The challenge', project.challenge], ['Our manufacturing solution', project.solution], ['Production process', project.process], ['The result', project.result]].filter(([, text]) => text)
  const images = (project.images || []).map((image) => ({ id: image.id, src: mediaUrl(image.image), alt: image.alt_text || project.title, caption: image.caption }))
  return <>
    <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: project.title }]} eyebrow={[project.industry, project.product_type].filter(Boolean).join(' / ')} title={project.title} description={project.client_name || ''} />
    <main aria-label="Project case study"><Container className="py-12 lg:py-20">
      {project.cover_image && <img src={mediaUrl(project.cover_image)} alt={project.title} loading="lazy" className="max-h-[70vh] w-full object-cover" />}
      <div className="mt-12 space-y-0">{blocks.map(([title, text]) => <section key={title} className="grid gap-4 border-t border-border py-8 lg:grid-cols-[1fr_2fr] lg:gap-16"><h2 className="font-serif text-2xl">{title}</h2><div className="space-y-4 leading-7 text-muted">{splitParagraphs(text).map((paragraph) => <p key={paragraph} className="whitespace-pre-line">{paragraph}</p>)}</div></section>)}</div>
      {images.length > 0 && <section className="mt-12 border-t border-border pt-10" aria-label="Project gallery"><h2 className="font-serif text-3xl">Project gallery</h2><div className="mt-8"><ImageGallery images={images} /></div></section>}
    </Container></main>
    <CTASection title="Have a similar project in mind?" />
  </>
}
export default CaseStudyDetail
