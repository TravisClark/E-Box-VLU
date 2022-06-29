import React from 'react'

function Button(props) {
  return (
    <button className={`${props.className} px-10 py-3 font-semibold rounded`} >{props.title}</button>
  )
}
export default Button