import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import SeeSelectedStudentItem from "./SeeSelectedStudentItem";

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-columns: repeat(2, 1fr);
  ${customMedia.greaterThan("desktop")`
    grid-template-columns : ${(props) => (props.pickNum === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)")};  
  `}
`;

const SeeSelectedStudent = ({ selectedStudent, pickNum, pickType, fontSizeAll, exclude, setSelectedStudent }) => {
  const [pickStudent, setPickStudent] = useState([]);
  useEffect(() => {
    const newSelectedStudent = [];
    for (let i = 0; i < pickNum; i++) {
      newSelectedStudent.push(selectedStudent[i]);
    }
    setPickStudent(newSelectedStudent);
  }, []);

  useEffect(() => {
    if (exclude && pickStudent.length !== 0) {
      const newSelectedStudent = selectedStudent.filter((item) => !pickStudent.includes(item));
      setSelectedStudent(newSelectedStudent);
    }
  }, [pickStudent]);

  return (
    <Container pickNum={pickNum}>
      {pickStudent.map((item, index) => {
        return (
          <SeeSelectedStudentItem
            key={index}
            fontSize={fontSizeAll}
            pickType={pickType}
            item={item}
            pickNum={pickNum}
          />
        );
      })}
    </Container>
  );
};

export default SeeSelectedStudent;
