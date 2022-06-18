import React from 'react'

function Card(props) {
  return (
    <div className={`${props.className} mx-auto p-4`}>{props.children}</div>
  )
}

export default Card