import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';
import DetailPickNum from './DetailPickNum';
import DetailSeatType from './DetailSeatType';
import MateGender from './MateGender';

const Container = styled.div`
  padding: 20px 0px;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const Title = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
`

const SettingType = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 5fr;
  `}
`

const TypeName = styled.div`
  padding-top: 15px;
  padding-top: 0.9375rem;
  font-weight: 600;
`

const SettingLayout = styled.div`
  background-color: ${props => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
`

const SwapDetailSetting = ({ pickNum, setPickNum, setErrMsg, setSeatType, seatType, mateGender, setMateGender }) => {
  return (<PopupContainer>
    <Container>
      <Title>자리 설정</Title>
      <SettingType>
        <TypeName>자리 대형</TypeName>
        <SettingLayout>
          <DetailSeatType
            seatType={seatType}
            setSeatType={setSeatType}
            setErrMsg={setErrMsg}
            setPickNum={setPickNum}
          />
        </SettingLayout>
      </SettingType>
      <SettingType>
        <TypeName>첫 줄 설정</TypeName>
        <SettingLayout>
          <DetailPickNum
            seatType={seatType}
            pickNum={pickNum}
            setPickNum={setPickNum}
          />
        </SettingLayout>
      </SettingType>
      {seatType === 2 && <SettingType>
        <TypeName>짝궁 성별</TypeName>
        <SettingLayout>
          <MateGender
            mateGender={mateGender}
            setMateGender={setMateGender}
          />
        </SettingLayout>
      </SettingType>}
      {/*
      <SettingType>
        <TypeName>학생 분리</TypeName>
        <SettingLayout>

        </SettingLayout>
      </SettingType>
      <SettingType>
        <TypeName>자리 지정</TypeName>
        <SettingLayout>

        </SettingLayout>
      </SettingType>  */}
    </Container>
  </PopupContainer>);
}

export default SwapDetailSetting;