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
  font-family: "Song Myung";
  font-size: 4em;
  font-size: 4rem;
  text-align: center;
  line-height: 120%;
`;

const Contents = () => {
  return (
    <Container>
      <Box>
        <div className="emphasis">2022학년도 서원주 6학년 2반 </div>
        <div>우리가 다시 만날 그 날</div>
      </Box>
    </Container>
  );
};

export default Contents;
