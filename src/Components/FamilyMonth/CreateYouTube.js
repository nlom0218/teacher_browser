import React, { useEffect } from "react";
import MainContentsLayout from "./MainContentsLayout";
import YouTubeInput from "./YouTubeInput";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import BasicInfoInput from "./BasicInfoInput";

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

// url, title, bgColor, type, onwer, tag, createAt

const CreateYouTube = ({ multiply, userEmail }) => {
  const { register, watch, getValues, setValue } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    setValue("email", userEmail);
  }, [userEmail]);
  return (
    <MainContentsLayout>
      <FormContainer>
        <YouTubeInput
          register={register}
          multiply={multiply}
          watch={watch}
          getValues={getValues}
        />
        <BasicInfoInput register={register} userEmail={userEmail} />
      </FormContainer>
    </MainContentsLayout>
  );
};

export default CreateYouTube;
