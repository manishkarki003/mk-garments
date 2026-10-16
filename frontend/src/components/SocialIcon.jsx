import { Globe } from 'lucide-react'

function SocialIcon({ name, size = 20 }) {
  const iconName = name.toLowerCase()
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  if (iconName === 'facebook') {
    return <svg {...iconProps}><path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.55.45-1 1-1Z" /></svg>
  }

  if (iconName === 'instagram') {
    return <svg {...iconProps}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  }

  if (iconName === 'linkedin') {
    return <svg {...iconProps}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2.5 2.5 0 0 1 5 0V16M12 10v6" /></svg>
  }

  if (iconName === 'youtube') {
    return <svg {...iconProps}><path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81Z" /><path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" /></svg>
  }

  if (iconName === 'x' || iconName === 'twitter') {
    return <svg {...iconProps}><path d="m5 4 14 16M19 4 5 20" /></svg>
  }

  if (iconName === 'tiktok') {
    return <svg {...iconProps}><path d="M15 4c.37 2.01 1.51 3.36 3.5 3.5V11c-1.28.01-2.48-.38-3.5-1.1V15a5 5 0 1 1-5-5c.34 0 .68.04 1 .1v3.6a2 2 0 1 0 .5 1.3V4h3.5Z" /></svg>
  }

  return <Globe size={size} aria-hidden="true" />
}

export default SocialIcon
