import React from 'react';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionTitle from './styled/SectionTitle';

const JournalSection = () => {
  return (<SectionContainer>
    <SectionTitle>
      <div><IcLunchmenuClick /></div>
      <div>학급일지</div>
      {/* <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn> */}
    </SectionTitle>
    <SectionContents>

    </SectionContents>
  </SectionContainer>);
}

export default JournalSection;