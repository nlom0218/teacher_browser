import styled from "styled-components";
import { outPopup } from "../../apollo";
import { customMedia } from "../../styles";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  z-index: 0;
`;

const SRegisterContainer = styled.div`
  width: 80%;
  overflow: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  };
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 70%;
  height: 70%;
  ${customMedia.greaterThan("tablet")`
    width: 60%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 30%
  `}
`

const RegisterPage = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  border-radius: 10px;
  display: grid;
  align-items: flex-start;
  row-gap: 10px;
  row-gap: 1.25rem;
`

const RegisterContainer = ({ children }) => {
  const onClickBackground = () => {
    outPopup()
  }
  return (<Background onClick={onClickBackground}>
    <SRegisterContainer onClick={e => e.stopPropagation()}>
      <RegisterPage>
        {children}
      </RegisterPage>
    </SRegisterContainer>
  </Background>
  );
}

export default RegisterContainer;
