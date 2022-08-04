import React from 'react'
import DotLoader from 'react-spinners/DotLoader'

export const LoadingDot = ({className}) => {
  return (
    <DotLoader size='24' color='#1b74e9' className={className}/>
  )
}
