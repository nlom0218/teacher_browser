import React from "react";
import styled from "styled-components";
import QrcodeInput from "./QrcodeInput"; // url 주소 입력창
//url이동
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
import QrcodeMain from "../../icons/Qrcod/QrcodeMain";
import { inPopup, isPopupVar } from "../../apollo";
import NeedLoginPopupContainer from "../../Components/Shared/NeedLoginPopupContainer";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 1fr 10fr;
`;
const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px 40px 10px 40px;
  padding: 2.5rem 2.5rem 0.625rem 2.5rem;
  font-size: 1.875em;
  font-size: 1.875rem;
`;
const Icon = styled.div`
  width: 100px;
  height: 100px;
`;
const Head = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Main = styled.div`
  display: grid;
  width: 80%;
  align-items: center;
  justify-self: center;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
`;
const IN = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  margin-right: 40px;
  margin-right: 2.5rem;
  width: 150px;
  height: 40px;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: right;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const Qrcodemake = ({ me, isWindowPopup }) => {
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);

  const onClickMyStorage = () => {
    if (!me) return inPopup("needLogin");

    if (isWindowPopup) {
      navigate(`${routes.qrcodeStorage}/popup`);
    } else {
      navigate(routes.qrcodeStorage);
    }
  };

  return (
    <Container>
      <Title>QR코드 생성 도우미</Title>
      <Btn onClick={onClickMyStorage}>QR코드 보관함</Btn>
      <Main>
        <IN>
          <Icon>
            <QrcodeMain />
          </Icon>
          <Head>URL 주소 입력 </Head>
          <QrcodeInput isWindowPopup={isWindowPopup} />
          <div>URL 주소를 입력하면 QR코드가 생성됩니다. 바르게 입력해주세요. </div>
        </IN>
      </Main>
      {/* 로그인 안내 */}
      {isPopup === "needLogin" && (
        <NeedLoginPopupContainer isWindowPopup={isWindowPopup} redirectURL={`${routes.qrcode}/popup`} />
      )}
    </Container>
  );
};

export default Qrcodemake;
