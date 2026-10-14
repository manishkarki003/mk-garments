import { ArrowRight, Shirt } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mediaUrl } from '../utils/media'

function ProductCard({ product }) {
  const image = product.cover_image?.image

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-surface">
        {image ? (
          <img
            src={mediaUrl(image)}
            alt={product.cover_image?.alt_text || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : <Shirt className="text-muted" size={48} strokeWidth={1} aria-hidden="true" />}
      </div>
      <div className="pt-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{product.category?.name || product.category || 'Apparel'}</p>
        <h3 className="mt-2 font-serif text-2xl">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{product.short_description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Request Manufacturing Quote <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  )
}

export default ProductCard
