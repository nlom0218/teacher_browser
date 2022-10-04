import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { isPopupVar } from "../apollo";
import MainBottom from "../Components/Attend/MainBottom";
import MainTop from "../Components/Attend/MainTop";
import EditAttend from "../Components/Attend/Popup/EditAttend";
import GettingReady from "../Components/Attend/Popup/GettingReady";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import useMe from "../Hooks/useMe";
import useMedia from "../Hooks/useMedia";
import useTitle from "../Hooks/useTitle";
import { customMedia } from "../styles";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
  .main_bottom {
    position: relative;
    margin: 20px;
    margin: 1.25rem;
    margin-top: 0px;
    margin-top: 0rem;
    ${customMedia.greaterThan("tablet")`
    margin-top: 20px;
    margin-top: 1.25rem;
  `}
  }
`;

const MobileMsg = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Attend = () => {
  const titleUpdataer = useTitle("티처캔 | 출석부");
  const media = useMedia();
  const me = useMe();
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
  const [date, setDate] = useState(new Date());

  // 출결종류, 이름별로 볼 수 있도록 하는 것들
  const [attendType, setAttendType] = useState<string[]>([]);
  const [seletedType, setSeletedType] = useState("전체보기");
  const [nameType, setNameType] = useState<string[]>([]);
  const [seletedName, setSletedName] = useState("전체보기");

  const isPopup = useReactiveVar(isPopupVar);
  return (
    <BasicContainer>
      {media === "Mobile" ? (
        <MobileMsg>출결 페이지는 데스크탑 환경에 최적화 되어있습니다.😀</MobileMsg>
      ) : (
        <Container>
          <MainTop
            date={date}
            setDate={setDate}
            attendType={attendType}
            nameType={nameType}
            seletedType={seletedType}
            setSeletedType={setSeletedType}
            seletedName={seletedName}
            setSletedName={setSletedName}
          />
          <div className="main_bottom">
            <MainBottom
              date={date}
              email={me?.email}
              setAttendType={setAttendType}
              setNameType={setNameType}
              seletedType={seletedType}
              seletedName={seletedName}
            />
          </div>
        </Container>
      )}
      {isPopup === "eidtAttend" && <EditAttend setErrMsg={setErrMsg} userEmail={me?.email} setMsg={setMsg} />}
      {isPopup === "gettingReady" && <GettingReady />}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
    </BasicContainer>
  );
};

export default Attend;
