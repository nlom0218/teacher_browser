import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import useMe from "../../../Hooks/useMe";
import Loading from "../../Shared/Loading";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import { SEE_ROLES } from "../../../Graphql/Roles/query";
import { CREATE_ROLES_MUTATION } from "../../../Graphql/Roles/mutation";

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
  const me = useMe();
  const navigate = useNavigate();
  const { roles, startDate, endDate } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const onCompleted = ({ createRoles }: { createRoles: { _id: string } }) => {
    if (!createRoles._id) return;

    navigate(`${routes.roles}/${createRoles._id}`);
    localStorage.removeItem("roleDetails");
    outPopup();
  };

  const [createRoles, { loading: createLoading }] = useMutation(CREATE_ROLES_MUTATION, {
    onCompleted,
  });

  const onClickCreateBtn = () => {
    const submitRoles = makeSubmitRoles();
    createRoles({
      variables: {
        userEmail: me?.email,
        startDate: new Date(startDate).valueOf(),
        endDate: new Date(endDate).valueOf(),
        data: submitRoles,
      },
    });
  };

  const makeSubmitRoles = () => {
    return roles.map((role: { role: string; students: string[]; work: string }) => {
      return {
        detail: role.work,
        title: role.role,
        students: role.students.map((item) => item.split(" ")[0]),
      };
    });
  };

  const onClickCancelBtn = () => {
    outPopup();
  };

  if (createLoading) {
    return <Loading page="btnPopupPage" />;
  }
  return (
    <BtnPopupContainer preventOutPoup={true}>
      <Layout>
        {!studentVaild && <Text className="comfirm-msg">역할이 등록되지 않은 학생이 존재합니다.</Text>}
        {!rolesVaild && <Text className="comfirm-msg">학생이 등록되지 않은 역할이 존재합니다.</Text>}
        <Text>1인 1역 생성을 진행하려면 생성하기 버튼을 클릭</Text>
        <Text>추가 등록 및 수정을 하려면 돌아가기를 클릭</Text>
        <BtnLayout>
          <div onClick={onClickCreateBtn}>생성하기</div>
          <div onClick={onClickCancelBtn}>돌아가기</div>
        </BtnLayout>
      </Layout>
    </BtnPopupContainer>
  );
};

export default ComfirmRolesSave;
