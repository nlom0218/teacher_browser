import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 10;
  position: absolute;
  top: 2%;
  bottom: 2%;
  left: 2%;
  right: 2%;
  background-color: #ffffffa8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-radius: 0.625rem;
`;

const Box = styled.div``;

const Text = styled.div`
  font-family: "Song Myung";
  font-size: 4em;
  font-size: 4rem;
  text-align: center;
  line-height: 120%;
`;

const CountDown = styled.div``;

const Contents = () => {
  const meetDay = Number(new Date("2032-12-30"));
  const [today, setToday] = useState(Number(new Date()));

  const diff = meetDay - today;

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);

  useEffect(() => {
    const countDown = setInterval(() => {
      setToday(Number(new Date()));
    }, 1000);
    return () => clearInterval(countDown);
  }, []);
  return (
    <Container>
      <Box>
        <Text>
          <div className="emphasis">2022학년도 서원주 6학년 2반 </div>
          <div>우리가 다시 만날 그 날</div>
        </Text>
        <CountDown>{`${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초`}</CountDown>
      </Box>
    </Container>
  );
};

export default Contents;
