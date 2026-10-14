import { Shirt } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Container from '../components/Container'
import CTASection from '../components/CTASection'
import ProductCard from '../components/ProductCard'
import Badge from '../components/Badge'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import { getProductBySlug, getProducts } from '../services/products'
import { mediaUrl } from '../utils/media'

function splitValue(value) {
  if (!value) return null
  const values = String(value).split(/[,\n]/).map((item) => item.trim()).filter(Boolean)
  return values.length > 1 ? values : String(value)
}

function DetailValue({ value }) {
  const parsed = splitValue(value)
  if (Array.isArray(parsed)) return <div className="flex flex-wrap gap-2">{parsed.map((item) => <span key={item} className="border border-border px-2 py-1 text-xs">{item}</span>)}</div>
  return <span className="whitespace-pre-line">{parsed}</span>
}

function ProductSkeleton() {
  return <Container className="grid animate-pulse gap-10 py-12 lg:grid-cols-2 lg:py-20"><div className="aspect-[4/5] bg-surface" /><div><div className="h-8 w-1/3 bg-surface" /><div className="mt-5 h-12 w-3/4 bg-surface" /><div className="mt-6 h-20 bg-surface" /></div></Container>
}

function ProductDetail() {
  const { slug } = useParams()
  const [retry, setRetry] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const productFetcher = useCallback(() => getProductBySlug(slug), [slug])
  const productState = useFetch(productFetcher, [productFetcher, retry])
  const product = productState.data
  const categorySlug = product?.category?.slug || ''
  const relatedFetcher = useCallback(() => categorySlug ? getProducts({ category__slug: categorySlug }) : Promise.resolve({ results: [] }), [categorySlug])
  const relatedState = useFetch(relatedFetcher, [relatedFetcher])
  const images = Array.isArray(product?.images) ? product.images : []
  const related = (Array.isArray(relatedState.data?.results) ? relatedState.data.results : []).filter((item) => item.slug !== slug).slice(0, 3)

  usePageMeta({
    title: product ? (product.seo_title || `${product.name} Manufacturer in Nepal | MK Garments`) : 'Product | MK Garments',
    description: product?.seo_description || product?.short_description || '',
  })

  if (productState.loading) return <ProductSkeleton />
  if (productState.error) {
    const notFound = productState.error.response?.status === 404
    return <Container className="py-24"><div className="border border-border p-10 text-center"><h1 className="font-serif text-4xl">{notFound ? 'Product not found' : 'Unable to load this product'}</h1><p className="mt-4 text-muted">{notFound ? 'The requested garment is not in our portfolio.' : 'Please try again.'}</p>{notFound ? <Button to="/products" variant="outline" className="mt-6">Back to Products</Button> : <Button variant="outline" className="mt-6" onClick={() => setRetry((value) => value + 1)}>Try again</Button>}</div></Container>
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.short_description || '',
    image: images.map((image) => mediaUrl(image.image)),
    category: product.category?.name,
    manufacturer: { '@type': 'Organization', name: 'MK Garments' },
  }
  const breadcrumbItems = [{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }]
  if (product.category) breadcrumbItems.push({ label: product.category.name, to: `/products?category=${product.category.slug}` })
  breadcrumbItems.push({ label: product.name })

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <Container className="pb-28 pt-6 lg:pb-0 lg:pt-10">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section aria-label="Product image gallery">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-surface">
              {images.length ? <img src={mediaUrl(images[selectedImage]?.image)} alt={images[selectedImage]?.alt_text || product.name} className="h-full w-full object-cover" /> : <Shirt size={64} className="text-muted" strokeWidth={1} aria-hidden="true" />}
            </div>
            {images.length > 1 && <div className="mt-4 flex gap-3 overflow-x-auto"><ul className="flex gap-3">{images.map((image, index) => <li key={image.id || image.image}><button type="button" onClick={() => setSelectedImage(index)} aria-label={`View image ${index + 1}`} className={`h-20 w-16 shrink-0 overflow-hidden border-2 ${selectedImage === index ? 'border-accent' : 'border-transparent'}`}><img src={mediaUrl(image.image)} alt={image.alt_text || product.name} loading="lazy" className="h-full w-full object-cover" /></button></li>)}</ul></div>}
          </section>
          <section aria-label="Product information">
            {product.category?.name && <Badge>{product.category.name}</Badge>}
            <h1 className="mt-5 font-serif text-5xl leading-tight">{product.name}</h1>
            {product.short_description && <p className="mt-6 text-lg leading-8 text-muted">{product.short_description}</p>}
            <Button to={`/quote?product=${encodeURIComponent(product.name)}`} variant="accent" className="mt-8">Request Manufacturing Quote</Button>
          </section>
        </div>

        <section className="mt-16 lg:mt-24" aria-label="Manufacturing details">
          <h2 className="font-serif text-3xl">Manufacturing details</h2>
          <dl className="mt-6 border-t border-border">
            {[['Fabric options', product.fabric_options], ['Customization options', product.customization_options], ['Branding options', product.branding_options], ['Available colors', product.available_colors], ['MOQ', product.moq]].filter(([, value]) => value !== null && value !== undefined && String(value).trim()).map(([label, value]) => <div key={label} className="grid gap-2 border-b border-border py-4 sm:grid-cols-3"><dt className="text-sm font-medium">{label}</dt><dd className="text-sm text-muted sm:col-span-2"><DetailValue value={value} /></dd></div>)}
          </dl>
        </section>

        {product.description && <section className="mt-16 max-w-3xl" aria-label="About this product"><h2 className="font-serif text-3xl">About this product</h2><p className="mt-5 whitespace-pre-line leading-8 text-muted">{product.description}</p></section>}
        {related.length > 0 && <section className="mt-20" aria-label="Related products"><h2 className="font-serif text-3xl">Related products</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id || item.slug} product={item} />)}</div></section>}
      </Container>
      <CTASection title="Start a production inquiry for this garment" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-warm-white/95 p-3 pr-20 backdrop-blur lg:hidden">
        <Button to={`/quote?product=${encodeURIComponent(product.name)}`} variant="accent" className="w-full">Request Manufacturing Quote</Button>
      </div>
    </>
  )
}

export default ProductDetail
