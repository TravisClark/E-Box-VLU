import React from 'react'

function Background(props) {
  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col">{props.children}</div>
  )
}

export default Background