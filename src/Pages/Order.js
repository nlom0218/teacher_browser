import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
//import StudentList from '../Components/Shared/OrderShared';

const Title = styled.div`
  width: 100%;
  display: grid;
  //row-gap: 100px;
  row-gap: 2rem;  
  font-size: 2em;
  text-align: center;
  font-style : normal:
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
const TextA = styled.textarea`
  font-size: 1em;
  margin: 0; auto;
  text-align: center;
  width:30%;
  height:30% 
  align-self: stretch;
`;

//const result = StuList.map((name,index)=>(<li key={index}>{name}</li>));
//한 번에 나오게 하는 걸 하려는데 map()으로 바로 바꾸는 것이 가능한가?

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
    </BasicContainer>
  );
};

export default Order;
