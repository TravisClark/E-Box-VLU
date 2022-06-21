import React from 'react'

function Container(props) {
  return (
    <div className={`${props.className} container mx-auto p-4`}>{props.children}</div>
  )
}

export default Container