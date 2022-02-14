import React from 'react';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionTitle from './styled/SectionTitle';
import { AiOutlinePlus } from "react-icons/ai"
import styled from 'styled-components';
import IcAttendanceClick from '../../icons/Attendance/IcAttendanceClick';

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

const AttendSection = () => {

  const onClickPlusBtn = () => {

  }

  return (<SectionContainer>
    <SectionTitle>
      <div><IcAttendanceClick /></div>
      <div>출석</div>
      <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn>
    </SectionTitle>
    <SectionContents>

    </SectionContents>
  </SectionContainer>);
}

export default AttendSection;