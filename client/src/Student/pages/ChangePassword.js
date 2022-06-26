import React from 'react'
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm'
import IntroductionBanner from '../components/IntroductionBanner/IntroductionBanner'

function ChangePassword() {
  return (
    <IntroductionBanner>
        <ChangePasswordForm/>
    </IntroductionBanner>
  )
}

export default ChangePassword