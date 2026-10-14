import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PlaceholderPage from './pages/PlaceholderPage'
import Home from './pages/Home'

const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

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
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            {pages.map(([path, title]) => path === '/products'
              ? <Route key={path} path={path} element={<Products />} />
              : <Route key={path} path={path} element={<PlaceholderPage title={title} />} />)}
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="*" element={<PlaceholderPage title="Page not found" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App