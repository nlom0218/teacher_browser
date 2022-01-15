import React from 'react';
import styled from 'styled-components';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';

const StopBtn = styled.div`
padding:20px 60px;
padding : 1.25rem 3.75rem;
background-color:${props=>props.theme.redColor};
border-radius:5px;
border-radius:0.3125rem;
color : ${props=>props.theme.bgColor};
cursor : pointer;
`

const Shuffling = ({onClickShuffleBtn}) => {

 

return (<BtnPopupContainer>
<StopBtn onClick={()=> onClickShuffleBtn("finish")}>멈추기</StopBtn>
</BtnPopupContainer>)}
export default Shuffling ;



