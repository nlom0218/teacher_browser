import React from 'react';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountContainer from '../Components/Shared/AccountContainer';

const Layout = styled.div`
  display: grid;
  justify-items: center;
  padding: 20px;
  padding: 1.25rem;
`


const Login = () => {
  return (<AccountContainer>
    <Layout>
      <AccountTitle title="로그인" />
    </Layout>
  </AccountContainer>);
}

export default Login;