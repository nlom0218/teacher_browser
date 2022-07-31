import { useNavigate } from "react-router";
import styled from "styled-components";
import { outPopup } from "../../apollo";
import routes from "../../routes";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.popupBgColor};
  z-index: 10;
`;

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Layout = styled.div`
  display: grid;
  color: ${(props) => props.theme.bgColor};
  row-gap: 20px;
  row-gap: 1.25rem;
  text-align: center;
  line-height: 120%;
`;

const LoginBtn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.green};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const NeedLoginPopupContainer = ({ children, preventOutPoup }) => {
  const navigate = useNavigate();
  // 팝업창의 배경을 클릭하게 되면 팝업창에서 벗어나게 된다.
  const onClickBackground = () => {
    if (preventOutPoup) {
      return;
    }
    outPopup();
    localStorage.removeItem("summaryStudentId");
  };
  const onClickLogin = () => {
    navigate(routes.login);
    outPopup();
    localStorage.removeItem("summaryStudentId");
  };
  return (
    <Background onClick={onClickBackground}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Layout>
          <div>해당 기능은 로그인 후 가능합니다.</div>
          <LoginBtn onClick={onClickLogin}>로그인하기</LoginBtn>
          <CancelBtn onClick={onClickBackground}>취소하기</CancelBtn>
        </Layout>
      </Container>
    </Background>
  );
};

export default NeedLoginPopupContainer;
