import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PlaceholderPage from './pages/PlaceholderPage'
import Home from './pages/Home'

const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Manufacturing = lazy(() => import('./pages/Manufacturing'))
const Process = lazy(() => import('./pages/Process'))
const Quality = lazy(() => import('./pages/Quality'))
const Sustainability = lazy(() => import('./pages/Sustainability'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Certifications = lazy(() => import('./pages/Certifications'))

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
            {pages.map(([path, title]) => {
              if (path === '/products') return <Route key={path} path={path} element={<Products />} />
              if (path === '/manufacturing') return <Route key={path} path={path} element={<Manufacturing />} />
              if (path === '/process') return <Route key={path} path={path} element={<Process />} />
              if (path === '/quality') return <Route key={path} path={path} element={<Quality />} />
              if (path === '/sustainability') return <Route key={path} path={path} element={<Sustainability />} />
              if (path === '/projects') return <Route key={path} path={path} element={<CaseStudies />} />
              if (path === '/insights') return <Route key={path} path={path} element={<Blog />} />
              return <Route key={path} path={path} element={<PlaceholderPage title={title} />} />
            })}
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/projects/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights/:slug" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="*" element={<PlaceholderPage title="Page not found" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App