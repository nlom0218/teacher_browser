import React from 'react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { stopMusicFn } from '../../../audio/BackgroundMusic/BackgroundMusic';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const Text = styled.div`
  color: ${props => props.theme.bgColor};
  font-size: 1.25em;
  font-size: 1.25rem;
  text-align: center;
  line-height: 160%;
`

const Btn = styled.div`
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  text-align: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const FinishCountdonw = ({ alremMp3 }) => {

  const onClickBtn = () => {
    if (alremMp3) {
      stopMusicFn(alremMp3)
    }
    outPopup()
  }

  return (<BtnPopupContainer preventOutPoup={true}>
    <Container>
      <Text>카운트 다운이 종료되었습니다. 😀</Text>
      <Btn onClick={onClickBtn}>확인</Btn>
    </Container>
  </BtnPopupContainer>);
}

export default FinishCountdonw;