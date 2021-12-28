import { useState } from "react";
import styled from 'styled-components';

const BtnStartCountDown = (props) => {
  return (
    <div>
      <button onClick={props.start}>{props.text}</button>
    </div>
  )
};

export default BtnStartCountDown;