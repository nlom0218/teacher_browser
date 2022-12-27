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

const Box = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Text = styled.div`
  font-family: "Song Myung";
  font-size: 4em;
  font-size: 4rem;
  text-align: center;
  line-height: 120%;
`;

const Divide = styled.div`
  justify-self: stretch;
  height: 3px;
  background-color: gray;
`;

const CountDown = styled.div``;

const DDay = styled.div`
  font-family: "Black Han San";
  font-size: 3em;
  font-size: 3rem;
  text-align: center;
`;

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
        <Divide></Divide>
        <CountDown>
          <DDay>{`${diffDay}일 ${diffHour < 10 ? `0${diffHour}` : diffHour}시간 ${
            diffMin < 10 ? `0${diffMin}` : diffMin
          }분 ${diffSec < 10 ? `0${diffSec}` : diffSec}초`}</DDay>
        </CountDown>
      </Box>
    </Container>
  );
};

export default Contents;
