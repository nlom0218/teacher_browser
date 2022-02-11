import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`

const CalendarDetail = ({ setScreen, urlDate }) => {
  useEffect(() => {
    setScreen("small")
  }, [])
  return (<Container></Container>);
}

export default CalendarDetail;