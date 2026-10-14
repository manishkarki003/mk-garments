import Button from '../components/Button'
import Container from '../components/Container'

function Home() {
  return (
    <section className="py-24 lg:py-36">
      <Container>
        <h1 className="max-w-4xl text-5xl leading-tight lg:text-7xl">
          Garments Made in Nepal.<br />
          Built for Your Brand.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
          From product development and sampling to production and quality control, we manufacture apparel for brands, retailers, institutions, and businesses.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/quote" variant="accent">Request a Quote</Button>
          <Button to="/manufacturing" variant="outline">Explore Our Manufacturing</Button>
        </div>
      </Container>
    </section>
  )
}

export default Home
