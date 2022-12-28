import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBaseballOutline } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import { BiMemoryCard } from "react-icons/bi";
import { customMedia } from "../../styles";

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

const TopMenu = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  div {
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.bgColor};
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    text-align: center;
    cursor: pointer;
  }
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: auto auto;
    column-gap: 20px;
    column-gap: 1.25rem;
    font-size: 1em;
    font-size: 1rem;
  `}
`;

const Box = styled.div`
  /* position: relative; */
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Text = styled.div`
  font-family: "Song Myung";
  font-size: 1.5em;
  font-size: 1.5rem;
  text-align: center;
  line-height: 120%;
  ${customMedia.greaterThan("desktop")`
    font-size: 4em;
    font-size: 4rem;
  `}
`;

const Divide = styled.div`
  ${customMedia.greaterThan("desktop")`
    justify-self: stretch;
    height: 3px;
    background-color: gray;
  `}
`;

const CountDown = styled.div``;

const DDay = styled.div`
  font-family: "Black Han San";
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    font-size: 3em;
    font-size: 3rem;
  `}
`;

const BtnContainer = styled.div`
  margin-top: 40px;
  margin-top: 2.5rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(5, 1fr);
    column-gap: 20px;
    column-gap: 1.25rem;
  `}
`;

const Btn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  cursor: pointer;
  svg {
    margin-left: 10px;
    margin-left: 0.625rem;
  }
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
      <TopMenu>
        <div>방명록 남기기</div>
        <div>2032년 OPEN PAGE</div>
      </TopMenu>
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
        <BtnContainer>
          <Btn>
            <div>숫자야구</div>
            <IoBaseballOutline />
          </Btn>
          <Btn>
            <div>2022 추억</div>
            <BiMemoryCard />
          </Btn>
          <Btn>
            <div>사진첩</div>
            <AiOutlinePicture />
          </Btn>
          <Btn>
            <div>학예회</div>
            <BsFillCollectionPlayFill />
          </Btn>
          <Btn>
            <div>졸업영상 및 소감문</div>
            <GiGraduateCap />
          </Btn>
        </BtnContainer>
      </Box>
    </Container>
  );
};

export default Contents;
