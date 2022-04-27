import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";

const Container = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Text = styled.div`
  font-weight: 600;
`;

const Btn = styled.div`
  text-align: center;
  padding: 10px 0px;
  padding: 0.625rem;
  /* background-color: #f38180;
  color: #ffffff; */
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
`;

const FinishCreated = ({ setFinish, setCreateId, createId }) => {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate(`${routes.familyMonth}/list/${createId}`);
  };
  const onClickReset = () => {
    window.location.reload();
    setFinish(false);
    setCreateId(undefined);
  };
  return (
    <Container>
      <Text>가정의 달 이야기가 만들어졌습니다.🥳</Text>
      <Btn onClick={onClickDetail}>이야기 확인하기</Btn>
      <Btn onClick={onClickReset}>다른 이야기 만들기</Btn>
    </Container>
  );
};

export default FinishCreated;
