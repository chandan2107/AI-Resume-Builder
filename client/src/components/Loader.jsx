import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-light/70 z-50">
      <div className="w-10 h-10 border-4 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader