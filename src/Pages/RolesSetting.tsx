import styled from "styled-components";
import RolesGraph from "../Components/Roles/RolesGraph";
import BasicContainer from "../Components/Shared/BasicContainer";

const Container = styled.div`
  min-height: 100%;
  padding: 40px;
  padding: 2.5rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
`;

const BtnConatiner = styled.div`
  display: grid;
  align-items: center;
  column-gap: 20px;
  grid-template-columns: repeat(3, auto) 1fr;
  .line-btn {
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
  }

  .save-btn {
    justify-self: flex-end;
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.bgColor};
  }

  div {
    transition: background-color 1s ease, color 1s ease;
    padding: 5px 20px;
    padding: 0.3125rem 1.25em;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

const RolesSetting = () => {
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
        <BtnConatiner>
          <div className="line-btn">줄 추가</div>
          <div className="line-btn">줄 삭제</div>
          <span>1인 1역 역할을 작성후 저장해 주세요.</span>
          <div className="save-btn">저장</div>
        </BtnConatiner>
        <RolesGraph />
      </Container>
    </BasicContainer>
  );
};

export default RolesSetting;
