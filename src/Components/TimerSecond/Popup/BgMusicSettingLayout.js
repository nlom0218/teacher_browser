import React, { useState } from 'react';
import { BgMusicItem, BgMusicList, BgMusicName, Icon, License, PlaySound, SelectAudioContainer, SettingTitle } from '../styled/PopupStyled';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { MdAudiotrack } from "react-icons/md"
import { FaPlay, FaStop } from 'react-icons/fa';
import { backgroundMusicArr, playMusicFn, stopMusicFn } from '../../../audio/BackgroundMusic/BackgroundMusic';

const BgMusicSettingLayout = ({ setErrMsg, bgMusicMp3, selectedBgMusic, setBgMusicMp3, setSelectedBgMusic }) => {
  const [playMusic, setPlayMusic] = useState(false)

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

  return (<SelectAudioContainer>
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
  </SelectAudioContainer>);
}

export default BgMusicSettingLayout;