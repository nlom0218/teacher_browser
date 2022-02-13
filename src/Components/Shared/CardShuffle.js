import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import styled, { keyframes } from 'styled-components';
import IcCardShuffleBefore from '../../icons/CardShuffle/IcCardShuffleBefore';
import IcCardShuffleFour from '../../icons/CardShuffle/IcCardShuffleFour';
import IcCardShuffleOne from '../../icons/CardShuffle/IcCardShuffleOne';
import IcCardShuffleThree from '../../icons/CardShuffle/IcCardShuffleThree';
import IcCardShuffleTwo from '../../icons/CardShuffle/IcCardShuffleTwo';

const IconOneAni = keyframes`
  0%{
    left: 200px;
    left: 12.5rem;
    opacity: 0;
  }
  25% {
    left: 80px;
    left: 5rem;
    opacity: 1;
  }
  75% {
    left: 80px;
    left: 5rem;
    opacity: 1;
  }
  100% {
    left: -40px;
    left: -2.5rem;
    opacity: 0;
  }
`

const Container = styled.div`
  position: absolute;
  justify-self: center;
  min-width: 240px;
  min-width: 15rem;
  max-width: 240px;
  max-width: 15rem;
  column-gap: 5px;
  column-gap: 0.3125rem;
  top: -80px;
  top: -5rem;
  svg {
    display: flex;
    font-size: 5em;
    font-size: 5rem;
  }
  .shuffleIcon {
    position: absolute;
  }
`

const ShuffleStartIcon = styled.div`
  width: 100%;
  position: absolute;
  left: 80px;
  left: 5rem;
`

const ShuffeIcon = styled.div`
  animation: ${IconOneAni} 1.5s ease infinite;
`

const CardShuffle = () => {
  const cardShuffleArr = [
    { order: "one", icon: <IcCardShuffleOne /> },
    { order: "two", icon: <IcCardShuffleTwo /> },
    { order: "three", icon: <IcCardShuffleThree /> },
    { order: "four", icon: <IcCardShuffleFour /> }
  ]

  const [isShuffle, setIsShuffle] = useState(false)
  const [shuffleIcon, setShuffleIcon] = useState(cardShuffleArr[0])

  useEffect(() => {
    const setShuffle = setTimeout(() => {
      setIsShuffle(true)
      setShuffleIcon(cardShuffleArr[0])
    }, [1500])
    return () => {
      clearTimeout(setShuffle)
    }
  }, [])

  useEffect(() => {
    const iconShuffle = setTimeout(() => {
      if (shuffleIcon.order === "one") {
        setShuffleIcon(cardShuffleArr[1])
      } else if (shuffleIcon.order === "two") {
        setShuffleIcon(cardShuffleArr[2])
      } else if (shuffleIcon.order === "three") {
        setShuffleIcon(cardShuffleArr[3])
      } else if (shuffleIcon.order === "four") {
        setShuffleIcon(cardShuffleArr[0])
      }
    }, [1500])
    return () => { setTimeout(iconShuffle) }
  }, [shuffleIcon])

  return (<Container>
    {!isShuffle ? <ShuffleStartIcon><IcCardShuffleBefore /></ShuffleStartIcon>
      :
      <React.Fragment>
        <ShuffeIcon className="shuffleIcon">{shuffleIcon?.icon}</ShuffeIcon>
      </React.Fragment>
    }
  </Container>);
}

export default CardShuffle;