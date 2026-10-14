import { ArrowRight, Factory } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mediaUrl } from '../utils/media'

function CaseStudyCard({ project }) {
  const labels = [project.industry, project.product_type].filter(Boolean).join(' / ')
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface">
        {project.cover_image ? <img src={mediaUrl(project.cover_image)} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <Factory size={48} className="text-muted" strokeWidth={1} aria-hidden="true" />}
      </div>
      <div className="pt-5">
        {labels && <p className="text-xs uppercase tracking-widest text-muted">{labels}</p>}
        <h2 className="mt-2 font-serif text-2xl">{project.title}</h2>
        {project.client_name && <p className="mt-2 text-sm text-muted">{project.client_name}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">View project <ArrowRight size={15} /></span>
      </div>
    </Link>
  )
}

export default CaseStudyCard
