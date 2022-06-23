import React from 'react'

function NotFoundContent() {
  return (
    <div className="absolute flex w-full p-4 space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center sm:p-20 md:max-w-4xl sm:max-w-xl">
      <h1 className="text-white font-bold text-xl  md:text-3xl">
        Page not found! Please go back to the previous page.
      </h1>
    </div>
  )
}

export default NotFoundContent