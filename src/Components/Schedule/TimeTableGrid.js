
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
const timevalueR = ["", ["월","",Date()], ["화","",], ["수","",], ["목","",], ["금", "",],
["1","","09:00"], ["국어","blue",["태그1","태그2","운동장","체육관"]], ["수학","",""],["사회","",""],["과학","",""],["음악","",""],
["2","","09:50"],["미술","",""],["체육","",""],["실과","",""],["영어","",""],["창체","",""],
["3","","10:40"], ["국어","blue",["태그1","태그2","운동장","체육관"]], ["수학","",""],["사회","",""],["과학","",""],["음악","",""],
["4","","11:30"],["미술","",""],["체육","",""],["실과","",""],["영어","",""],["창체","",""],
["5","","13:00"], ["국어","blue",["태그1","태그2","운동장","체육관","태그","태그"]], ["수학","",""],["사회","",""],["과학","",""],["음악","",""],
["6","","13:50"],["미술","",""],["체육","",""],["실과","",""],["영어","",""],["창체","",""]]





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