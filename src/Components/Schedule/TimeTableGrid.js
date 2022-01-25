
import React from 'react';
import styled from 'styled-components';
import TableInItem from './TableInItem';
import TableOutItem from './TableOutItem';



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

const result=[]
let myDate = new Date();
console.log(myDate)
const nowDay = myDate.getDay();
console.log(nowDay)
myDate.setDate(myDate.getDate()-nowDay);
for (var i =0; i<6; i++)
{myDate.setDate(myDate.getDate()+1)
result.push(myDate.toLocaleDateString('en-US'))}



const dayValue= [
[,,], ["월",,result[0]], ["화",,result[1]], ["수",,result[2]], ["목",,result[3]], ["금", ,result[4]]]

const classtime1= ["1","","09:00"]
const classMon1 = ["음악",,["운동장","체육관"]]
const classTue1 = ["과학","#87CDDB",["운동장","체육관"]]
const classWed1 = ["사회","#FFB6C1",["운동장","체육관"]]
const classThu1 = ["수학","",["운동장","체육관"]]
const classFri1 = ["국어","",["운동장","체육관"]]

const classtime2= ["2","","09:50"]
const classMon2 = ["미술","",["운동장","체육관"]]
const classTue2 = ["체육","#FFFF00",["운동장","체육관"]]
const classWed2 = ["실과","#98FB98",["운동장","체육관"]]
const classThu2 = ["영어","",["운동장","체육관"]]
const classFri2 = ["창체","",["운동장","체육관"]]

const classtime3= ["3","","10:40"]
const classMon3 = ["국어","#DA70D6",["운동장","체육관"]]
const classTue3 = ["수학","",["운동장","체육관"]]
const classWed3 = ["사회","",["운동장","체육관"]]
const classThu3 = ["과학","",["운동장","체육관"]]
const classFri3 = ["음악","",["운동장","체육관"]]

const classtime4= ["4","","11:30"]
const classMon4 = ["미술","#F4A460",["운동장","체육관"]]
const classTue4 = ["체육","",["운동장","체육관"]]
const classWed4 = ["실과","#98FB98",["운동장","체육관"]]
const classThu4 = ["영어","",["운동장","체육관"]]
const classFri4 = ["창체","#FFFF00",["운동장","체육관"]]

const classtime5= ["5","","13:00"]
const classMon5 = ["국어","",["운동장","체육관"]]
const classTue5 = ["수학","",["운동장","체육관"]]
const classWed5 = ["사회","",["운동장","체육관"]]
const classThu5 = ["과학","#DA70D6",["운동장","체육관"]]
const classFri5 = ["음악","",["운동장","체육관"]]

const classtime6= ["6","","13:50"]
const classMon6 = ["미술","",["운동장","체육관"]]
const classTue6 = ["체육","",["운동장","체육관"]]
const classWed6 = ["실과","#98FB98",["운동장","체육관"]]
const classThu6 = ["영어","",["운동장","체육관"]]
const classFri6 = ["창체","#87CDDB",["운동장","체육관"]]



const TimeTableGrid = ({fontSize,setFontSize}) => {

  return (
    <Container>
      {dayValue.map((item, index) => {
        return (<TableOutItem item={item[0]} index={index} color={item[1]} tag={item[2]} />)
      })}

  
  <TableOutItem item={classtime1[0]} color={classtime1[1]} tag={classtime1[2]}/>  
  <TableInItem item={classMon1[0]} color={classMon1[1]} tag={classMon1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue1[0]} color={classTue1[1]} tag={classTue1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed1[0]} color={classWed1[1]} tag={classWed1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu1[0]} color={classThu1[1]} tag={classThu1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri1[0]} color={classFri1[1]} tag={classFri1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  

  <TableOutItem item={classtime2[0]} color={classtime2[1]} tag={classtime2[2]}/>  
  <TableInItem item={classMon2[0]} color={classMon2[1]} tag={classMon2[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue2[0]} color={classTue2[1]} tag={classTue2[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed2[0]} color={classWed2[1]} tag={classWed2[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu2[0]} color={classThu2[1]} tag={classThu2[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri2[0]} color={classFri2[1]} tag={classFri2[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  
  <TableOutItem item={classtime3[0]} color={classtime3[1]} tag={classtime3[2]}/>  
  <TableInItem item={classMon3[0]} color={classMon3[1]} tag={classMon1[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue3[0]} color={classTue3[1]} tag={classTue3[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed3[0]} color={classWed3[1]} tag={classWed3[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu3[0]} color={classThu3[1]} tag={classThu3[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri3[0]} color={classFri3[1]} tag={classFri3[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  
  <TableOutItem item={classtime4[0]} color={classtime4[1]} tag={classtime4[2]}/>  
  <TableInItem item={classMon4[0]} color={classMon4[1]} tag={classMon4[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue4[0]} color={classTue4[1]} tag={classTue4[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed4[0]} color={classWed4[1]} tag={classWed4[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu4[0]} color={classThu4[1]} tag={classThu4[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri4[0]} color={classFri4[1]} tag={classFri4[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  
  <TableOutItem item={classtime5[0]} color={classtime5[1]} tag={classtime5[2]}/>  
  <TableInItem item={classMon5[0]} color={classMon5[1]} tag={classMon5[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue5[0]} color={classTue5[1]} tag={classTue5[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed5[0]} color={classWed5[1]} tag={classWed5[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu5[0]} color={classThu5[1]} tag={classThu5[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri5[0]} color={classFri5[1]} tag={classFri5[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  

  <TableOutItem item={classtime6[0]} color={classtime6[1]} tag={classtime6[2]}/>  
  <TableInItem item={classMon6[0]} color={classMon6[1]} tag={classMon6[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classTue6[0]} color={classTue6[1]} tag={classTue6[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classWed6[0]} color={classWed6[1]} tag={classWed6[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classThu6[0]} color={classThu6[1]} tag={classThu6[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  <TableInItem item={classFri6[0]} color={classFri6[1]} tag={classFri6[2][0]} fontSize={fontSize} setFontSize={setFontSize}/>  
  </Container>
  )
}

export default TimeTableGrid;