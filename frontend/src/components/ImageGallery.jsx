import { useState } from 'react'
import Lightbox from './Lightbox'

function ImageGallery({ images }) {
  const [index, setIndex] = useState(null)
  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, imageIndex) => (
          <figure key={image.id || image.src} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => setIndex(imageIndex)} aria-label={`Open image: ${image.alt}`} className="group block min-h-11 w-full overflow-hidden text-left">
              <img src={image.src} alt={image.alt} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
            {image.caption && <figcaption className="mt-2 text-sm text-muted">{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </>
  )
}

export default ImageGallery
