import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_SCHEDULE_QUERY } from '../../Graphql/Schedule/query';
import IcCalender from '../../icons/Calender/IcCalender';
import Loading from '../Shared/Loading';
import ScheduleSectionItem from './ScheduleSectionItem';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionList from './styled/SectionList';
import SectionNoDateText from './styled/SectionNoDateText';
import SectionTitle from './styled/SectionTitle';

const PlusScheduleBtn = styled.div`
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

const ScheduleSection = ({ urlDate, refetchQuery }) => {
  const { data, loading, refetch } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      date: parseInt(urlDate)
    }
  })

  const onClickPlusBtn = () => {
    inPopup("addSchedule")
  }

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  return (<SectionContainer>
    <SectionTitle>
      <div><IcCalender /></div>
      <div>일정</div>
      <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn>
    </SectionTitle>
    <SectionContents>
      {loading ? <Loading page="subPage" />
        :
        data?.seeSchedule.length === 0 ? <SectionNoDateText>생성된 일정이 없습니다. 😁</SectionNoDateText>
          :
          <SectionList>
            {data?.seeSchedule?.map((item, index) => {
              return <ScheduleSectionItem key={index} item={item} />
            })}
          </SectionList>
      }
    </SectionContents>
  </SectionContainer>);
}

export default ScheduleSection;