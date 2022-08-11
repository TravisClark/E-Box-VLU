import React from 'react'
import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm'
import IntroductionBanner from '../components/IntroductionBanner/IntroductionBanner'

function ChangePassword() {
  return (
    <IntroductionBanner>
        <ChangePasswordForm/>
        {/* {successNotification.isShowing && (
            <Notification className="w-full h-full z-30" />
          )} */}
    </IntroductionBanner>
  )
}

export default ChangePassword