import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import { useCompany } from '../context/CompanyContext'
import { NAV_LINKS, PLACEHOLDER_COMPANY_NAME } from '../utils/navigation'

function Navbar() {
  const { company } = useCompany()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const companyName = company?.company_name || PLACEHOLDER_COMPANY_NAME

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-warm-white/95 backdrop-blur" >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight" aria-label={`${companyName} home`}>
          {companyName}
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `text-xs font-medium tracking-wide transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-charcoal'}`}
            >
              {label}
            </NavLink>
          ))}
          <Button to="/quote" variant="accent" className="ml-2 px-5 py-2.5">Request a Quote</Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button to="/quote" variant="accent" className="px-4 py-2.5">Quote</Button>
          <button
            type="button"
            className="p-2 text-charcoal"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-navigation" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-warm-white lg:hidden">
          <nav className="flex min-h-full flex-col px-5 sm:px-8" aria-label="Mobile navigation">
            <div>
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink key={to} to={to} className="block border-b border-border py-5 font-serif text-2xl">
                  {label}
                </NavLink>
              ))}
            </div>
            <Button to="/quote" variant="accent" className="mb-8 mt-auto w-full">Request a Quote</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
