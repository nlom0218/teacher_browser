import React, { useState } from "react";
import MainContentsLayout from "./MainContentsLayout";
import YouTubeInput from "./YouTubeInput";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import BasicInfoInput from "./BasicInfoInput";
import { useMutation } from "@apollo/client";
import { CREATE_FAMILY_STORY_MUTATION } from "../../Graphql/FamilyStory/mutation";
import Loading from "../Shared/Loading";
import {
  SEE_ALL_FAMILY_STORY_QEURY,
  SEE_MY_FAMILY_STORY_QUERY,
} from "../../Graphql/FamilyStory/query";
import FinishCreated from "./FinishCreated";

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  text-align: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const SubmitMsg = styled.div`
  text-align: center;
  line-height: 120%;
  font-size: 0.875em;
  font-size: 0.875rem;
  display: grid;
  justify-items: center;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const TeacherCanLink = styled.div`
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
  border-radius: 10px;
  border-radius: 0.625rem;
`;

const CreateYouTube = ({ multiply, userEmail, setErrMsg }) => {
  const [finish, setFinish] = useState(false);
  const [createId, setCreateId] = useState(undefined);
  const [bgColor, setBgColor] = useState(undefined);

  const onCompleted = (result) => {
    const {
      createFamilyStory: { ok, id },
    } = result;
    if (ok) {
      setFinish(true);
      setCreateId(id);
    }
  };

  const refectchMyStory = () => {
    if (userEmail) {
      return { query: SEE_MY_FAMILY_STORY_QUERY, variables: { userEmail } };
    }
  };

  const [createFamilyStory, { loading }] = useMutation(
    CREATE_FAMILY_STORY_MUTATION,
    {
      onCompleted,
      refetchQueries: [
        { query: SEE_ALL_FAMILY_STORY_QEURY },
        refectchMyStory(),
      ],
    }
  );

  const { register, watch, getValues, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { url, email, videoType, title, contents, tag } = data;
    if (!url) {
      setErrMsg("유튜브 주소를 입력하세요.😢");
      return;
    }
    if (!userEmail && !email) {
      setErrMsg("로그인을 하지 않았습니다. 닉네임을 입력하세요.😢");
      return;
    }
    if (!videoType) {
      setErrMsg("유튜브 영상의 종류를 입력하세요.😢");
      return;
    }
    if (!title) {
      setErrMsg("제목을 입력하세요.😢");
      return;
    }
    if (!contents) {
      setErrMsg("가정의 달 이야기를 입력하세요.😢");
      return;
    }
    if (!bgColor) {
      setErrMsg("테마 색깔을 선탁하세요.😢");
      return;
    }
    createFamilyStory({
      variables: {
        userEmail: userEmail ? userEmail : email,
        url,
        title,
        bgColor,
        videoType,
        createdAt: new window.Date().getTime(),
        contents,
        ...(tag !== "" && { tag: tag.replace(/(\s*)/g, "").split(",") }),
      },
    });
  };

  const onCLickLink = () => {
    window.open("https://www.instagram.com/teachercan_official/");
  };

  if (loading && !finish) {
    return <Loading page="subPage" />;
  }

  return finish ? (
    <FinishCreated
      createId={createId}
      setFinish={setFinish}
      setCreateId={setCreateId}
    />
  ) : (
    <MainContentsLayout>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <YouTubeInput
          register={register}
          multiply={multiply}
          watch={watch}
          getValues={getValues}
        />
        <BasicInfoInput
          register={register}
          userEmail={userEmail}
          setBgColor={setBgColor}
          bgColor={bgColor}
        />
        <SubmitInput type="submit" value="생성하기" />
      </FormContainer>
      <SubmitMsg>
        <div>
          게시물은 모두에게 공개되며 적절하지 않은 게시물은 예고없이 삭제될 수
          있습니다. <br />
          또한 티처캔 인스타그램에서 콘텐츠로 활용될 수 있습니다.😃
        </div>
        <TeacherCanLink onClick={onCLickLink}>@티처캔</TeacherCanLink>
      </SubmitMsg>
    </MainContentsLayout>
  );
};

export default CreateYouTube;
