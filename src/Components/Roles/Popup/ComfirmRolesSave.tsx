import styled from "styled-components";
import { outPopup } from "../../../apollo";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Layout = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.bgColor};
  .comfirm-msg {
    color: ${(props) => props.theme.redColor};
    font-weight: 700;
  }
`;

const Text = styled.div`
  text-align: center;
`;

const BtnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  div {
    background-color: ${(props) => props.theme.btnBgColor};
    padding: 10px;
    padding: 0.625rem;
    text-align: center;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

interface IProps {
  studentVaild: boolean;
  rolesVaild: boolean;
}

const ComfirmRolesSave = ({ studentVaild, rolesVaild }: IProps) => {
  const onClickCancelBtn = () => {
    outPopup();
  };
  return (
    <BtnPopupContainer preventOutPoup={true}>
      <Layout>
        {!studentVaild && <Text className="comfirm-msg">역할이 등록되지 않은 학생이 존재합니다.</Text>}
        {!rolesVaild && <Text className="comfirm-msg">학생이 등록되지 않은 역할이 존재합니다.</Text>}
        <Text>이대로 저장을 진행하려면 저장하기 버튼을 클릭</Text>
        <Text>추가 등록을 하려면 돌아가기를 클릭</Text>
        <BtnLayout>
          <div>저장하기</div>
          <div onClick={onClickCancelBtn}>돌아가기</div>
        </BtnLayout>
      </Layout>
    </BtnPopupContainer>
  );
};

export default ComfirmRolesSave;
