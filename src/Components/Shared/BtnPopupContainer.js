import styled from "styled-components";
import { outPopup } from "../../apollo";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.popupBgColor};
  z-index: 10;
`;

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`


const BtnPopupContainer = ({ children }) => {
  // 팝업창의 배경을 클릭하게 되면 팝업창에서 벗어나게 된다.
  const onClickBackground = () => {
    outPopup()
  }
  return (<Background onClick={onClickBackground}>
    <Container onClick={e => e.stopPropagation()}>
      {children}
    </Container>
  </Background>
  );
}

export default BtnPopupContainer;
