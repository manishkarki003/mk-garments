import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const pages = [
  ['/about', 'About'],
  ['/manufacturing', 'Manufacturing'],
  ['/products', 'Products'],
  ['/process', 'Our Process'],
  ['/quality', 'Quality Control'],
  ['/sustainability', 'Sustainability'],
  ['/projects', 'Projects'],
  ['/insights', 'Insights'],
  ['/contact', 'Contact'],
  ['/quote', 'Request a Quote'],
]

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {pages.map(([path, title]) => <Route key={path} path={path} element={<PlaceholderPage title={title} />} />)}
          <Route path="*" element={<PlaceholderPage title="Page not found" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App