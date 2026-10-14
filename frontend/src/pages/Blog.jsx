import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import PageHeader from '../components/PageHeader'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getBlogPosts } from '../services/content'
import { PHASE9_COPY } from '../data/pagesContent'

function Blog() {
  usePageMeta({ title: 'Garment Manufacturing Insights | MK Garments', description: 'Guides for brands and buyers on choosing a garment manufacturer, tech packs, fabrics, sampling, quality control and pricing.' })
  const [params, setParams] = useSearchParams()
  const page = Math.max(1, Number(params.get('page')) || 1)
  const [retry, setRetry] = useState(0)
  const fetcher = useCallback(() => getBlogPosts({ page }), [page])
  const { data, loading, error } = useFetch(fetcher, [fetcher, retry])
  const posts = Array.isArray(data?.results) ? data.results : []
  const count = Number(data?.count) || 0
  const total = Math.max(1, Math.ceil(count / 12))
  useEffect(() => { if (page !== Number(params.get('page')) && page !== 1) setParams({ page: String(page) }) }, [page, params, setParams])
  const changePage = (next) => { setParams(next === 1 ? {} : { page: String(next) }); window.setTimeout(() => document.getElementById('article-grid')?.scrollIntoView({ behavior: 'smooth' }), 0) }
  return <>
    <PageHeader breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} eyebrow="Insights" title="Guides for brands and buyers" description={PHASE9_COPY.blogDescription} />
    <main aria-label="Garment manufacturing insights"><Container className="py-20 lg:py-28">
      {loading && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-video animate-pulse bg-surface" />)}</div>}
      {error && <div className="border border-border p-8 text-center"><p className="text-muted">We could not load the articles.</p><Button variant="outline" className="mt-5" onClick={() => setRetry((value) => value + 1)}>Try again</Button></div>}
      {!loading && !error && posts.length > 0 && <div id="article-grid" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <BlogCard key={post.id || post.slug} post={post} />)}</div>}
      {!loading && !error && posts.length === 0 && <div className="border border-border p-8 text-center"><p className="text-muted">{PHASE9_COPY.blogEmpty}</p><a href="/products" className="mt-5 inline-block text-accent">Explore products</a></div>}
      {count > 12 && <div className="mt-12 flex items-center justify-between border-t border-border pt-6"><Button variant="outline" disabled={page <= 1} onClick={() => changePage(page - 1)} className="disabled:opacity-40">Previous</Button><span className="text-sm text-muted">Page {page} of {total}</span><Button variant="outline" disabled={page >= total} onClick={() => changePage(page + 1)} className="disabled:opacity-40">Next</Button></div>}
    </Container></main>
    <CTASection title="Planning a production run?" description="Share your requirements with our team and start a conversation." />
  </>
}
export default Blog
