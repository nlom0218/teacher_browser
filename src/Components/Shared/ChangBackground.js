import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useMe from '../../Hooks/useMe';

const bgDownAni = keyframes`
  from {
    top: -100%;
    bottom: 100%;
  }
  to {
    top: 0;
    bottom: 0;
  }
`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${({ bgTheme }) =>
    bgTheme ?
      (bgTheme.substr(0, 1) === "#" ? bgTheme :
        `url("https://source.unsplash.com/random/1920x1080?${bgTheme}")`)
      :
      `url("https://source.unsplash.com/random/1920x1080?nature")`};
  background-size: cover;
  background-position: center;
  animation: ${bgDownAni} 2s ease forwards;
`

const ChangBackground = () => {
  const me = useMe()
  const [userBgTheme, setUserBgTheme] = useState(undefined)

  useEffect(() => {
    if (me) {
      setUserBgTheme(me.bgTheme)
    }
  }, [me])

  useEffect(() => {
    const removeBgTheme = setTimeout(() => {
      setUserBgTheme(undefined)
    }, [2000])
    return () => { clearTimeout(removeBgTheme) }
  }, [userBgTheme])


  return (<React.Fragment>
    {userBgTheme && <Container bgTheme={userBgTheme}></Container>}
  </React.Fragment>
  );
}

export default ChangBackground;