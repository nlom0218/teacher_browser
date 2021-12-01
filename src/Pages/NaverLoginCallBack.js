import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const NaverLoginCallBack = () => {
  const [email, setEmail] = useState(undefined)
  const inItNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "Gf04qU_FzIfDWz4a9_6Z",
      callbackUrl: "http://localhost:3000/naverLogin",
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '50' },
      callbackHandle: true
    })
    naverLogin.init()
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { email } = naverLogin.user
        setEmail(email)
      }
    })
    if (email) {

    }
  }
  useEffect(() => {
    inItNaverLogin()
  })
  return <div>
    <div id="naverIdLogin"></div>

  </div>
}

export default NaverLoginCallBack;