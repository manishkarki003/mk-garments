import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getBlogPostBySlug } from '../services/content'
import { formatDate, splitParagraphs } from '../utils/format'
import { mediaUrl } from '../utils/media'

function BlogPost() {
  const { slug } = useParams()
  const [retry, setRetry] = useState(0)
  const fetcher = useCallback(() => getBlogPostBySlug(slug), [slug])
  const { data: post, loading, error } = useFetch(fetcher, [fetcher, retry])
  usePageMeta({ title: post ? (post.seo_title || `${post.title} | MK Garments`) : 'Article | MK Garments', description: post?.seo_description || post?.excerpt || '' })
  if (loading) return <Container className="py-24"><div className="mx-auto h-12 max-w-3xl animate-pulse bg-surface" /></Container>
  if (error) return <Container className="py-24"><div className="border border-border p-10 text-center"><h1 className="font-serif text-4xl">{error.response?.status === 404 ? 'Article not found' : 'Unable to load this article'}</h1>{error.response?.status === 404 ? <Button to="/insights" variant="outline" className="mt-6">Back to Insights</Button> : <Button variant="outline" className="mt-6" onClick={() => setRetry((value) => value + 1)}>Try again</Button>}</div></Container>
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt || '', ...(post.featured_image ? { image: mediaUrl(post.featured_image) } : {}), ...(post.published_at ? { datePublished: post.published_at } : {}), ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}), publisher: { '@type': 'Organization', name: 'MK Garments' } }
  return <>
    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    <main aria-label="Article"><Container className="py-10"><div className="mx-auto max-w-3xl"><nav aria-label="Breadcrumb" className="text-sm text-muted"><Link to="/insights" className="hover:text-accent">Insights</Link> / {post.title}</nav><p className="mt-10 text-xs uppercase tracking-widest text-accent">{[formatDate(post.published_at), post.author].filter(Boolean).join(' · ')}</p><h1 className="mt-4 font-serif text-4xl leading-tight lg:text-6xl">{post.title}</h1>{post.excerpt && <p className="mt-6 text-xl leading-8 text-muted">{post.excerpt}</p>}{post.featured_image && <img src={mediaUrl(post.featured_image)} alt={post.title} loading="lazy" className="mt-10 w-full object-cover" />}<div className="mt-10 space-y-6">{splitParagraphs(post.content).map((paragraph) => <p key={paragraph} className="whitespace-pre-line leading-relaxed text-muted">{paragraph}</p>)}</div><div className="mt-14 border border-border p-6"><h2 className="font-serif text-2xl">Planning a production run?</h2><Button to="/quote" variant="accent" className="mt-5">Request a Quote</Button></div><Link to="/insights" className="mt-8 inline-block text-accent">Back to Insights</Link></div></Container></main>
  </>
}
export default BlogPost
