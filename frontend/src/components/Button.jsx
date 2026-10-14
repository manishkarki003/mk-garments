import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-charcoal text-warm-white hover:bg-accent',
  accent: 'bg-accent text-white hover:bg-accent-dark',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-warm-white',
  outlineLight: 'border border-white text-white hover:bg-white hover:text-charcoal',
}

function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${variants[variant]} ${className}`

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>
  }

  return <button type="button" className={classes} {...props}>{children}</button>
}

export default Button
