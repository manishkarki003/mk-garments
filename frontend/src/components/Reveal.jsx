import useReveal from '../hooks/useReveal'

function Reveal({ className = '', delay = 0, children }) {
  const { ref, visible } = useReveal()
  const delayClass = delay ? `delay-[${delay}ms]` : ''

  return (
    <div
      ref={ref}
      className={`${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-[opacity,transform] duration-[600ms] ease-out ${delayClass} ${className}`}
    >
      {children}
    </div>
  )
}

export default Reveal
