import React from "react";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns: repeat(4, 1fr);

  `}
  ${customMedia.greaterThan("desktop")`
   grid-template-columns: repeat(6, 1fr);
  `}
`;

const Item = styled.div`
  min-height: 120px;
  min-height: 7.5rem;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
`;
const Order = styled.div`
  font-size: 1.5rem;
  font-size: 1.5em;
`;

const Name = styled.div`
  font-size: 2.0rem;
  font-size: 2.0em;
`;

const StudentOrder = ({ selectedStudent, setSelectedStudent, isShuffle }) => {
  useEffect(() => {
    const shuffledStudent = () => {
      const newSelectedStudent = selectedStudent
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setSelectedStudent(newSelectedStudent);
    };
    let shuffling;
    if (isShuffle === "ing") {
      shuffling = setInterval(() => {
        shuffledStudent();
      }, 150);
    } else {
      clearInterval(shuffling);
    }
    return () => clearInterval(shuffling);
  }, [isShuffle]);

  return (
    <Container>
      {selectedStudent.map((item, index) => {
        return (
          <Item key={item}>
            <Order>{index + 1}</Order>
            <Name>{item}</Name>
          </Item>
        );
      })}
    </Container>
  );
};

export default StudentOrder;
