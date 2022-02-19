import React, { useState } from 'react';
import { BgMusicItem, BgMusicList, BgMusicName, Icon, License, PlaySound, SelectAudioContainer, SettingTitle } from '../styled/PopupStyled';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { MdAudiotrack } from "react-icons/md"
import { FaPlay, FaStop } from 'react-icons/fa';
import { playMusicFn, stopMusicFn } from '../../../audio/BackgroundMusic/BackgroundMusic';
import { alermAudiocArr } from '../../../audio/AlermAudio/AlermAudio';

const AlermSettingLayout = ({ setErrMsg, alarmAudioMp3, selectedAlarmAudio, setAlarmAudioMp3, setSelectedAlarmAudio }) => {
  const [playMusic, setPlayMusic] = useState(false)

  const onClickBgMusic = (name) => {
    if (playMusic) {
      stopMusicFn(alarmAudioMp3, setPlayMusic)
    }
    if (!selectedAlarmAudio) {
      const newBgAudio = alermAudiocArr.filter(item => item.name === name)[0]
      setAlarmAudioMp3(new Audio(newBgAudio.audio))
      setSelectedAlarmAudio(newBgAudio);
      return
    }
    if (name === selectedAlarmAudio.name) {
      setAlarmAudioMp3(undefined)
      setSelectedAlarmAudio(undefined);
    } else {
      const newBgAudio = alermAudiocArr.filter(item => item.name === name)[0]
      setAlarmAudioMp3(new Audio(newBgAudio.audio))
      setSelectedAlarmAudio(newBgAudio);
    }
  }

  const processCheckBgMusic = (name) => {
    if (!selectedAlarmAudio) {
      return false
    }
    if (name === selectedAlarmAudio.name) {
      return true
    } else {
      return false
    }
  }

  const onClickPlaySound = () => {
    if (!selectedAlarmAudio) {
      setErrMsg("선택된 종료 알림음이 없습니다. 😂")
      return
    }
    if (playMusic) {
      stopMusicFn(alarmAudioMp3, setPlayMusic)
    } else {
      playMusicFn(alarmAudioMp3, setPlayMusic)
    }
  }

  return (<SelectAudioContainer>
    <SettingTitle>종료 알림음</SettingTitle>
    <PlaySound onClick={onClickPlaySound}>
      <div>미리듣기</div>
      <Icon><MdAudiotrack /></Icon>
      <Icon>{playMusic ? <FaStop /> : <FaPlay />}</Icon>
    </PlaySound>
    <BgMusicList>
      {alermAudiocArr.map((item, index) => {
        return <BgMusicItem key={index} onClick={() => onClickBgMusic(item.name)}>
          <Icon>{processCheckBgMusic(item.name) ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</Icon>
          <BgMusicName selected={processCheckBgMusic(item.name)}>{item.name}</BgMusicName>
        </BgMusicItem>
      })}
    </BgMusicList>
  </SelectAudioContainer>);
}

export default AlermSettingLayout;