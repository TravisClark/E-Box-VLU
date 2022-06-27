import React from 'react'
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner'
import useHttpClient from '../../shared/hooks/http-hook'
import IntroductionBanner from '../components/IntroductionBanner/IntroductionBanner'
import LoginForm from '../components/LoginForm/LoginForm'


function Login() {
  const {isLoading} = useHttpClient()
  return (
    <IntroductionBanner>
        <LoginForm/>
        {isLoading && <LoadingSpinner/>}
    </IntroductionBanner>
  )
}

export default Login