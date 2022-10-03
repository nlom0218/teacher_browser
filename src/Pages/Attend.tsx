import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { isPopupVar } from "../apollo";
import MainBottom from "../Components/Attend/MainBottom";
import MainTop from "../Components/Attend/MainTop";
import EditAttend from "../Components/Attend/Popup/EditAttend";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import useMe from "../Hooks/useMe";
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

const Attend = () => {
  const titleUpdataer = useTitle("티처캔 | 출석부");
  const me = useMe();
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const isPopup = useReactiveVar(isPopupVar);
  return (
    <BasicContainer>
      <Container>
        <MainTop date={date} setDate={setDate} />
        <div className="main_bottom">
          <MainBottom date={date} />
        </div>
      </Container>
      {isPopup === "eidtAttend" && <EditAttend setErrMsg={setErrMsg} userEmail={me?.email} setMsg={setMsg} />}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
    </BasicContainer>
  );
};

export default Attend;
