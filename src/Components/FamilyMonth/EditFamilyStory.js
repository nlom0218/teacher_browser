import React, { useEffect, useState } from "react";
import MainContentsLayout from "./MainContentsLayout";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { SEE_FAMILY_STORY_QERUY } from "../../Graphql/FamilyStory/query";
import routes from "../../routes";
import {
  FormContainer,
  SubmitInput,
  SubmitMsg,
  TeacherCanLink,
} from "./CreateYouTube";
import { useForm } from "react-hook-form";
import YouTubeInput from "./YouTubeInput";
import BasicInfoInput from "./BasicInfoInput";
import { EDIT_FAMILY_STORY_MUTATION } from "../../Graphql/FamilyStory/mutation";
import Loading from "../Shared/Loading";

const EditFamilyStory = ({ userEmail, setErrMsg, multiply, setMsg }) => {
  const [bgColor, setBgColor] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(SEE_FAMILY_STORY_QERUY, {
    variables: {
      id,
    },
  });

  const onCompleted = (result) => {
    const {
      editFamilyStory: { ok, error },
    } = result;
    if (ok) {
      navigate(-1);
      setMsg("가정의 달 이야기가 수정되었습니다.😀");
    }
  };

  const [editFamilyStory, { loading: editLoading }] = useMutation(
    EDIT_FAMILY_STORY_MUTATION,
    {
      onCompleted,
      refetchQueries: [{ query: SEE_FAMILY_STORY_QERUY, variables: { id } }],
    }
  );

  const { register, watch, getValues, setValue, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onCLickLink = () => {
    window.open("https://www.instagram.com/teachercan_official/");
  };

  const onSubmit = (data) => {
    const { url, videoType, title, contents, tag } = data;
    if (!url) {
      setErrMsg("유튜브 주소를 입력하세요.😢");
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
    const submitTag = tag.replace(/(\s*)/g, "").split(",");
    const submitTagUnique = [...new Set(submitTag)];

    editFamilyStory({
      variables: {
        editFamilyStoryId: id,
        userEmail,
        url,
        title,
        bgColor,
        videoType,
        contents,
        tag: tag ? submitTagUnique : null,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (userEmail !== data?.seeFamilyStory.userEmail || !userEmail) {
        window.alert("잘못된 접근입니다.🤨");
        navigate(routes.home);
        return;
      }
      setValue("url", data?.seeFamilyStory?.url);
      setValue("videoType", data?.seeFamilyStory?.videoType);
      setValue("title", data?.seeFamilyStory?.title);
      setValue("contents", data?.seeFamilyStory?.contents);
      if (data?.seeFamilyStory?.tag) {
        setValue("tag", data?.seeFamilyStory?.tag.join(", "));
      }
      setBgColor(data?.seeFamilyStory?.bgColor);
    }
  }, [data]);

  if (loading || editLoading) {
    return <Loading page="subPage" />;
  }
  return (
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
        <SubmitInput type="submit" value="수정하기" />
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

export default EditFamilyStory;
