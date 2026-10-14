import { useEffect, useState } from 'react'

function useFetch(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetcher()
      .then((result) => {
        if (mounted) setData(result)
      })
      .catch((fetchError) => {
        if (mounted) setError(fetchError)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [fetcher])

  return { data, loading, error }
}

export default useFetch
