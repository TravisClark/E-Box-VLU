import React from 'react'

function Background(props) {
  return (
    <div className="w-full h-screen bg-slate-200 flex">{props.children}</div>
  )
}

export default Background