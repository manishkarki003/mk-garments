function SectionHeading({ eyebrow, title, description, align = 'left', as = 'h2' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  const Title = as

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <Title className="mt-3 text-3xl leading-tight lg:text-4xl">{title}</Title>
      {description && <p className="mt-5 leading-7 text-muted">{description}</p>}
    </div>
  )
}

export default SectionHeading
