// 리액트
import React, { useState } from "react";

// 팝업
import { inPopup } from "../../../apollo";

// 컴포넌트
import styled, { keyframes } from "styled-components";
import Content from "./Content";
import { BsFillCaretDownSquareFill, BsFillCaretUpSquareFill, BsFillPlusSquareFill } from "react-icons/bs";
import { customMedia } from "../../../styles";

const Container = styled.div`
  display: grid;
  align-items: flex-start;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 2fr;
  `}
`;
const LeftContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr;
  `}
`;

const StudentName = styled.div``;
const StudentNumber = styled.div`
  opacity: 0.6;
`;

const RightContainer = styled.div`
  background-color: ${(props) => props.theme.contentBgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
    cursor: pointer;
  }
`;

const BottomAni = keyframes`
from{opacity:0;}
to{opacity:1;}
`;

const Bottom = styled.div`
  animation: ${BottomAni} 1s ease;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const NoMsg = styled.div`
  text-align: center;
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  font-size: 0.875em;
  font-size: 0.875rem;
`;

//
const InputArea = ({ me, student, opened }) => {
  const [isClosed, setIsClosed] = useState(opened ? false : true);

  if (opened) localStorage.removeItem("focusStudent");

  function addText() {
    inPopup("writeJournal");
    localStorage.setItem("selectedStudent", JSON.stringify(student));
  }

  function onClickPlusBtn() {
    inPopup("writeJournal");
    localStorage.setItem("selectedStudent", JSON.stringify({ studentName: student.studentName, studentNumber: student.studentNumber, studentId: student._id }));
  }

  return (
    <Container>
      <LeftContainer>
        <StudentName>{student.studentName}</StudentName>
        {student.studentNumber && <StudentNumber>{student.studentNumber}번</StudentNumber>}
      </LeftContainer>
      <RightContainer>
        <Top>
          <div>{student.journal.length !== 0 ? `${student.journal.length}개의 기록이 있습니다.` : `생성된 기록이 없습니다.`}</div>
          <div onClick={() => onClickPlusBtn()}>
            <BsFillPlusSquareFill />
          </div>
          <div onClick={() => setIsClosed((isClosed) => !isClosed)}>{isClosed ? <BsFillCaretDownSquareFill /> : <BsFillCaretUpSquareFill />}</div>
        </Top>
        {!isClosed && (
          <Bottom>
            {student.journal.length !== 0 ? (
              student.journal.map((journal, index) => <Content key={index} me={me} studentId={student._id} journal={journal} />)
            ) : (
              <NoMsg>우측 상단에 있는 +버튼을 눌러 기록을 추가하세요.</NoMsg>
            )}
          </Bottom>
        )}
      </RightContainer>
    </Container>
  );
};
export default InputArea;
