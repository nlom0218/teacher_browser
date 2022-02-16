import React, { useEffect } from 'react';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionTitle from './styled/SectionTitle';
import { AiOutlinePlus } from "react-icons/ai"
import styled from 'styled-components';
import IcAttendanceClick from '../../icons/Attendance/IcAttendanceClick';
import { inPopup } from '../../apollo';
import { useQuery } from '@apollo/client';
import { SEE_ATTENDANCE_QUERY } from '../../Graphql/Attendance/query';
import Loading from '../Shared/Loading';
import SectionNoDateText from './styled/SectionNoDateText';
import AttendSectionItem from './AttendSectionItem';
import { customMedia } from '../../styles';

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

const AttendList = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 10px;
  padding: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    padding: 20px;
    padding: 1.25rem;
    grid-template-columns: 1fr 1fr;
  `}
`

const AttendSection = ({ urlDate, refetchQuery }) => {

  const { data, loading, refetch } = useQuery(SEE_ATTENDANCE_QUERY, {
    variables: {
      date: parseInt(urlDate)
    }
  })

  const onClickPlusBtn = () => {
    inPopup("addAttend")
  }

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  return (<SectionContainer>
    <SectionTitle>
      <div><IcAttendanceClick /></div>
      <div>출결</div>
      <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn>
    </SectionTitle>
    <SectionContents>
      {loading ? <Loading page="subPage" /> :
        data?.seeAttendance.length === 0 ? <SectionNoDateText>생성된 출결이 없습니다. 😁</SectionNoDateText> :
          <AttendList>
            {data?.seeAttendance.map((item, index) => {
              return <AttendSectionItem key={index} item={item} />
            })}
          </AttendList>
      }
    </SectionContents>
  </SectionContainer>);
}

export default AttendSection;