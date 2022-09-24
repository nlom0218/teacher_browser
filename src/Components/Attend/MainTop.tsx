import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
  padding-bottom: 0px;
  padding-bottom: 0rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  align-self: flex-start;
  ${customMedia.greaterThan("tablet")`
    font-size: 2em;
    font-size: 2rem;
  `}
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  ${customMedia.greaterThan("tablet")`
    grid-row: 1 / 2;
  `}
  .calendar_btn {
    cursor: pointer;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: color 1s ease, background-color 1s ease;
  }
`;

const TodayBtn = styled.div`
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
`;

const MoveBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const MainTop = () => {
  return (
    <Layout>
      <Title>2022년 09월</Title>
      <BtnContainer>
        <TodayBtn className="calendar_btn">TODAY</TodayBtn>
        <MoveBtn className="calendar_btn">
          <IoIosArrowBack />
        </MoveBtn>
        <MoveBtn className="calendar_btn">
          <IoIosArrowForward />
        </MoveBtn>
      </BtnContainer>
    </Layout>
  );
};

export default MainTop;
