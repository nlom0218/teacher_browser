import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { DELETE_ROLES_MUTATION } from "../../../Graphql/Roles/mutation";
import { HAS_ROLES, SEE_ROLES_QUERY } from "../../../Graphql/Roles/query";
import useMe from "../../../Hooks/useMe";
import routes from "../../../routes";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import Loading from "../../Shared/Loading";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  color: ${(props) => props.theme.bgColor};
`;

const Layout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Btn = styled.div`
  background-color: ${(props) => props.theme.green};
  text-align: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
  text-align: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const Contents = styled.div`
  text-align: center;
  line-height: 160%;
  opacity: 0.8;
`;

const CreateNewRoles = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const me = useMe();

  const [deleteRoles, { loading }] = useMutation(DELETE_ROLES_MUTATION, {
    onCompleted: (result: any) => {
      if (result.deleteRoles.ok) {
        navigate(`${routes.rolesSetting}/add-roles`);
        outPopup();
      }
    },
    refetchQueries: [
      { query: HAS_ROLES, variables: { userEmail: me?.email } },
      { query: SEE_ROLES_QUERY, variables: { userEmail: me?.email, id } },
    ],
  });

  const onClickDeleteAndCreateRoles = () => {
    deleteRoles({
      variables: {
        userEmail: me?.email,
        id,
      },
    });
  };

  const onClickBasicRoles = () => {
    navigate(`${routes.roles}/${id}/create`);
    outPopup();
  };

  const onClickCencelBtn = () => {
    outPopup();
  };

  if (loading) {
    return <Loading page="btnPopupPage" />;
  }

  return (
    <BtnPopupContainer>
      <Container>
        <Layout>
          <Btn onClick={onClickDeleteAndCreateRoles}>새로운 1인 1역 만들기</Btn>
          <Contents>
            기존 1인 1역을 삭제한 후, 1인 1역을 처음부터 만듭니다. <br />
            학생들이 어떤 역할을 했는지에 대한 기록이 사라집니다.
          </Contents>
        </Layout>
        <Layout>
          <Btn onClick={onClickBasicRoles}>기존 템플릿으로 새로운 1인 1역 만들기</Btn>
          <Contents>
            기존 템플릿을 복사하여 새로운 1인 1역을 만듭니다. <br />
            학생들이 어던 역할을 했는지에 대한 기록이 누적됩니다.
          </Contents>
        </Layout>
        <CancelBtn onClick={onClickCencelBtn}>돌아가기</CancelBtn>
      </Container>
    </BtnPopupContainer>
  );
};

export default CreateNewRoles;
