import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_JOURNAL_QUERY } from '../../Graphql/Journal/query';
import JournalSectionItem from '../Calendar/JournalSectionItem';
import Loading from '../Shared/Loading';

const Container = styled.div`
  align-self: flex-start;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  grid-template-rows: auto 1fr;
`

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-end;
`

const JournalNum = styled.div``

const AddBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`

const JournalList = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
`

const NoDateText = styled.div`
  grid-column: 1 / -1;
`

const JournalDetail = ({ studentId, teacherEmail, refetchQuery, studentName }) => {

  const { data, loading, refetch } = useQuery(SEE_JOURNAL_QUERY, {
    variables: {
      studentId,
      teacherEmail
    },
    skip: !teacherEmail
  })

  const onClickPlusBtn = () => {
    inPopup("addJournal")
    localStorage.setItem("JournalStudentName", studentName)
    localStorage.setItem("JournalStudentId", studentId)
  }

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  if (loading) {
    return <Loading page="subPage" />
  }

  return (<Container>
    <TopContents>
      <JournalNum>{data?.seeJournal.length}개의 학급일지</JournalNum>
      <AddBtn onClick={onClickPlusBtn}><AiOutlinePlus /></AddBtn>
    </TopContents>
    <JournalList>
      {data?.seeJournal?.length === 0 ? <NoDateText>생성된 학급일지가 없습니다. 😁</NoDateText> :
        data?.seeJournal?.map((item, index) => {
          return <JournalSectionItem key={index} item={item} page="journal" />
        })}
    </JournalList>
  </Container>);
}

export default JournalDetail;