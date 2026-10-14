function Badge({ children, className = '' }) {
  return <span className={`inline-block border border-border px-3 py-1 text-xs uppercase tracking-wider ${className}`}>{children}</span>
}

export default Badge
