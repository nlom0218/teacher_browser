// 리액트
import React, { useState } from "react";

// 컴포넌트
import styled from "styled-components";
import InputArea from "./Sub-Area/InputArea";

import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";

const Container = styled.div`
  padding: 40px;
  padding: 2.5rem;
  padding-top: 0;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const SortContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const SortBtn = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`;

const StudentList = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

//
const MainArea = ({ me, students, loading, error, sort, setSort }) => {
  const [selectedListId, setSelectedListId] = useState();

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        로그인을 해주세요. <br />
        {error.message}
      </div>
    );

  return (
    <Container>
      <SortContainer>
        <SortBtn onClick={() => setSort("num")}>
          <div>{sort === "num" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
          <div>번호 순</div>
        </SortBtn>
        <SortBtn onClick={() => setSort("name")}>
          <div>{sort === "name" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
          <div>이름 순</div>
        </SortBtn>
        <SortBtn onClick={() => setSort("id")}>
          <div>{sort === "id" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
          <div>생성일 순</div>
        </SortBtn>
      </SortContainer>
      <StudentList>
        {students.map((student, index) => {
          return <InputArea key={index} me={me} student={student}></InputArea>;
        })}
      </StudentList>
    </Container>
  );
};

export default MainArea;
