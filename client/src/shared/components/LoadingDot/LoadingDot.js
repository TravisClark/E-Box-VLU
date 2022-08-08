import React from 'react'
import DotLoader from 'react-spinners/DotLoader'

export const LoadingDot = ({className, color='#1b74e9'}) => {
  return (
    <DotLoader size='24px' color={color} className={className}/>
  )
}
