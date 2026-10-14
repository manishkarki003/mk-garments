import { useLocation } from 'react-router-dom'
import Container from '../components/Container'

function PlaceholderPage({ title }) {
  const location = useLocation()

  return (
    <section className="py-24">
      <Container>
        <h1 className="text-5xl">{title}</h1>
        <p className="mt-5 text-muted">This page ({location.pathname}) is under construction.</p>
      </Container>
    </section>
  )
}

export default PlaceholderPage
