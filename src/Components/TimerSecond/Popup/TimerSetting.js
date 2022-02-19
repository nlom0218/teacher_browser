import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { MdAudiotrack } from "react-icons/md"
import { FaPlay, FaStop } from 'react-icons/fa';
import { stopMusicFn, playMusicFn } from "../../../audio/BackgroundMusic/BackgroundMusic"

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

const SelectAudioContainer = styled.div`
  grid-column: 1 / -1;
  grid-template-columns: 1fr auto;
  display: grid;
  row-gap: 10px;
`

const SettingTitle = styled.div`
`

const BgMusicList = styled.div`
  grid-column: 1 / -1;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  background-color: ${props => props.theme.originBgColor};
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(2, 1fr);
  `}
`

const BgMusicItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  cursor: pointer;
`

const Icon = styled.div`
  svg {
    display: flex;
  }
`

const BgMusicName = styled.div`
  font-weight: ${props => props.selected && 600};
`

const PlaySound = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
`

const License = styled.div`
  grid-column: 1 / -1;
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.8;
  cursor: pointer;
`

const TimerSetting = ({ mode, hours, setHours, minutes, setMinutes, seconds, setSeconds, backgroundMusicArr, setErrMsg, setBgMusic, bgMusic }) => {

  const [selectedBgMusic, setSelectedBgMusic] = useState(bgMusic ? bgMusic : undefined)
  const [bgMusicMp3, setBgMusicMp3] = useState(undefined)
  const [playMusic, setPlayMusic] = useState(false)

  const { register, setValue, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onSubmit = (data) => {
    if (playMusic) {
      stopMusicFn(bgMusicMp3, setPlayMusic)
    }
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
    if (selectedBgMusic) {
      setBgMusic(selectedBgMusic)
    } else {
      setBgMusic(undefined)
    }
    outPopup()
  }

  const onClickBgMusic = (name) => {
    if (playMusic) {
      stopMusicFn(bgMusicMp3, setPlayMusic)
    }
    if (!selectedBgMusic) {
      const newBgAudio = backgroundMusicArr.filter(item => item.name === name)[0]
      setBgMusicMp3(new Audio(newBgAudio.audio))
      setSelectedBgMusic(newBgAudio);
      return
    }
    if (name === selectedBgMusic.name) {
      setBgMusicMp3(undefined)
      setSelectedBgMusic(undefined);
    } else {
      const newBgAudio = backgroundMusicArr.filter(item => item.name === name)[0]
      setBgMusicMp3(new Audio(newBgAudio.audio))
      setSelectedBgMusic(newBgAudio);
    }
  }

  const processCheckBgMusic = (name) => {
    if (!selectedBgMusic) {
      return false
    }
    if (name === selectedBgMusic.name) {
      return true
    } else {
      return false
    }
  }

  const onClickPlaySound = () => {
    if (!selectedBgMusic) {
      setErrMsg("선택된 배경음악이 없습니다. 😂")
      return
    }
    if (playMusic) {
      stopMusicFn(bgMusicMp3, setPlayMusic)
    } else {
      playMusicFn(bgMusicMp3, setPlayMusic)
    }
  }

  const onClickLicense = () => {
    window.open("https://www.bensound.com/", "_blank")
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
        <SelectAudioContainer>
          <SettingTitle>배경음악</SettingTitle>
          <PlaySound onClick={onClickPlaySound}>
            <div>미리듣기</div>
            <Icon><MdAudiotrack /></Icon>
            <Icon>{playMusic ? <FaStop /> : <FaPlay />}</Icon>
          </PlaySound>
          <BgMusicList>
            {backgroundMusicArr.map((item, index) => {
              return <BgMusicItem key={index} onClick={() => onClickBgMusic(item.name)}>
                <Icon>{processCheckBgMusic(item.name) ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</Icon>
                <BgMusicName selected={processCheckBgMusic(item.name)}>{item.name}</BgMusicName>
              </BgMusicItem>
            })}
          </BgMusicList>
          <License onClick={onClickLicense}>Music: www.bensound.com</License>
        </SelectAudioContainer>
        <SubmitInput type="submit" value="완료" />
      </TiemSettingContainer>
    </Container>
  </PopupContainer>);
}

export default TimerSetting;