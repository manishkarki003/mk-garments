import { createContext, useContext, useEffect, useState } from 'react'
import { getCompanyProfile } from '../services/company'

const CompanyContext = createContext({ company: null, loading: true })

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCompanyProfile()
      .then(setCompany)
      .catch(() => setCompany(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <CompanyContext.Provider value={{ company, loading }}>
      {children}
    </CompanyContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCompany() {
  return useContext(CompanyContext)
}
