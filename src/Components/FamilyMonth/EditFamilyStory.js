import React, { useEffect, useState } from "react";
import MainContentsLayout from "./MainContentsLayout";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { SEE_FAMILY_STORY_QERUY } from "../../Graphql/FamilyStory/query";
import routes from "../../routes";
import { FormContainer } from "./CreateYouTube";
import { useForm } from "react-hook-form";
import YouTubeInput from "./YouTubeInput";
import BasicInfoInput from "./BasicInfoInput";

const EditFamilyStory = ({ userEmail, setErrMsg, multiply }) => {
  const [bgColor, setBgColor] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(SEE_FAMILY_STORY_QERUY, {
    variables: {
      id,
    },
  });
  console.log(data);

  const { register, watch, getValues, setValue } = useForm({
    mode: "onChange",
  });

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
      setValue("tag", data?.seeFamilyStory?.tag.join(", "));
      setBgColor(data?.seeFamilyStory?.bgColor);
    }
  }, [data]);
  return (
    <MainContentsLayout>
      <FormContainer>
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
      </FormContainer>
    </MainContentsLayout>
  );
};

export default EditFamilyStory;
