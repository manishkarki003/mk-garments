import { useEffect } from 'react'

function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionTag = document.querySelector('meta[name="description"]') || document.createElement('meta')
    const hadDescriptionTag = Boolean(descriptionTag.parentNode)
    const previousDescription = descriptionTag.getAttribute('content')

    document.title = title
    descriptionTag.setAttribute('name', 'description')
    descriptionTag.setAttribute('content', description || '')
    if (!hadDescriptionTag) document.head.appendChild(descriptionTag)

    return () => {
      document.title = previousTitle
      if (previousDescription === null) descriptionTag.remove()
      else descriptionTag.setAttribute('content', previousDescription)
    }
  }, [title, description])
}

export default usePageMeta
