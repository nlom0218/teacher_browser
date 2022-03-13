import styled from "styled-components";
import { outPopup } from "../../apollo";
import { color, customMedia } from "../../styles";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  z-index: 20;
  color: ${color.black};
`;

const SRegisterContainer = styled.div`
  max-width: 900px;
  max-width: 56.25rem;
  min-width: 900px;
  min-width: 56.25rem;
  background-color: #ffffff;
  /* background-color: ${props => props.theme.bgColor}; */
  overflow: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  };
  position: fixed;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0%);
  min-height: 70%;
  max-height: 70%;
  height: 100%;
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const RegisterPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  row-gap: 10px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`

const PopupPrintContainer = ({ children, emojiPopup, maxHeight }) => {
  // 팝업창의 배경을 클릭하게 되면 팝업창에서 벗어나게 된다.
  const onClickBackground = () => {
    outPopup()
  }
  return (<Background onClick={onClickBackground}>
    {/* e.stopPropagation 이벤트가 부모로 전달되는 것을 막는다. 즉, outPopup이 실행이 안된다. */}
    <SRegisterContainer onClick={e => e.stopPropagation()}>
      <RegisterPage>
        {children}
      </RegisterPage>
    </SRegisterContainer>
  </Background>
  );
}



export default PopupPrintContainer;
