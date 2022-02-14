import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { SEE_JOURNAL_QUERY } from '../../Graphql/Journal/query';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import { customMedia } from '../../styles';
import Loading from '../Shared/Loading';
import JournalSectionItem from './JournalSectionItem';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionList from './styled/SectionList';
import SectionNoDateText from './styled/SectionNoDateText';
import SectionTitle from './styled/SectionTitle';

const JournalList = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 10px;
  padding: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    padding: 20px;
    padding: 1.25rem;
  `}
`

const JournalSection = ({ teacherEmail, urlDate }) => {

  const { data, loading } = useQuery(SEE_JOURNAL_QUERY, {
    variables: {
      date: new Date(parseInt(urlDate)),
      teacherEmail
    },
    skip: !teacherEmail
  })

  return (<SectionContainer>
    <SectionTitle>
      <div><IcLunchmenuClick /></div>
      <div>학급일지</div>
      {/* <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn> */}
    </SectionTitle>
    <SectionContents>
      {loading ? <Loading page="subPage" /> :
        data?.seeJournal?.length === 0 ? <SectionNoDateText>생성된 학급일지가 없습니다. 😁</SectionNoDateText> :
          <JournalList>
            {data?.seeJournal?.map((item, index) => {
              return <JournalSectionItem key={index} item={item} />
            })}
          </JournalList>
      }
    </SectionContents>
  </SectionContainer>);
}

export default JournalSection;