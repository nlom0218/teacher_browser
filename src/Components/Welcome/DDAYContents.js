import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { TOGGLE_IS_MOVE_DDAY_MTUATION } from "../../Graphql/User/mutation";
import { ME_QUERY } from "../../Hooks/useMe";

const Container = styled.div`
  text-align: center;
  display: grid;
  letter-spacing: 5px;
  letter-spacing: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const RegisterDDay = styled.div`
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

const DDayLayout = styled.div`
  justify-self: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  :hover {
    background-color: ${(props) => props.theme.cardBg};
    border-radius: 10px;
    border-radius: 0.625rem;
    transition: background-color 0.4s ease;
  }
`;

const DDay = styled.div`
  font-size: 5em;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 0px;
  letter-spacing: 0rem;
`;

const DDAYName = styled.div`
  font-weight: 600;
`;

const DDayDate = styled.div`
  font-weight: 600;
`;

const DDayContents = ({ dDay, isMoveDDay, userEmail }) => {
  const [index, setIndex] = useState(0);

  const [toggleIsMoveDDay, { loading }] = useMutation(
    TOGGLE_IS_MOVE_DDAY_MTUATION,
    { refetchQueries: [{ query: ME_QUERY }] }
  );

  const onClickToggleBtn = () => {
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

  const processDDay = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      const now = new window.Date().setHours(0, 0, 0, 0);
      const setDay = new Date(dDay[index].date).getTime();
      let DDAY;
      if (now > setDay) {
        // 이미 지난 D-Day
        DDAY = `D + ${Math.floor((now - setDay) / (1000 * 60 * 60 * 24))}`;
      } else if (now < setDay) {
        // 다가오는 D-Day
        DDAY = `D - ${Math.floor((setDay - now) / (1000 * 60 * 60 * 24))}`;
      } else if (now === setDay) {
        // 오늘
        DDAY = "D-DAY";
      }
      return DDAY;
    }
  };

  const processDDayName = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      return dDay[index].title;
    }
  };

  const processDDayDate = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      return format(dDay[index].date, "yyyy년 MM월 dd일");
    }
  };

  const onClickDot = (i) => {
    setIndex(i);
  };

  const onClickRegister = () => {
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
        <RegisterDDay onClick={onClickRegister}>
          등록된 D-DAY가 없습니다.
          <br />
          D-DAY 등록하기
        </RegisterDDay>
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
      <DDayLayout>
        <DDay>{processDDay(index)}</DDay>
        <DDAYName>{processDDayName(index)}</DDAYName>
        <DDayDate>{processDDayDate(index)}</DDayDate>
      </DDayLayout>
    </Container>
  );
};

export default DDayContents;
