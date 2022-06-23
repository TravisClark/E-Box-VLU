import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import IntroductionBanner from '../components/Student/IntroductionBanner/IntroductionBanner'

function Login() {
  return (
    <IntroductionBanner>
        <LoginForm/>
    </IntroductionBanner>
  )
}

export default Login