function Container({ className = '', children, ...props }) {
  return (
    <div className={`mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10 ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Container
