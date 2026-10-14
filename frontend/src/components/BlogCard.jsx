import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'
import { mediaUrl } from '../utils/media'

function BlogCard({ post }) {
  const meta = [formatDate(post.published_at), post.author].filter(Boolean).join(' · ')
  return (
    <Link to={`/insights/${post.slug}`} className="group block">
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-surface">
        {post.featured_image ? <img src={mediaUrl(post.featured_image)} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <FileText size={44} className="text-muted" strokeWidth={1} aria-hidden="true" />}
      </div>
      <article className="pt-5">
        {meta && <p className="text-xs uppercase tracking-widest text-muted">{meta}</p>}
        <h2 className="mt-2 font-serif text-2xl">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 leading-6 text-muted">{post.excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">Read article <ArrowRight size={15} /></span>
      </article>
    </Link>
  )
}

export default BlogCard
