import getYouTubeID from "get-youtube-id";
import React, { useEffect } from "react";
import styled from "styled-components";
import DetailYouTubeContents from "./DetailYouTubeContents";
import MainContentsLayout from "./MainContentsLayout";
import { useQuery, useReactiveVar } from "@apollo/client";
import { SEE_FAMILY_STORY_QERUY } from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { inPopup, isPopupVar } from "../../apollo";
import DeleteFamilyStory from "./Popup/DeleteFamilyStory";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes";

const YouTubePlayer = styled.div`
  width: 100%;
  justify-self: center;
  height: calc(${(props) => props.multiply} * 9vw);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const BtnContainer = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Btn = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`;

const DeleteMsg = styled.div`
  text-align: center;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
`;

const DeleteMsgBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const DetailYouTube = ({ id, multiply, userEmail, setErrMsg, setMsg }) => {
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);
  const { data, loading } = useQuery(SEE_FAMILY_STORY_QERUY, {
    variables: { id },
  });

  const onClickEditBtn = () => {
    navigate(`${routes.familyMonth}/edit/${id}`);
  };

  const onClickDelBtn = () => {
    inPopup("deleteFamilyStory");
  };

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <MainContentsLayout>
      {userEmail === data?.seeFamilyStory?.userEmail && (
        <BtnContainer>
          <Btn onClick={onClickEditBtn}>
            <AiFillEdit />
          </Btn>
          <Btn onClick={onClickDelBtn}>
            <AiFillDelete />
          </Btn>
        </BtnContainer>
      )}
      {data?.seeFamilyStory ? (
        <React.Fragment>
          <YouTubePlayer multiply={multiply}>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeID(data?.seeFamilyStory?.url)}?showinfo=0&enablejsapi=1`}
              width="100%"
              height="100%"
              title={data?.seeFamilyStory?.title}
            ></iframe>
          </YouTubePlayer>
          <DetailYouTubeContents {...data?.seeFamilyStory} loggedInUserEmail={userEmail} setErrMsg={setErrMsg} />
        </React.Fragment>
      ) : (
        <DeleteMsg>
          <div>가정의 달 이야기가 존재하지 않습니다.</div>
          <Link to={routes.familyMonth}>
            <DeleteMsgBtn>가정의 달 메인으로 돌아가기</DeleteMsgBtn>
          </Link>
        </DeleteMsg>
      )}
      {isPopup === "deleteFamilyStory" && (
        <DeleteFamilyStory
          setErrMsg={setErrMsg}
          setMsg={setMsg}
          familyStoryId={data?.seeFamilyStory?._id}
          userEmail={userEmail}
        />
      )}
    </MainContentsLayout>
  );
};

export default DetailYouTube;
