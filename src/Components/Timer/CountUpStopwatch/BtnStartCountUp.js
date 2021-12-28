import { useState } from "react";
import styled from 'styled-components';

const BtnStartCountUp = (props) => {
  return (
    <div>
      <button onClick={props.start} className='stopwatch-btn'>시작</button>
    </div>
  )
};

export default BtnStartCountUp;