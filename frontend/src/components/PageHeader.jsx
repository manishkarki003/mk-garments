import Breadcrumb from './Breadcrumb'
import Container from './Container'

function PageHeader({ breadcrumb, eyebrow, title, description }) {
  return (
    <header className="border-b border-border bg-surface py-10 lg:py-16">
      <Container>
        <Breadcrumb items={breadcrumb} />
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight lg:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl leading-7 text-muted">{description}</p>}
        </div>
      </Container>
    </header>
  )
}

export default PageHeader
