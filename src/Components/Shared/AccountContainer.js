import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import Theme from './Theme';

const SAccountContainer = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  grid-template-rows: 3.125rem 1fr 3.125rem;
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
`

const BasicLayout = styled.div`
  align-self: center;
  grid-row: 2 / 3;
  margin: 0 auto;
  max-width: 450px;
  max-width: 28.125rem;
  width: 90%;
  overflow: scroll;
  box-shadow: rgb(0 0 0 / 20%) 0px 17px 6px -14px;
  background: ${props => props.theme.blurColor};
  transition: background 1s ease;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  border-radius: 5px;
  border-radius: 0.3125rem;
  position: relative;
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
`

const Layout = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
  padding: 40px;
  padding: 2.5rem;
`

const AccountContainer = ({ children }) => {
  return (<SAccountContainer>
    <Theme />
    <BasicLayout>
      <Layout>
        {children}
      </Layout>
    </BasicLayout>
  </SAccountContainer>);
}

export default AccountContainer;