import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import useTitle from '../Hooks/useTitle';

const TimerSecond = () => {
  const titleUpdataer = useTitle("티처캔 | 타이머")
  return (
    <BasicContainer menuItem={true} screen="small">

    </BasicContainer>
  );
}

export default TimerSecond;