import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { SEE_JOURNAL_QUERY } from '../../Graphql/Journal/query';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import Loading from '../Shared/Loading';
import JournalSectionItem from './JournalSectionItem';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionList from './styled/SectionList';
import SectionNoDateText from './styled/SectionNoDateText';
import SectionTitle from './styled/SectionTitle';

const JournalSection = ({ teacherEmail, urlDate }) => {

  const { data, loading } = useQuery(SEE_JOURNAL_QUERY, {
    variables: {
      date: new Date(parseInt(urlDate)),
      teacherEmail
    },
    skip: !teacherEmail
  })
  console.log(data);
  return (<SectionContainer>
    <SectionTitle>
      <div><IcLunchmenuClick /></div>
      <div>학급일지</div>
      {/* <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn> */}
    </SectionTitle>
    <SectionContents>
      {loading ? <Loading page="subPage" /> :
        data?.seeJournal?.length === 0 ? <SectionNoDateText>생성된 학급일지가 없습니다. 😁</SectionNoDateText> :
          <SectionList>
            {data?.seeJournal?.map((item, index) => {
              return <JournalSectionItem key={index} item={item} />
            })}
          </SectionList>
      }
    </SectionContents>
  </SectionContainer>);
}

export default JournalSection;