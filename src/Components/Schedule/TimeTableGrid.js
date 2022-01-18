import React from 'react';
import styled from 'styled-components';
import TableInItem from './TableInItem';


const Container = styled.div`
  display: grid;
  font-size: 1.25rem;
  font-size: 1.25 em;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(7,1fr);

`


//아래 나중에 시간표 값 불러오는 것 추가 현재는 그냥 여기서 값 넣었음. 

const timevalue = ["", "월요일", "화요일", "수요일", "목요일", "금요일", 
"1교시", "국어", "수학","영어","사회","과학",
"2교시","음악","미술","체육","실과","창체",
"3교시", "국어", "수학","영어","사회","과학",
"4교시","음악","미술","체육","실과","창체",
"5교시", "국어", "수학","영어","사회","과학",
"6교시","음악","미술","체육","실과","창체"]


const timevalue0 = ["", "월요일", "화요일", "수요일", "목요일", "금요일", 
"1교시", "", "","","","",
"2교시","","","","","",
"3교시", "", "","","","",
"4교시","","","","","",
"5교시", "", "","","","",
"6교시","","","","",""]

const timevalueR = ["", "월", "화", "수", "목", "금", 
"1", ["국어","blue",["태그1","태그2"]], "","","","",
"2","","","","","",
"3", "", "","","","",
"4","","","","","",
"5", "", "","","","",
"6","","","","",""]





const TimeTableGrid = () => {

  return (
    <Container>
      {timevalueR.map((item, index) => {
        return (<TableInItem item={item[0]} index={index} color={item[1]} tag={item[2]}/>)
      })}
    </Container>
  )
}

export default TimeTableGrid;