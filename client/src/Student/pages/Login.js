import React from 'react'
import IntroductionBanner from '../components/IntroductionBanner/IntroductionBanner'
import LoginForm from '../components/LoginForm/LoginForm'


function Login() {
  return (
    <IntroductionBanner>
        <LoginForm/>
    </IntroductionBanner>
  )
}

export default Login