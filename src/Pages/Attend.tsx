import styled from "styled-components";
import MainBottom from "../Components/Attend/MainBottom";
import MainTop from "../Components/Attend/MainTop";
import BasicContainer from "../Components/Shared/BasicContainer";
import useTitle from "../Hooks/useTitle";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`;

const Attend = () => {
  const titleUpdataer = useTitle("티처캔 | 출석부");
  return (
    <BasicContainer>
      <Container>
        <MainTop />
        <MainBottom />
      </Container>
    </BasicContainer>
  );
};

export default Attend;
