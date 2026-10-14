import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getCertifications } from '../services/manufacturing'
import { formatDate } from '../utils/format'
import { mediaUrl } from '../utils/media'
import { PHASE9_COPY } from '../data/pagesContent'

function Certifications() {
  usePageMeta({ title: 'Certifications | MK Garments', description: 'Certifications and compliance documents held by MK Garments.' })
  const [retry, setRetry] = useState(0)
  const fetcher = useCallback(() => getCertifications(), [])
  const { data, loading, error } = useFetch(fetcher, [fetcher, retry])
  const certifications = Array.isArray(data) ? data : []
  const empty = <div className="border border-border p-8 text-center"><p className="text-muted">{PHASE9_COPY.certificationsEmpty}</p><Button to="/quote" variant="accent" className="mt-5">Request a Quote</Button></div>
  return <>
    <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Certifications' }]} eyebrow="Certifications" title="Certifications and compliance" />
    <main aria-label="Certifications"><Container className="py-20 lg:py-28">{loading ? <div className="space-y-5">{Array.from({ length: 3 }, (_, index) => <div key={index} className="h-40 animate-pulse bg-surface" />)}</div> : error ? <>{empty}<Button variant="outline" className="mx-auto mt-5 block" onClick={() => setRetry((value) => value + 1)}>Try again</Button></> : certifications.length ? <div className="grid gap-6 md:grid-cols-2">{certifications.map((certification) => { const file = certification.certificate_file; const expired = certification.expiry_date && new Date(certification.expiry_date) < new Date(); const pdf = /\.pdf($|\?)/i.test(file || ''); return <article key={certification.id || certification.name} className="border border-border p-6"><div className="flex items-start justify-between gap-4"><h2 className="font-serif text-2xl">{certification.name}</h2>{expired && <Badge>Expired</Badge>}</div>{certification.issuer && <p className="mt-3 text-muted">{certification.issuer}</p>}<dl className="mt-5 space-y-2 text-sm">{[['Certificate number', certification.certificate_number], ['Issue date', formatDate(certification.issue_date)], ['Expiry date', formatDate(certification.expiry_date)]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="flex gap-3"><dt className="font-medium">{label}:</dt><dd className="text-muted">{value}</dd></div>)}</dl>{certification.description && <p className="mt-5 whitespace-pre-line leading-7 text-muted">{certification.description}</p>}{file && (pdf ? <a href={mediaUrl(file)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-accent">View certificate (PDF)</a> : <Link to={mediaUrl(file)} target="_blank" rel="noopener noreferrer" className="mt-5 block"><img src={mediaUrl(file)} alt={`${certification.name} certificate`} loading="lazy" className="max-h-48 object-contain" /></Link>)}</article> })}</div> : empty}</Container></main>
    <CTASection title="Need to discuss compliance requirements?" description="Share your requirements with our team and we will review them with your production brief." />
  </>
}
export default Certifications
