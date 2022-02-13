import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_SCHEDULE_QUERY } from '../../Graphql/Schedule/query';
import IcCalender from '../../icons/Calender/IcCalender';
import Loading from '../Shared/Loading';
import ScheduleSectionItem from './ScheduleSectionItem';

const SectionContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const Title = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  font-size: 1.25em;
  font-size: 1.25rem;
`

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

const TitleIcon = styled.div`
  svg {
    display: flex;
  }
`

const SectionContents = styled.div`
  background-color : ${props => props.theme.cardBg};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  position: relative;
`

const SectionList = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 20px;
  padding: 1.25rem;
  font-size: 1.2em;
  font-size: 1.2rem;
`

const NoDateText = styled.div`
  justify-self: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-size: 1em;
  font-size: 1rem;
`

const ScheduleSection = ({ urlDate, refetchQuery }) => {
  const { data, loading, refetch } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      date: new Date(parseInt(urlDate))
    }
  })

  const onClickPlusBtn = () => {
    inPopup("addSchedule")
  }

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  return (<SectionContainer>
    <Title>
      <TitleIcon><IcCalender /></TitleIcon>
      <div>일정</div>
      <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn>
    </Title>
    <SectionContents>
      {loading ? <Loading page="subPage" />
        :
        <SectionList>
          {data?.seeSchedule.length === 0 ? <NoDateText>생성된 일정이 없습니다. 😁</NoDateText>
            :
            data?.seeSchedule?.map((item, index) => {
              return <ScheduleSectionItem key={index} item={item} />
            })
          }
        </SectionList>
      }
    </SectionContents>
  </SectionContainer>);
}

export default ScheduleSection;