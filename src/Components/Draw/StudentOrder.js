import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { TiDelete } from "react-icons/ti";
import SeeSelectedStudent from "./SeeSelectedStudent";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
        grid-template-columns : repeat(4,1fr);
    `}
  ${customMedia.greaterThan("desktop")`
        grid-template-columns : repeat(6,1fr);
        min-height : 100%;
    `}
`;

const Item = styled.div`
  min-height: 120px;
  min-height: 7.5rem;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  transition: border 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
  position: relative;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: ${(props) => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
`;

const RemoveBtn = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
  font-size: 1.75em;
  font-size: 1.75rem;
  opacity: 0.3;
  cursor: pointer;
`;

const Name = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  text-align: center;
  font-size: ${(props) => props.fontSize}em;
  font-size: ${(props) => props.fontSize}rem;
`;

const StudentOrder = ({ selectedStudent, setSelectedStudent, fontSizeAll, isShuffle, pickNum, pickType, exclude }) => {
  const onClickRemoveBtn = (name) => {
    const newSelectedStudent = selectedStudent.filter((item) => item !== name);
    setSelectedStudent(newSelectedStudent);
  };

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
      }, 100);
    } else {
      clearInterval(shuffling);
    }
    return () => clearInterval(shuffling);
  }, [isShuffle]);

  return (
    <Container>
      {isShuffle !== "finish" ? (
        selectedStudent.map((item, index) => {
          return (
            <Item key={item}>
              <Name fontSize={fontSizeAll}>{item}</Name>
              <RemoveBtn onClick={() => onClickRemoveBtn(item)}>
                <TiDelete />
              </RemoveBtn>
            </Item>
          );
        })
      ) : (
        <SeeSelectedStudent
          selectedStudent={selectedStudent}
          pickNum={pickNum}
          pickType={pickType}
          fontSizeAll={fontSizeAll}
          exclude={exclude}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </Container>
  );
};

export default StudentOrder;
