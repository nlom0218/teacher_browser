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
  MY_FAMILY_STORY_NUM,
  SEE_ALL_FAMILY_STORY_QEURY,
  SEE_MY_FAMILY_STORY_QUERY,
} from "../../Graphql/FamilyStory/query";
import FinishCreated from "./FinishCreated";

export const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

export const SubmitInput = styled.input`
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

export const SubmitMsg = styled.div`
  text-align: center;
  line-height: 120%;
  font-size: 0.875em;
  font-size: 0.875rem;
  display: grid;
  justify-items: center;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

export const TeacherCanLink = styled.div`
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
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const [createId, setCreateId] = useState(undefined);
  const [bgColor, setBgColor] = useState(undefined);

  const onCompleted = (result) => {
    const {
      createFamilyStory: { ok, id, error },
    } = result;
    if (ok) {
      setFinish(true);
      setCreateId(id);
    } else {
      setErrMsg(error);
    }
    setLoading(false);
  };

  const refectchMyStory = () => {
    if (userEmail) {
      return [
        {
          query: SEE_MY_FAMILY_STORY_QUERY,
          variables: { userEmail, page: 1 },
        },
        { query: MY_FAMILY_STORY_NUM, variables: { userEmail } },
      ];
    } else {
      return [];
    }
  };

  const [createFamilyStory] = useMutation(CREATE_FAMILY_STORY_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ALL_FAMILY_STORY_QEURY, variables: { page: 1 } },
      ...refectchMyStory(),
    ],
  });

  const { register, watch, getValues, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { url, email, videoType, title, contents, tag } = data;
    if (!url) {
      setErrMsg("????????? ????????? ???????????????.????");
      return;
    }
    if (!userEmail && !email) {
      setErrMsg("???????????? ?????? ???????????????. ???????????? ???????????????.????");
      return;
    }
    if (!videoType) {
      setErrMsg("????????? ????????? ????????? ???????????????.????");
      return;
    }
    if (!title) {
      setErrMsg("????????? ???????????????.????");
      return;
    }
    if (!contents) {
      setErrMsg("????????? ??? ???????????? ???????????????.????");
      return;
    }
    if (!bgColor) {
      setErrMsg("?????? ????????? ???????????????.????");
      return;
    }
    const submitTag = tag.replace(/(\s*)/g, "").split(",");
    const submitTagUnique = [...new Set(submitTag)];
    createFamilyStory({
      variables: {
        userEmail: userEmail ? userEmail : email,
        url,
        title,
        bgColor,
        videoType,
        createdAt: new window.Date().getTime(),
        contents,
        ...(tag !== "" && { tag: submitTagUnique }),
      },
    });
    setLoading(true);
  };

  const onCLickLink = () => {
    window.open("https://www.instagram.com/teachercan_official/");
  };

  if (loading) {
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
        <SubmitInput type="submit" value="????????????" />
      </FormContainer>
      <SubmitMsg>
        <div>
          ???????????? ???????????? ???????????? ???????????? ?????? ???????????? ???????????? ????????? ???
          ????????????. <br />
          ?????? ????????? ????????????????????? ???????????? ????????? ??? ????????????.????
        </div>
        <TeacherCanLink onClick={onCLickLink}>@?????????</TeacherCanLink>
      </SubmitMsg>
    </MainContentsLayout>
  );
};

export default CreateYouTube;
