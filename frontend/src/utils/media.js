export function mediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path

  const origin = new URL(
    import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  ).origin
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`
}
