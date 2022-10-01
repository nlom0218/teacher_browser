import styled from "styled-components";
import MainBottom from "../Components/Attend/MainBottom";
import MainTop from "../Components/Attend/MainTop";
import BasicContainer from "../Components/Shared/BasicContainer";
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
  return (
    <BasicContainer>
      <Container>
        <MainTop />
        <div className="main_bottom">
          <MainBottom />
        </div>
      </Container>
    </BasicContainer>
  );
};

export default Attend;
