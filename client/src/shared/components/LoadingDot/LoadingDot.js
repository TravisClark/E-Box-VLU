import React from 'react'
import DotLoader from 'react-spinners/DotLoader'

export const LoadingDot = ({className, color='#1b74e9', size='24px'}) => {
  return (
    <DotLoader size={size} color={color} className={className}/>
  )
}
