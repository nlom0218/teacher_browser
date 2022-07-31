import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Container = styled.div`
  grid-column: 1 / -1;
  min-height: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-columns: ${(props) => (props.pickNum > 2 ? "repeat(3, 1fr)" : "repeat(1, 1fr)")};
  ${customMedia.greaterThan("desktop")`
    grid-template-columns : ${(props) => (props.pickNum === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)")};  
  `}
`;

const SeeSelectedStudent = ({ selectedStudent, pickNum, pickType, fontSizeAll }) => {
  const [pickStudent, setPickStudent] = useState([]);
  useEffect(() => {
    const newSelectedStudent = [];
    for (let i = 0; i < pickNum; i++) {
      newSelectedStudent.push(selectedStudent[i]);
    }
    setPickStudent(newSelectedStudent);
  }, []);
  return (
    <Container pickNum={pickNum}>
      {pickStudent.map((item, index) => {
        return <div key={index} fontSize={fontSizeAll} pickType={pickType} item={item} pickNum={pickNum} div />;
      })}
    </Container>
  );
};

export default SeeSelectedStudent;
