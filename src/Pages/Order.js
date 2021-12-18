import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
//import StudentList from '../Components/Shared/OrderShared';

const Title = styled.div`
  width: 100%;
  display: grid;
  row-gap: 2rem;
  font-size: 2em;
  text-align: center;
  font-style: normal;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 2px;
  transition: 0.1s;
  float: 10px;
  color: black;
  background-color: skyblue;
  &:active {
    margin-left: 15px;
    margin-right: 3px;
    margin-top: 15px;
    margin-bottom: 3px;
    box-shadow: none;
  }
`;

const Container = styled.form`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  div {
    grid-column: 1 / -1;
    font-weight: 600;
  }
`;

const Order = () => {
  const StuList = [
    { id: 1, name: "빨강" },
    { id: 2, name: "주황" },
    { id: 3, name: "노랑" },
    { id: 4, name: "초록" },
    { id: 5, name: "파랑" },
  ];

  const [counter, setCounter] = useState(1);
  const [pick, setPick] = useState(undefined);

  const NewOrderBtn = (props) => {
    setCounter((prev) => prev + 1);
    let i = Math.floor(Math.random() * 4) + 1;
    const newPick = `${counter} 번째 순서 : ${i}번-${StuList[i].name}`;
    setPick(newPick);
  };
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Title>
          순서 정하기<p></p>
        </Title>

        {StuList.map((item) => (
          <li>{item.name}</li>
        ))}

        <div className="OrderName">
          <Button onClick={NewOrderBtn} className="OrderName">
            한 명씩{" "}
          </Button>
          <Button onClick={NewOrderBtn} className="OrderName">
            한 번에{" "}
          </Button>
          {pick && pick}
        </div>
      </Container>
    </BasicContainer>
  );
};

export default Order;

// <input onChange={ (e)=>{ 입력값변경(e.target.value) } />
//
