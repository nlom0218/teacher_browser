import { useQuery } from '@apollo/client';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { processStudentIcon } from '../../shared';
import { color } from '../../styles';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  :not(:last-child) {
    padding-bottom: 10px;
    padding-bottom: 0.625rem;
  }
`

const StudentInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
`

const StudnetIcon = styled.div`
  svg {
    display: flex;
  }
`

const StudentName = styled.div``

const StudentNumber = styled.div`
  opacity: 0.6;
`

const StudentJournal = styled.div`
  textarea {
    all: unset;
    background-color: rgba(255, 252, 86, 0.2);
    box-shadow: ${color.boxShadow};
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    /* background-color: ${props => props.theme.originBgColor}; */
    line-height: 160%;
  }
`

const JournalSectionItem = ({ item }) => {
  const { data, loading } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId: item.ownerId
    },
    skip: !item
  })
  console.log(data);
  return (<Container>
    <StudentInfo>
      {data?.seeAllStudent[0]?.icon && <StudnetIcon>{processStudentIcon(data?.seeAllStudent[0]?.icon)}</StudnetIcon>}
      <StudentName>{data?.seeAllStudent[0]?.studentName}</StudentName>
      {data?.seeAllStudent[0]?.studentNumber && <StudentNumber>{data?.seeAllStudent[0]?.studentNumber}번</StudentNumber>}
    </StudentInfo>
    <StudentJournal>
      <TextareaAutosize
        value={item.text}
      />
    </StudentJournal>
  </Container>);
}

export default JournalSectionItem;