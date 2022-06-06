import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { customMedia } from "../../../styles";
import PopupContainer from "../../Shared/PopupContainer";
import { stopMusicFn } from "../../../audio/BackgroundMusic/BackgroundMusic";
import TimeSettingLayout from "./TimeSettingLayout";
import BgMusicSettingLayout from "./BgMusicSettingLayout";
import AlermSettingLayout from "./AlermSettingLayout";
import MemoSettingLayout from "./MemoSettingLayout";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  justify-self: flex-end;
`;

const TiemSettingContainer = styled.form`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const SubmitInput = styled.input`
  grid-column: 1 / -1;
  justify-self: flex-end;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const TimerSetting = ({
  mode,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  setErrMsg,
  setBgMusic,
  bgMusic,
  alarmAudio,
  setAlarmAudio,
}) => {
  const [selectedBgMusic, setSelectedBgMusic] = useState(
    bgMusic ? bgMusic : undefined
  );
  const [bgMusicMp3, setBgMusicMp3] = useState(
    bgMusic ? new Audio(bgMusic.audio) : undefined
  );
  const [selectedAlarmAudio, setSelectedAlarmAudio] = useState(
    alarmAudio ? alarmAudio : undefined
  );
  const [alarmAudioMp3, setAlarmAudioMp3] = useState(
    alarmAudio ? new Audio(alarmAudio.audio) : undefined
  );

  const { register, setValue, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { timerMemo } = data;
    if (timerMemo !== "") {
      localStorage.setItem("timerMemo", timerMemo);
    }
    if (mode === "countdown") {
      const { hours, minutes, seconds } = data;
      localStorage.setItem("countdownHours", hours);
      localStorage.setItem("countdownMinutes", minutes);
      localStorage.setItem("countdownSeconds", seconds);
      setHours(parseInt(hours));
      setMinutes(parseInt(minutes));
      setSeconds(parseInt(seconds));
    } else {
    }
    // 배경음과 종료알림음 세팅
    if (selectedBgMusic) {
      setBgMusic(selectedBgMusic);
    } else {
      setBgMusic(undefined);
    }
    if (selectedAlarmAudio) {
      setAlarmAudio(selectedAlarmAudio);
    } else {
      setAlarmAudio(undefined);
    }

    // 배경음과 종료알림음 미리듣기 종료
    if (bgMusicMp3) {
      stopMusicFn(bgMusicMp3);
    }
    if (alarmAudioMp3) {
      stopMusicFn(alarmAudioMp3);
    }

    outPopup();
  };

  useEffect(() => {
    setValue("hours", hours);
    setValue("minutes", minutes);
    setValue("seconds", seconds);
  }, []);

  // PopupContainer의 sound1, sound2 props는 바탕을 클릭했을 때 미리듣가 있을 경우 미리듣기를 중단하기 위함.
  return (
    <PopupContainer sound1={bgMusicMp3} sound2={alarmAudioMp3}>
      <Container>
        <Title>
          {mode === "countdown" ? "카운트 다운 설정" : "카운트 업 설정"}
        </Title>
        <TiemSettingContainer onSubmit={handleSubmit(onSubmit)}>
          {mode === "countdown" && (
            <TimeSettingLayout register={register} setValue={setValue} />
          )}
          <BgMusicSettingLayout
            setErrMsg={setErrMsg}
            bgMusicMp3={bgMusicMp3}
            setBgMusicMp3={setBgMusicMp3}
            selectedBgMusic={selectedBgMusic}
            setSelectedBgMusic={setSelectedBgMusic}
          />
          {mode === "countdown" && (
            <AlermSettingLayout
              setErrMsg={setErrMsg}
              selectedAlarmAudio={selectedAlarmAudio}
              setSelectedAlarmAudio={setSelectedAlarmAudio}
              alarmAudioMp3={alarmAudioMp3}
              setAlarmAudioMp3={setAlarmAudioMp3}
            />
          )}
          <MemoSettingLayout register={register} setValue={setValue} />
          <SubmitInput type="submit" value="완료" />
        </TiemSettingContainer>
      </Container>
    </PopupContainer>
  );
};

export default TimerSetting;
