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
        {isLoading && <div className="min-w-full min-h-full absolute"><LoadingSpinner/></div>}
    </IntroductionBanner>
  )
}

export default Login