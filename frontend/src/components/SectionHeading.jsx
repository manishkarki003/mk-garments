function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl leading-tight lg:text-4xl">{title}</h2>
      {description && <p className="mt-5 leading-7 text-muted">{description}</p>}
    </div>
  )
}

export default SectionHeading
