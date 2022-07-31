import React from "react";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { useMutation } from "@apollo/client";
import { DELETE_FAMILY_STORY_MUTATION } from "../../../Graphql/FamilyStory/mutation";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";
import Loading from "../../Shared/Loading";
import {
  SEE_ALL_FAMILY_STORY_QEURY,
  SEE_LIKE_FAMILY_STORY,
  SEE_MY_FAMILY_STORY_QUERY,
} from "../../../Graphql/FamilyStory/query";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  .family_story_btn {
    padding: 10px 0px;
    padding: 0.625rem 0rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    text-align: center;
    cursor: pointer;
  }
`;

const Msg = styled.div`
  text-align: center;
  line-height: 160%;
`;

const DeleteBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const CancelBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const DeleteFamilyStory = ({ familyStoryId, userEmail, setMsg, setErrMsg }) => {
  const navigate = useNavigate();
  const onCompleted = (result) => {
    const {
      deleteFamilyStory: { ok, error },
    } = result;
    if (ok) {
      setMsg("가정의 달 이야기가 삭제되었습니다.😀");
      outPopup();
      navigate(`${routes.familyMonth}/my?page=1`);
    } else {
      setErrMsg("삭제 권한이 없습니다.🥹");
      outPopup();
      navigate(`${routes.familyMonth}/my?page=1`);
    }
  };

  const [deleteFamilyStory, { loading }] = useMutation(DELETE_FAMILY_STORY_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: SEE_MY_FAMILY_STORY_QUERY,
        variables: {
          userEmail,
          page: 1,
        },
      },
      {
        query: SEE_LIKE_FAMILY_STORY,
        variables: {
          userEmail,
          page: 1,
        },
      },
      {
        query: SEE_ALL_FAMILY_STORY_QEURY,
        variables: {
          page: 1,
        },
      },
    ],
  });

  const onClickDelBtn = () => {
    deleteFamilyStory({
      variables: {
        userEmail,
        familyStoryId,
      },
    });
  };

  const onClickCancelBtn = () => {
    outPopup();
  };

  if (loading) {
    return <Loading page="subPage" />;
  }
  return (
    <BtnPopupContainer>
      <Container>
        <Msg>
          삭제된 가정의 달 이야기는 다시 복구될 수 없습니다. <br />
          삭제하시겠습니까?
        </Msg>
        <DeleteBtn onClick={onClickDelBtn} className="family_story_btn">
          삭제하기
        </DeleteBtn>
        <CancelBtn onClick={onClickCancelBtn} className="family_story_btn">
          취소하기
        </CancelBtn>
      </Container>
    </BtnPopupContainer>
  );
};

export default DeleteFamilyStory;
