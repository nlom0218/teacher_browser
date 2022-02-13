import React from 'react';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionTitle from './styled/SectionTitle';

const AttendSection = () => {
  return (<SectionContainer>
    <SectionTitle>
      <div><IcLunchmenuClick /></div>
      <div>출석</div>
      {/* <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn> */}
    </SectionTitle>
    <SectionContents>

    </SectionContents>
  </SectionContainer>);
}

export default AttendSection;