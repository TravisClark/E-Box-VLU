import React from 'react'

export const Backdrop = (props) => {
  return (
    <div className='absolute min-w-full min-h-screen bg-black opacity-60 top-0 left-0 z-40'>{props.children}</div>
  )
}
