import { MessageCircle } from 'lucide-react'
import { useCompany } from '../context/CompanyContext'
import { PLACEHOLDER_WHATSAPP } from '../utils/navigation'

function WhatsAppButton() {
  const { company } = useCompany()
  const number = String(company?.whatsapp_number || PLACEHOLDER_WHATSAPP).replace(/\D/g, '')
  const message = encodeURIComponent('Hello, I would like to discuss garment manufacturing for my company.')

  return (
    <a
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}

export default WhatsAppButton
