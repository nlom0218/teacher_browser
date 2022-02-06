import React from 'react';
import styled from 'styled-components';
import IcPrint from '../../../icons/Print/IcPrint';
import PopupPrintContainer from '../../Shared/PopupPrintContainer';
import { useReactToPrint } from 'react-to-print';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { useState } from 'react/cjs/react.development';
import { color } from '../../../styles';

const PrintTopContents = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const PrintType = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const PrintTypeItem = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`

const PrintIcon = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-weight: 600;
  cursor: pointer;
  svg {
    font-size: 2.25em;
    font-size: 2.25rem;
    display: flex;
  }
`

const PrintContainer = styled.div`
  /* grid-template-rows: 0.5fr 1.5fr 18fr; */
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  padding: 20px;
  padding: 1.25rem;
  @media print {
    @page {
      size: A4;
      margin: 10mm;
    }
  }
`

const PageTitle = styled.div`
  color: ${color.black};
`

const Title = styled.div`
  text-align: center;
  font-size: 2em;
  font-size: 2rem;
  color: ${color.black};
  align-self: center;
`

const List = styled.div`
  border: ${color.black} 2px solid;
  background-color: ${color.black};
  color: ${color.black};
  row-gap: 2px;
  row-gap: 0.125rem;
  column-gap: 2px;
  column-gap: 0.125rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .print_table_row_name {
    text-align: center;
    font-weight: 600;
    background-color: ${color.white};
  }
`

const Item = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.2em;
  font-size: 1.2rem;
`

const Number = styled.div`
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  background-color: ${color.white};
  text-align: center;
  border-right: ${color.black} 2px solid;
  font-weight: 600;
`

const Name = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
`

const GridList = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6,1fr);
  row-gap: 4px;
  row-gap: 0.25rem;
  column-gap: 4px;
  column-gap: 0.25rem;
  color: ${color.black};
`

const TableItem = styled.div`
  display: grid;
  height: 100%;
  border: 1px solid ;
  border-radius: 5px;
  border-radius: 0.3125rem;
  grid-template-rows: 1fr;
  text-align: center;
  line-height: 300%;
  align-items: center;


`
const TableOutItem = styled.div`
  background-color: #CEECF5;
  height: 100%;
  border: 1px solid ;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr;
  text-align: center;
  line-height: 300%;
  align-items: center;
  position: relative;

`

const TimeUp=styled.div`
position: absolute;
left: 5%;
bottom: 5%;
padding: 5px;
padding: 0.3125rem;
font-size: 0.6rem;
font-size: 0.6em;
opacity: 0.6;
`
const TimeDown=styled.div`
position: absolute;
right: 5%;
top: 5%;
padding: 5px;
padding: 0.3125rem;
font-size: 0.6rem;
font-size: 0.6em;
opacity: 0.6;
`

const GridItem = styled.div`
  display: grid;
  text-align: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 20px 5px;
  padding: 1.25rem 0.3125rem;
  border: 1px solid ${color.black};
  border-radius: 5px;
  border-radius: 0.3125rem;

`

const PrintScheduleContents = ({ printRef, title,viewTime,timeResult }) => {

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = () => {
    handlePrint()
  }

 const dayList = ["" , "월", "화", "수", "목", "금"]
 const table1st= ["","","","",""]
 const table2nd= ["","","","",""]
 const table3rd= ["","","","",""]
 const table4th= ["","","","",""]
 const table5th= ["","","","",""]
 const table6th= ["","","","",""]



  return (<PopupPrintContainer printRef={printRef}>
    <PrintTopContents>
   
      <PrintIcon onClick={onClickPrint}><div>인쇄하기</div><IcPrint /></PrintIcon>
    </PrintTopContents>
    <PrintContainer ref={printRef}>
      <PageTitle>시간표</PageTitle>
      <Title>{title}</Title>
    
        <GridList>
           { dayList.map((item,index)=>{
               return(<TableOutItem>{item}</TableOutItem>)
           })}
    
        {viewTime===true
        ? <TableOutItem>1 
        <TimeUp>{timeResult[0]}</TimeUp>
            <TimeDown>{timeResult[1]}</TimeDown></TableOutItem>
        :<TableOutItem>1</TableOutItem>
        }
    { table1st.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
         {viewTime===true
        ? <TableOutItem>2 
        <TimeUp>{timeResult[2]}</TimeUp>
            <TimeDown>{timeResult[3]}</TimeDown></TableOutItem>
        :<TableOutItem>2</TableOutItem>
        }
    { table2nd.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
      {viewTime===true
        ? <TableOutItem>3
        <TimeUp>{timeResult[4]}</TimeUp>
            <TimeDown>{timeResult[5]}</TimeDown></TableOutItem>
        :<TableOutItem>3</TableOutItem>
        }    { table3rd.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
      {viewTime===true
        ? <TableOutItem>4
        <TimeUp>{timeResult[6]}</TimeUp>
            <TimeDown>{timeResult[7]}</TimeDown></TableOutItem>
        :<TableOutItem>4</TableOutItem>
        }    { table4th.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
      {viewTime===true
        ? <TableOutItem>5 
        <TimeUp>{timeResult[8]}</TimeUp>
            <TimeDown>{timeResult[9]}</TimeDown></TableOutItem>
        :<TableOutItem>5</TableOutItem>
        }    { table5th.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
      {viewTime===true
        ? <TableOutItem>6 
        <TimeUp>{timeResult[10]}</TimeUp>
            <TimeDown>{timeResult[11]}</TimeDown></TableOutItem>
        :<TableOutItem>6</TableOutItem>
        }    { table6th.map((item,index)=>{
               return(<TableItem>{item}</TableItem>)
           })}
   </GridList>
    </PrintContainer>
  </PopupPrintContainer >);
}

export default PrintScheduleContents;