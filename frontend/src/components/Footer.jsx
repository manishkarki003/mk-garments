import { Link } from 'react-router-dom'
import Button from './Button'
import Container from './Container'
import SocialIcon from './SocialIcon'
import { useCompany } from '../context/CompanyContext'
import { FOOTER_EXTRA_LINKS, NAV_LINKS, PLACEHOLDER_COMPANY_NAME } from '../utils/navigation'

function Footer() {
  const { company } = useCompany()
  const companyName = company?.company_name || PLACEHOLDER_COMPANY_NAME
  const tagline = company?.tagline || 'Garment manufacturing in Nepal for brands, retailers, institutions and businesses.'
  const hasContact = company?.address || company?.phone || company?.email || company?.business_hours
  const socialLinks = Array.isArray(company?.social_links) ? company.social_links : []

  return (
    <footer className="mt-24 bg-charcoal text-warm-white">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl">{companyName}</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-warm-white/70">{tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-warm-white/60">Explore</h3>
          <nav className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3" aria-label="Footer navigation">
            {[...NAV_LINKS, ...FOOTER_EXTRA_LINKS].map(({ label, to }) => <Link key={to} to={to} className="text-sm text-warm-white/80 transition-colors hover:text-accent">{label}</Link>)}
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-warm-white/60">Contact</h3>
          <div className="mt-5 space-y-2 text-sm text-warm-white/80">
            {hasContact ? (
              <>
                {company?.address && <p>{company.address}</p>}
                {company?.phone && <p>{company.phone}</p>}
                {company?.email && <a className="block hover:text-accent" href={`mailto:${company.email}`}>{company.email}</a>}
                {company?.business_hours && <p>{company.business_hours}</p>}
              </>
            ) : <p>Contact details coming soon.</p>}
          </div>
          <Button to="/quote" variant="outlineLight" className="mt-6">Request a Quote</Button>
          {socialLinks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium uppercase tracking-widest text-warm-white/60">Follow us</h3>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((link) => link.url.startsWith('https://') && (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${companyName} on ${link.platform}`}
                    className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:bg-white hover:text-charcoal"
                  >
                    <SocialIcon name={link.icon_name || link.platform} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
      <Container className="border-t border-warm-white/20 py-5 text-sm text-warm-white/60">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </Container>
    </footer>
  )
}

export default Footer
