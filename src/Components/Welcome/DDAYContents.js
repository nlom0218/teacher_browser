import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import { TOGGLE_IS_MOVE_DDAY_MTUATION } from "../../Graphql/User/mutation";
import { ME_QUERY } from "../../Hooks/useMe";
import DDayLayout from "./DDayLayout";
import RegisterDDay from "./Popup/RegisterDDay";

const Container = styled.div`
  align-self: center;
  text-align: center;
  display: grid;
  letter-spacing: 5px;
  letter-spacing: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const SRegisterDDay = styled.div`
  justify-self: center;
  padding: 20px;
  letter-spacing: 0px;
  letter-spacing: 0rem;
  line-height: 160%;
  border: 1px dashed ${(props) => props.theme.fontColor};
  transition: border 1s ease;
  cursor: pointer;
  font-weight: 600;
  :hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 0.6s ease, color 0.6s ease;
  }
`;

const DDayCount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  width: 7.5rem;
  margin: 0 auto;
`;

const DDayBtn = styled.div`
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const CountDot = styled.div`
  background-color: ${(props) => props.theme.fontColor};
  transition: background-color 1s ease;
  width: 10px;
  width: 0.625rem;
  height: 10px;
  height: 0.625rem;
  border-radius: 50%;
  opacity: ${(props) => (props.index ? "1" : "0.4")};
  cursor: pointer;
`;

const DDayContents = ({ dDay, isMoveDDay, userEmail, setMsg, setErrMsg }) => {
  const isPopup = useReactiveVar(isPopupVar);

  const [index, setIndex] = useState(0);
  const [settingMode, setSettingMode] = useState(false);
  const [hover, setHover] = useState(false);
  const [initMove, setInitMove] = useState();

  const [toggleIsMoveDDay, { loading }] = useMutation(
    TOGGLE_IS_MOVE_DDAY_MTUATION,
    { refetchQueries: [{ query: ME_QUERY }] }
  );

  const initSettingHoverMode = () => {
    setSettingMode(false);
    setHover(false);
  };

  const onClickToggleBtn = () => {
    initSettingHoverMode();
    if (Boolean(isMoveDDay)) {
      toggleIsMoveDDay({
        variables: { userEmail, type: "stop" },
      });
    } else {
      toggleIsMoveDDay({
        variables: { userEmail, type: "start" },
      });
    }
  };

  const onClickDot = (i) => {
    initSettingHoverMode();
    setIndex(i);
  };

  const onClickRegister = () => {
    initSettingHoverMode();
    inPopup("registerDDay");
  };

  useEffect(() => {
    if (!Boolean(isMoveDDay)) {
      return;
    }
    const length = dDay.length;
    // 0 ~ length - 1
    if (length === 1 || length === 0) {
      return;
    } else {
      const timeout = setTimeout(() => {
        const newIndex = index + 1;
        if (index + 1 === length) {
          return setIndex(0);
        } else {
          setIndex(newIndex);
        }
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [index, dDay, isMoveDDay]);

  return (
    <Container>
      {dDay.length === 0 ? (
        <SRegisterDDay onClick={onClickRegister}>
          등록된 D-DAY가 없습니다.
          <br />
          D-DAY 등록하기
        </SRegisterDDay>
      ) : (
        <DDayCount>
          {dDay.length !== 1 && (
            <DDayBtn onClick={onClickToggleBtn}>
              {Boolean(isMoveDDay) ? (
                <AiFillPauseCircle />
              ) : (
                <AiFillPlayCircle />
              )}
            </DDayBtn>
          )}
          {dDay.length !== 5 && (
            <DDayBtn>
              <AiFillPlusCircle onClick={onClickRegister} />
            </DDayBtn>
          )}
          {dDay.length !== 1 &&
            dDay.map((item, i) => {
              return (
                <CountDot
                  key={i}
                  index={i === index}
                  onClick={() => onClickDot(i)}
                ></CountDot>
              );
            })}
        </DDayCount>
      )}
      {dDay.length !== 0 && (
        <DDayLayout
          dDay={dDay}
          index={index}
          setIndex={setIndex}
          toggleIsMoveDDay={toggleIsMoveDDay}
          userEmail={userEmail}
          isMoveDDay={isMoveDDay}
          setSettingMode={setSettingMode}
          settingMode={settingMode}
          setHover={setHover}
          hover={hover}
          setMsg={setMsg}
          setInitMove={setInitMove}
          initMove={initMove}
        />
      )}
      {isPopup === "registerDDay" && (
        <RegisterDDay
          dDay={dDay}
          userEmail={userEmail}
          setErrMsg={setErrMsg}
          setMsg={setMsg}
          toggleIsMoveDDay={toggleIsMoveDDay}
          initMove={initMove}
        />
      )}
    </Container>
  );
};

export default DDayContents;
