import Button from './Button'
import Container from './Container'

function CTASection({ title, description }) {
  return (
    <section className="bg-charcoal py-20 text-warm-white lg:py-28" aria-label="Contact call to action">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight lg:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-7 text-warm-white/70">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/quote" variant="accent">Request a Quote</Button>
            <Button to="/contact" variant="outlineLight">Contact Our Team</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
