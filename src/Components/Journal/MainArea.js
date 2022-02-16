import React from "react";
import styled from "styled-components";
import InputArea from "./Sub-Area/InputArea";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import StudentInItem from "../List/StudentInItem"
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";

const Container = styled.div`
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
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

//
const MainArea = ({ me, students, loading, error, sort, setSort, listId }) => {

  if (loading) return <Loading page="subPage" />;
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
        {students?.length !== 0 && students?.map((item, index) => {
          return <StudentInItem key={index} item={item} listId={listId} page="journal" />
        })}
        {/* {students.map((student, index) => {
          if (student._id === focusStudent) return <InputArea key={index} me={me} student={student} opened={true}></InputArea>;

          return <InputArea key={index} me={me} student={student}></InputArea>;
        })} */}
      </StudentList>
    </Container>
  );
};

export default MainArea;
