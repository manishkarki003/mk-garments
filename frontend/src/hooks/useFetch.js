import { useEffect, useState } from 'react'

function useFetch(fetcher, dependencies = [fetcher]) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    // eslint-disable-next-line react/set-state-in-effect
    setLoading(true)
    setError(null)

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, ...dependencies])

  return { data, loading, error }
}

export default useFetch
