import { Factory, Globe2, Handshake, Shirt, Tag, ShieldCheck } from 'lucide-react'

// DEMO DEFAULT - replace with real company info
export const TRUST_ITEMS = [
  { icon: Factory, label: 'Custom Manufacturing' },
  { icon: Handshake, label: 'B2B Production' },
  { icon: Globe2, label: 'Made in Nepal' },
  { icon: Tag, label: 'Private Label' },
  { icon: ShieldCheck, label: 'Quality Controlled' },
  { icon: Shirt, label: 'Export Ready' },
]

// DEMO DEFAULT - replace with real company info
export const DEFAULT_CAPABILITIES = [
  { name: 'Product Development', description: 'Concept, fabric selection, sampling and product development.' },
  { name: 'Cutting', description: 'Professional garment cutting and preparation.' },
  { name: 'Sewing & Production', description: 'Structured garment production workflow.' },
  { name: 'Finishing', description: 'Finishing, pressing and final preparation.' },
  { name: 'Quality Control', description: 'Quality inspection throughout the production process.' },
  { name: 'Packaging', description: 'Professional packaging and preparation for delivery.' },
]

// DEMO DEFAULT - replace with real company info
export const DEFAULT_PROCESS = [
  ['Inquiry', 'Share your garment requirements with our team.'],
  ['Product Discussion', 'Review the product direction and requirements.'],
  ['Tech Pack / Design Review', 'Align on specifications, details and construction.'],
  ['Fabric & Material Selection', 'Select materials suited to the product brief.'],
  ['Sampling', 'Develop a sample for review and refinement.'],
  ['Sample Approval', 'Confirm the approved sample before production.'],
  ['Production', 'Move the approved product into production.'],
  ['Quality Control', 'Inspect work throughout the production process.'],
  ['Finishing', 'Complete finishing and final preparation.'],
  ['Packaging & Delivery', 'Prepare the order for delivery.'],
].map(([name, description], index) => ({ step_number: index + 1, name, description }))

// DEMO DEFAULT - replace with real company info
export const QUALITY_STAGES = [
  'Raw material inspection',
  'Fabric inspection',
  'Cutting inspection',
  'Stitching inspection',
  'Measurement checking',
  'Finishing inspection',
  'Final inspection',
  'Packaging inspection',
]

// DEMO DEFAULT - replace with real company info
export const WHO_WE_SERVE = [
  'International clothing brands',
  'Fashion brands',
  'Retailers and wholesalers',
  'Corporate and uniform buyers',
  'Private-label brands',
  'Sportswear companies',
]

// DEMO DEFAULT - replace with real company info
export const ABOUT_COPY = [
  'We support brands and businesses through the practical stages of bringing garments to production.',
  'From product development and sampling to production and quality control, our work is structured around clear communication and dependable execution.',
]

// DEMO DEFAULT - replace with real company info
export const CTA_COPY = {
  title: 'Ready to discuss your next production run?',
  description: 'Send us your tech pack or specification and our team will prepare a quotation for your requirements.',
}
