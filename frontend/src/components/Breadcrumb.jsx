import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Breadcrumb({ items = [] }) {
  const schemaItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${window.location.origin}${item.to || window.location.pathname}`,
  }))

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex min-h-11 items-center gap-1">
              {index < items.length - 1 && item.to ? (
                <>
                  <Link to={item.to} className="hover:text-accent">{item.label}</Link>
                  <ChevronRight size={14} aria-hidden="true" />
                </>
              ) : (
                <span aria-current="page" className={index === items.length - 1 ? 'text-charcoal' : ''}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: schemaItems })}
      </script>
    </>
  )
}

export default Breadcrumb
