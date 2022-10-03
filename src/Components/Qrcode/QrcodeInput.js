import React, { useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { QrcodeUrlContext } from "./QrcodeUrlContext";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
`;

const Url = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.25em;
  font-size: 1.25rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-bottom: 1px solid;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

//https 확인 절차 필요

const QrcodeInput = () => {
  const { url, setUrl } = useContext(QrcodeUrlContext);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  //입력 데이터를 url값으로 지정하고 결과 화면으로 이동
  const onSubmit = (data) => {
    const { urllink } = data;
    setUrl(urllink);
    navigate(routes.qrcodeResult, { state: { url: urllink } });
  };
  return (
    <TopContents>
      <Url onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("urllink", {
            required: true,
          })}
          type="url"
          placeholder="(예) https://www.teachercan.com"
          autoComplete="off"
        />
        <SubmitInput type="submit" value="QR생성" />
      </Url>
    </TopContents>
  );
};
export default QrcodeInput;
