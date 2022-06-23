import React from 'react'

function Container(props) {
  return (
    <div className={`${props.className} container mx-auto `}>{props.children}</div>
  )
}

export default Container