import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  justify-self: flex-end;
`

const TiemSettingContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan('tablet')`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`

const Layout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  div {
    justify-self: flex-end;
    padding: 0px 10px;
    padding: 0rem 0.625rem;
  }
`

const TimeInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  box-sizing: border-box;
  border-radius: 5px;
  border-radius: 0.3125rem;
  border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
  background-color: ${props => props.theme.originBgColor};
`

const SubmitInput = styled.input`
  grid-column: 1 / -1;
  justify-self: flex-end;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.btnBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const TimerSetting = ({ mode, hours, setHours, minutes, setMinutes, seconds, setSeconds }) => {

  const { register, setValue, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onSubmit = (data) => {
    if (mode === "countdown") {
      const { hours, minutes, seconds } = data
      localStorage.setItem("countdownHours", hours)
      localStorage.setItem("countdownMinutes", minutes)
      localStorage.setItem("countdownSeconds", seconds)
      setHours(parseInt(hours))
      setMinutes(parseInt(minutes))
      setSeconds(parseInt(seconds))
      outPopup()
    } else {
      alert("ㅋㅋㅋㄴㄴ")
    }
  }

  useEffect(() => {
    setValue("hours", hours)
    setValue("minutes", minutes)
    setValue("seconds", seconds)
  }, [])

  return (<PopupContainer>
    <Container>
      <Title>{mode === "countdown" ? "카운트 다운 설정" : "카운트 업 설정"}</Title>
      <TiemSettingContainer onSubmit={handleSubmit(onSubmit)}>
        {mode === "countdown" && <React.Fragment>
          <Layout>
            <TimeInput
              {...register("hours", { required: true })}
              type="number"
              min="0"
            />
            <div>시간</div>
          </Layout>
          <Layout>
            <TimeInput
              {...register("minutes", { required: true })}
              type="number"
              min="0"
              max="59"
            />
            <div>분</div>
          </Layout>
          <Layout>
            <TimeInput
              {...register("seconds", { required: true })}
              type="number"
              min="0"
              max="59"
            />
            <div>초</div>
          </Layout>
        </React.Fragment>}
        <SubmitInput type="submit" value="완료" />
      </TiemSettingContainer>
    </Container>
  </PopupContainer>);
}

export default TimerSetting;