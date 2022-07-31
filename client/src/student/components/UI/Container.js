import React from 'react'

function Container(props) {
  return (
    <div className={`${props.className} container mx-auto `} style={props.style}>{props.children}</div>
  )
}

export default Container