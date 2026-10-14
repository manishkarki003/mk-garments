import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

function Lightbox({ images, index, onClose, onChange }) {
  const closeRef = useRef(null)
  const previousFocus = useRef(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return undefined
    previousFocus.current = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && images.length > 1) onChange((index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight' && images.length > 1) onChange((index + 1) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousFocus.current?.focus?.()
    }
  }, [open, index, images.length, onChange, onClose])

  if (!open) return null
  const current = images[index]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}>
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image viewer" className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center text-white"><X size={24} /></button>
      {images.length > 1 && <button type="button" onClick={(event) => { event.stopPropagation(); onChange((index - 1 + images.length) % images.length) }} aria-label="Previous image" className="absolute left-2 flex min-h-11 min-w-11 items-center justify-center text-white sm:left-6"><ChevronLeft size={32} /></button>}
      <figure className="max-w-5xl text-center" onClick={(event) => event.stopPropagation()}>
        <img src={current.src} alt={current.alt} className="mx-auto max-h-[80vh] object-contain" />
        {current.caption && <figcaption className="mt-4 text-sm text-white/80">{current.caption}</figcaption>}
      </figure>
      {images.length > 1 && <button type="button" onClick={(event) => { event.stopPropagation(); onChange((index + 1) % images.length) }} aria-label="Next image" className="absolute right-2 flex min-h-11 min-w-11 items-center justify-center text-white sm:right-6"><ChevronRight size={32} /></button>}
    </div>
  )
}

export default Lightbox
