import React from 'react'

function Button(props) {
  return (
    <button className={`px-10 py-3 font-semibold rounded ${props.className}`}>{props.children}</button>
  )
}
export default Button