import React, { useEffect, useState } from "react";
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

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  text-align: center;
  cursor: pointer;
`;

// url-, title-, bgColor-, type-, onwer-, tag-, createAt-, contents-

const CreateYouTube = ({ multiply, userEmail, setErrMsg }) => {
  const [bgColor, setBgColor] = useState(undefined);
  const { register, watch, getValues, setValue, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { url, email, type, title, contents, tag } = data;
    if (!url) {
      setErrMsg("유튜브 주소를 입력하세요.😢");
      return;
    }
    if (!userEmail && !email) {
      setErrMsg("로그인을 하지 않았습니다. 닉네임을 입력하세요.😢");
      return;
    }
    if (!type) {
      setErrMsg("유튜브 영상의 종류를 입력하세요.😢");
      return;
    }
    if (!title) {
      setErrMsg("제목을 입력하세요.😢");
      return;
    }
    if (!bgColor) {
      setErrMsg("테마 색깔을 선탁하세요.😢");
      return;
    }
  };

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
        <SubmitInput type="submit" value="생성하기" />
      </FormContainer>
    </MainContentsLayout>
  );
};

export default CreateYouTube;
