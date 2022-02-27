import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { processSetDay, processStudentIcon } from '../../shared';
import { color } from '../../styles';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const StudentInfo = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`

const StudnetIcon = styled.div`
  svg {
    display: flex;
  }
`

const StudentName = styled.div`
  font-weight: ${props => props.page === "journal" && 600};
`

const StudentNumber = styled.div`
  opacity: 0.6;
`

const StudentJournal = styled.div`
  cursor: pointer;
  textarea {
    all: unset;
    background-color: ${props => props.page === "journal" ? props.theme.yelloColor : color.blurYelloColor};
    transition: background-color 1s ease;
    box-shadow: ${color.boxShadow};
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    /* background-color: ${props => props.theme.originBgColor}; */
    line-height: 160%;
  }
`

const JournalSectionItem = ({ item, page }) => {
  const { data, loading } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId: item.ownerId
    },
    skip: !item
  })

  const onClickStudentInfo = () => {
    inPopup("moveToStudentPage")
    localStorage.setItem("summaryStudentId", item.ownerId)
  }

  const onClickStudentJournal = () => {
    inPopup("editJournal")
    localStorage.setItem("JournalId", item._id)
    localStorage.setItem("JournalStudentName", data?.seeAllStudent[0]?.studentName)
  }

  return (<Container>
    <StudentInfo onClick={onClickStudentInfo}>
      {data?.seeAllStudent[0]?.icon && <StudnetIcon>{processStudentIcon(data?.seeAllStudent[0]?.icon)}</StudnetIcon>}
      <StudentName page={page}>{page === "journal" ? `${format(item.date, "yy-MM-dd")} ${processSetDay(new window.Date(item.date))}요일` : data?.seeAllStudent[0]?.studentName}</StudentName>
      {data?.seeAllStudent[0]?.studentNumber && <StudentNumber>{data?.seeAllStudent[0]?.studentNumber}번</StudentNumber>}
    </StudentInfo>
    <StudentJournal onClick={onClickStudentJournal} page={page}>
      <TextareaAutosize
        value={item.text}
        minRows={5}
        maxRows={5}
      />
    </StudentJournal>
  </Container>);
}

export default JournalSectionItem;