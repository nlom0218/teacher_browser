import React from "react";
import SocialLogin from "../Components/Account/SocialLogin";
import AccountContainer from "../Components/Shared/AccountContainer";
import useTitle from "../Hooks/useTitle";
import styled from "styled-components";
import LogoImage from "../image/LogoImage.png"
import BackBtn from "../Components/Account/BackBtn";

const LogoIcon = styled.img`
  width: 100px;
  width: 6.25rem;
`

const Login = () => {
  const titleUpdataer = useTitle("티처캔 | 로그인")

  return (
    <AccountContainer>
      <BackBtn />
      <LogoIcon src={LogoImage}>
      </LogoIcon>
      <SocialLogin />
    </AccountContainer >
  );
};

export default Login;
