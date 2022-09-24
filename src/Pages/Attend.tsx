import styled from "styled-components";
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
      </Container>
    </BasicContainer>
  );
};

export default Attend;
