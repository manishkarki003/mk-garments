import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getCategories, getProducts } from '../services/products'

const PAGE_SIZE = 12

function Products() {
  usePageMeta({
    title: 'Garment Manufacturing Portfolio | MK Garments',
    description: 'Explore the garments we manufacture: T-shirts, polos, hoodies, jackets, sportswear, uniforms and custom apparel. Request a manufacturing quote.',
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const query = searchParams.get('q') || ''
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const [searchValue, setSearchValue] = useState(query)
  const [retry, setRetry] = useState(0)

  const categoriesFetcher = useCallback(() => getCategories(), [])
  const productsFetcher = useCallback(() => {
    const params = { page }
    if (category) params.category__slug = category
    if (query) params.search = query
    return getProducts(params)
  }, [category, page, query])
  const categoriesState = useFetch(categoriesFetcher)
  const productsState = useFetch(productsFetcher, [productsFetcher, retry])
  const categories = Array.isArray(categoriesState.data?.results) ? categoriesState.data.results : []
  const products = Array.isArray(productsState.data?.results) ? productsState.data.results : []
  const count = Number(productsState.data?.count) || 0
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))
  const hasFilters = Boolean(category || query)

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    setSearchValue(query)
  }, [query])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue === query) return
      const next = new URLSearchParams(searchParams)
      if (searchValue.trim()) next.set('q', searchValue.trim())
      else next.delete('q')
      next.delete('page')
      setSearchParams(next)
    }, 350)
    return () => clearTimeout(timer)
  }, [searchValue, query, searchParams, setSearchParams])

  const updateFilters = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    next.delete('page')
    setSearchParams(next)
  }

  const changePage = (nextPage) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
    window.setTimeout(() => document.getElementById('product-results')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  return (
    <>
      <section className="border-b border-border bg-surface py-12 lg:py-20" aria-label="Product portfolio introduction">
        <Container>
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
          <div className="mt-10">
            <SectionHeading
              as="h1"
              eyebrow="Product Portfolio"
              title="What we can manufacture"
              description="This is a manufacturing catalog of examples. Every product can be customised to the buyer's specification."
            />
          </div>
        </Container>
      </section>

      <main className="py-12 lg:py-20" aria-label="Product catalog">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Product categories">
              <button type="button" aria-pressed={!category} onClick={() => updateFilters({ category: '' })} className={`min-h-11 shrink-0 border px-4 text-sm ${!category ? 'border-charcoal bg-charcoal text-warm-white' : 'border-border hover:border-charcoal'}`}>All</button>
              {categories.map((item) => (
                <button key={item.slug} type="button" aria-pressed={category === item.slug} onClick={() => updateFilters({ category: item.slug })} className={`min-h-11 shrink-0 border px-4 text-sm ${category === item.slug ? 'border-charcoal bg-charcoal text-warm-white' : 'border-border hover:border-charcoal'}`}>
                  {item.name}
                </button>
              ))}
            </div>
            <label className="relative block w-full shrink-0 lg:max-w-xs">
              <span className="sr-only">Search products</span>
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search products" className="h-11 w-full border border-border bg-warm-white pl-10 pr-3 text-sm outline-none focus:border-accent" />
            </label>
          </div>

          <div id="product-results" className="mt-10 scroll-mt-24">
            {!productsState.loading && !productsState.error && <p className="mb-6 text-sm text-muted">{count} {count === 1 ? 'product' : 'products'}</p>}
            {productsState.loading && <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse bg-surface" />)}</div>}
            {productsState.error && (
              <div className="border border-border p-8 text-center">
                <p className="text-muted">We could not load the product portfolio.</p>
                <Button variant="outline" className="mt-5" onClick={() => setRetry((value) => value + 1)}>Try again</Button>
              </div>
            )}
            {!productsState.loading && !productsState.error && products.length > 0 && <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id || product.slug} product={product} />)}</div>}
            {!productsState.loading && !productsState.error && products.length === 0 && (
              <div className="border border-border p-8 text-center">
                <p className="text-muted">{hasFilters ? 'No products match your filters.' : 'Our product portfolio is being prepared. Contact us to discuss your garment requirements.'}</p>
                {hasFilters ? <Button variant="outline" className="mt-5" onClick={() => { setSearchValue(''); setSearchParams({}) }}>Clear filters</Button> : <Button to="/quote" variant="accent" className="mt-5">Request a Quote</Button>}
              </div>
            )}
          </div>

          {count > PAGE_SIZE && (
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
              <Button variant="outline" disabled={page <= 1} onClick={() => changePage(page - 1)} className="disabled:cursor-not-allowed disabled:opacity-40">Previous</Button>
              <span className="text-sm text-muted">Page {page} of {totalPages}</span>
              <Button variant="outline" disabled={page >= totalPages} onClick={() => changePage(page + 1)} className="disabled:cursor-not-allowed disabled:opacity-40">Next</Button>
            </div>
          )}
        </Container>
      </main>
      <CTASection title="Don't see your garment?" description="We manufacture to your specification. Send us your tech pack or reference and we will review it." />
    </>
  )
}

export default Products
