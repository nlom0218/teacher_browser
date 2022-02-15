import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../../apollo';
import { processStudentIcon } from '../../../shared';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.theme.bgColor};
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.hoverColor};
    transition: background-color 0.6s ease;
  }
`

const StudentIcon = styled.div`
  svg {
    display: flex;
  }
`

const StudentName = styled.div``

const StudentNumber = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  opacity: 0.6;
  font-size: 0.875em;
  font-size: 0.875rem;
`

const AttendSelectedStudentItem = ({ item }) => {
  const selectedStudentType = localStorage.getItem("seletedStudentType")

  const onClickStudent = () => {
    if (selectedStudentType === "journal") {
      inPopup("addJournal")
    } else {
      inPopup("addAttend")
    }
    localStorage.setItem("attendStudentName", item.studentName)
    localStorage.setItem("attendStudentId", item._id)
  }

  if (!item) {
    return <Container></Container>
  }

  return (<Container onClick={onClickStudent}>
    {item?.icon && <StudentIcon>{processStudentIcon(item?.icon)}</StudentIcon>}
    <StudentName>{item.studentName}</StudentName>
    <StudentNumber>{item.studentNumber ? item.studentNumber : "생성된 번호가 없습니다."}</StudentNumber>
  </Container>);
}

export default AttendSelectedStudentItem;