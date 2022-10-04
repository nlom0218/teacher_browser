import styled from "styled-components";
import { outPopup } from "../../../apollo";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Text = styled.div`
  color: ${(props) => props.theme.originBgColor};
`;

const Btn = styled.div`
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.originBgColor};
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  text-align: center;
  border-radius: 50px;
  border-radius: 0.3125rem;
  margin-top: 20px;
  margin-top: 1.25rem;
  cursor: pointer;
`;

const GettingReady = () => {
  const onClickBtn = () => {
    outPopup();
  };
  return (
    <BtnPopupContainer>
      <Text>해당 기능은 곧 업데이트 예정입니다.😊</Text>
      <Btn onClick={onClickBtn}>돌아가기</Btn>
    </BtnPopupContainer>
  );
};

export default GettingReady;
