export function formatDate(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export function splitParagraphs(text) {
  if (!text) return []
  return String(text).split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
}
