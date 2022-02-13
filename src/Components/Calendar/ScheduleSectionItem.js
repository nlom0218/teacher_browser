import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { processSetDay } from "../../shared"

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`

const ColorDot = styled.div`
  padding: 10px 0px;
  width: 10px;
  width: 0.625rem;
  background-color: ${props => props.color};
`

const Schedule = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  margin: 5px;
  margin: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const EndDate = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  margin: 5px;
  margin: 0.3125rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  background-color: ${props => props.color};
  font-size: 0.75em;
  font-size: 0.75rem;
`

const ScheduleSectionItem = ({ item }) => {
  const onClickSchedule = () => {
    inPopup("editSchedule")
    localStorage.setItem("editSchedule", item._id)
  }
  return (<Container>
    <ColorDot color={item.color}></ColorDot>
    <Schedule onClick={onClickSchedule}>{item.schedule}</Schedule>
    <EndDate color={item.color}>{format(new Date(parseInt(item.endDate)), "~ yy-MM-dd")} {processSetDay(new Date(parseInt(item.endDate)))}</EndDate>
  </Container>);
}

export default ScheduleSectionItem;