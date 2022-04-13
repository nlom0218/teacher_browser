import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  letter-spacing: 5px;
  letter-spacing: 0.3125rem;
`;

const DDayCount = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80px;
  width: 5rem;
  margin: 0 auto;
`;

const CountDot = styled.div`
  background-color: ${(props) => props.theme.fontColor};
  width: 10px;
  width: 0.625rem;
  height: 10px;
  height: 0.625rem;
  border-radius: 50%;
  opacity: ${(props) => (props.index ? "1" : "0.4")};
  cursor: pointer;
`;

const DDayLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const DDay = styled.div`
  font-size: 5em;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 0px;
`;

const DDAYName = styled.div`
  font-weight: 600;
`;

const DDayDate = styled.div`
  font-weight: 600;
`;

const dDay = [
  { title: "어제", date: 1649689200000 },
  { title: "오늘", date: 1649775600000 },
  { title: "내일", date: 1649862000000 },
  { title: "일주일 후", date: 1650380400000 },
  { title: "여름방학", date: 1658329200000 },
];

const DDayContents = () => {
  const [index, setIndex] = useState(0);
  const processDDay = (index) => {
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
  };

  const processDDayName = (index) => {
    return dDay[index].title;
  };

  const processDDayDate = (index) => {
    return format(dDay[index].date, "yyyy년 MM월 dd일");
  };

  const onClickDot = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    const length = dDay.length;
    // 0 ~ length - 1
    if (length === 1) {
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
  }, [index]);

  return (
    <Container>
      {dDay.length !== 1 && (
        <DDayCount column={dDay.length}>
          {dDay.map((item, i) => {
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
