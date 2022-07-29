import React from 'react'
import Container from '../UI/Container'
import classes from './SearchingBackground.module.css'

export const SearchingBackground = (props) => {
  return (
    <section id="Introduction">
      <Container className="relative min-w-full z-0">
        <div className={`${classes.bannerBg} relative `}/>
        <div
          className={`${classes.model} min-w-full min-h-full absolute top-0`}
        ></div>
        {props.children}
      </Container>
    </section>
  )
}
