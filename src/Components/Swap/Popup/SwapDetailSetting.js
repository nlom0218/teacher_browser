import React from 'react';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import DetailPickNum from './DetailPickNum';
import DetailSeatType from './DetailSeatType';
import KeepDistanceGroup from './KeepDistanceGroup';

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
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
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

const SwapDetailSetting = ({ pickNum, setPickNum, setErrMsg, setSeatType, seatType, keepDistanceGroup, setKeepDistanceGroup }) => {
  return (<PopupContainer>
    <Container>
      <Title>자리 설정</Title>
      <SettingType>
        <TypeName>자리 대형</TypeName>
        <SettingLayout>
          <DetailSeatType seatType={seatType} setSeatType={setSeatType} setErrMsg={setErrMsg} setPickNum={setPickNum} setKeepDistanceGroup={setKeepDistanceGroup} />
        </SettingLayout>
      </SettingType>
      <SettingType>
        <TypeName>첫 줄 설정</TypeName>
        <SettingLayout>
          <DetailPickNum seatType={seatType} pickNum={pickNum} setPickNum={setPickNum} />
        </SettingLayout>
      </SettingType>
      {seatType === 2 && <SettingType>
        <TypeName>짝궁 성별</TypeName>
        <SettingLayout>

        </SettingLayout>
      </SettingType>}
      {/* {seatType === 1 && <SettingType>
        <TypeName>거리두기 모둠</TypeName>
        <SettingLayout>
          <KeepDistanceGroup keepDistanceGroup={keepDistanceGroup} setKeepDistanceGroup={setKeepDistanceGroup} setErrMsg={setErrMsg} />
        </SettingLayout>
      </SettingType>} */}
      <SettingType>
        <TypeName>학생 분리</TypeName>
        <SettingLayout>

        </SettingLayout>
      </SettingType>
      <SettingType>
        <TypeName>자리 지정</TypeName>
        <SettingLayout>

        </SettingLayout>
      </SettingType>
    </Container>
  </PopupContainer>);
}

export default SwapDetailSetting;