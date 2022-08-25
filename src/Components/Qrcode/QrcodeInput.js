import React, { useState } from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";
import { BtnFadeIn } from "../../Animations/Fade";
import { useForm } from "react-hook-form";
import QRCode from "qrcode";

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
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.25em;
  font-size: 1.25rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`;

const LineBox = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;

const Eles = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isEdit ? "auto auto" : "auto")};
  column-gap: 20px;
  column-gap: 1.25rem;
  align-self: flex-end;
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
  animation: ${BtnFadeIn} 0.6s ease;
`;

const QrcodeInput = ({ setMode, setUrl, url, setImageUrl }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(url);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickInput = () => {
    setIsEdit(true);
  };
  const onSubmit = (data) => {
    const { url } = data;
    setUrl(url);
    // 이 아래부터 실행이 안 됨, 바깥으로 url 값이 전달이 안 됨
    setIsEdit(false);
    setMode("result");
    generateQrCode();
  };

  return (
    <TopContents>
      <Url onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("urllink", {
            required: true,
            onChange: () => setIsEdit(true),
          })}
          type="url"
          placeholder="(예) https://www.teachercan.com"
          autoComplete="off"
          onClick={onClickInput}
        />
        <LineBox>
          <Line />
        </LineBox>
      </Url>
      {/* 엔터치면 onSubmit실행되는데 버튼 누르는 걸로는 안 됨. */}
      <Eles isEdit={isEdit}>{isEdit && <SubmitInput type="submit" value="QR생성" />}</Eles>
    </TopContents>
  );
};
export default QrcodeInput;
