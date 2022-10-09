import React, { useState, useContext } from "react";
import { outPopup } from "../../apollo";
import PopupContainer from "../Shared/PopupContainer";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { QrcodeUrlContext } from "./QrcodeUrlContext";
import { useMutation } from "@apollo/client";
import { CREATE_QRCODE_MUTATION } from "../../Graphql/Qrcode/mutation";
import Loading from "../Shared/Loading";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
import { QRCODES_QUERY } from "../../Graphql/Qrcode/query";
import AlertMessage from "../../Components/Shared/AlertMessage";

const Frame = styled.form`
  display: grid;
  grid-template-rows: repeat(1fr 3);
  height: 200px;
  justify-items: center;
`;
const Name = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  font-weight: 600;
  justify-self: left;
  margin-top: 40px;
  margin-top: 2.5rem;
`;
const InputTitle = styled.input`
  width: 100%;
  font-size: 1.25em;
  font-size: 1.25rem;
  padding: 10px;
  padding: 0.625rem;
  margin: 10px 20px;
  margin: 0.625rem 1.25rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardBg};
`;
const TitleSubmitBtn = styled.input`
  padding: 10px;
  padding: 0.625rem;
  margin: 10px;
  margin: 0.625rem;
  width: 150px;
  height: 40px;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const Qrname = ({ isWindowPopup }) => {
  const navigate = useNavigate();
  const [qrtitle, setQrtitle] = useState(undefined);
  const [msg, setMsg] = useState(undefined);
  const { me, url, setMode } = useContext(QrcodeUrlContext);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { inputTitle } = data;
    setQrtitle(inputTitle);
    createQrcode({
      variables: {
        userEmail: me?.email,
        title: inputTitle,
        url,
      },
    });
  };

  const onCompleted = (result) => {
    const {
      createQrcode: { ok },
    } = result;
    if (ok) {
      setMsg("QR코드가 저장되었습니다. 😀");
      outPopup();
      if (isWindowPopup) navigate(`${routes.qrcodeStorage}/popup`);
      else navigate(routes.qrcodeStorage);
    }
  };

  const [createQrcode, { loading }] = useMutation(CREATE_QRCODE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: QRCODES_QUERY, variables: { userEmail: me?.email } }],
  });
  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <Frame onSubmit={handleSubmit(onSubmit)}>
        <Name>QR코드 이름</Name>
        <InputTitle
          {...register("inputTitle", {
            required: true,
          })}
          type="text"
          placeholder="(예)티처캔"
          autoComplete="off"
          maxLength="10"
        />
        <TitleSubmitBtn type="submit" value="저장" />
      </Frame>
      <AlertMessage msg={msg} time={3000} setMsg={setMsg} type="success" />
    </PopupContainer>
  );
};

export default Qrname;
