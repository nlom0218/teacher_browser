import React from "react";
import MainContentsLayout from "./MainContentsLayout";
import YouTubeInput from "./YouTubeInput";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const FormContainer = styled.form`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const CreateYouTube = ({ multiply }) => {
  const { register, watch, getValues } = useForm({
    mode: "onChange",
  });
  return (
    <MainContentsLayout>
      <FormContainer>
        <YouTubeInput
          register={register}
          multiply={multiply}
          watch={watch}
          getValues={getValues}
        />
        sdfsdf
      </FormContainer>
    </MainContentsLayout>
  );
};

export default CreateYouTube;
