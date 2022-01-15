import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import styled from "styled-components";
import { customMedia } from "../../styles";
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io";
import { toPromise } from "@apollo/client";
import {TiDelete} from "react-icons/ti"

const Container = styled.div`
min-height: ${props=>props.seeResultType==="ONE"&&"100%"};
  display: grid;
  grid-template-columns: ${props=>props.seeResultType==="ALL" && "repeat(2, 1fr)"};
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns: ${props=>props.seeResultType==="ALL" && "repeat(4, 1fr)"};
`}
  ${customMedia.greaterThan("desktop")`
   grid-template-columns: ${props=>props.seeResultType==="ALL" && "repeat(6, 1fr)"};
  `}`

const Item = styled.div`
  min-height: 120px;
  min-height: 7.5rem;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  transition: border 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
  position: relative;
`;

const RemoveBtn = styled.div`
position: absolute;
top:3%;
right:3%;
font-size: 1.5em;
font-size: 1.5rem;
cursor: pointer;
`

const SeeOneItem = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
row-gap: 20px;
row-gap: 1.25rem;
.order-student-back-btn,
.order-student-forward-btn
{
  align-self: center;
  font-size: 2em;
  font-size: 2rem;
}
.order-student-back-btn{
  opacity: ${props=>props.order ===1 && 0};
  cursor: ${props=>props.order !== 1 && "pointer"};
  grid-column:1/2;
  grid-row:2/3;
  justify-self:center;
}
.order-student-forward-btn {
  opacity: ${props=>props.order === props.studentLength && 0};
  cursor: ${props=>props.order !== props.studentLength && "pointer"};
  grid-column:2/3;
  grid-row:2/3;
  justify-self:center;

}

${customMedia.greaterThan('desktop')`
width: 60%;
justify-self: center;
grid-template-columns: auto 1fr auto;
column-gap: 20px;
column-gap: 1.25rem;
.order-student-back-btn{
  grid-column:1/2;
  grid-row:1/2;
}
.order-student-forward-btn {
  grid-column:3/4;
  grid-row:1/2;

}



`}
`

const Student = styled.div`
border : 1px solid ${props => props.theme.fontColor};
transition: border 1s ease;
border-radius: 5px;
border-radius: 0.3125rem;
display: grid;
align-items: center;
justify-items: center;
grid-template-rows: 2fr 3fr;
padding: 20px;
padding: 1.25rem;
row-gap: 40px;
row-gap: 2.5rem;
grid-column: 1/-1;
${customMedia.greaterThan("desktop")`
grid-column:2/3;
`}
${customMedia.greaterThan("tablet")`
padding : 80px 20px;
padding : 5rem 1.25rem;
`}
`
const Order = styled.div`
  font-size: 1.5rem;
  font-size: 1.5em;
`;

const Name = styled.div`
  width:100%;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  text-align: center;
  font-size: ${props=>props.fontSize}rem;
  font-size: ${props=>props.fontSize}em;

`;



const StudentOrder = ({ fontSizeAll, fontSizeOne, seeResultType, selectedStudent, setSelectedStudent, isShuffle }) => {

const [order,setOrder] =useState(1)

const onClickArrow = (type) =>{
  if (type==="back" && order !==1 ){
    setOrder(prev=>prev-1)
  }
  if (type==="forward" && order !==selectedStudent.length){
    setOrder(prev=>prev+1)
  }
}

const onClickRemoveBtn = (name) =>{
  const newSelectedStudent = selectedStudent.filter((item) => item !== name)
  setSelectedStudent(newSelectedStudent)
}

  useEffect(() => {
    const shuffledStudent = () => {
      const newSelectedStudent = selectedStudent
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setSelectedStudent(newSelectedStudent);
    };
    let shuffling;
    if (isShuffle === "ing") {
      shuffling = setInterval(() => {
        shuffledStudent();
      }, 100);
    } else {
      clearInterval(shuffling);
    }
    return () => clearInterval(shuffling);
  }, [isShuffle]);

  return (
    <Container seeResultType={seeResultType} >
      {seeResultType === "ALL" ? selectedStudent.map((item, index) => {
        return (
          <Item key={item}>
            <Order>{index + 1}</Order>
            <Name fontSize={fontSizeAll} >{item}</Name>
            <RemoveBtn onClick={()=>onClickRemoveBtn(item)}><TiDelete/></RemoveBtn>
          </Item>
        );
      }) : 
      
      <SeeOneItem order={order} studentLength={selectedStudent.length}> 

        <div className="order-student-back-btn" onClick={()=>{onClickArrow("back")} }> <IoIosArrowBack/> </div>
        <Student>
<Order>{order}</Order>
        <Name fontSize={fontSizeOne} >{selectedStudent[order -1]}</Name>
        </Student>
        <div className="order-student-forward-btn" onClick={()=>{onClickArrow("forward")}}>        <IoIosArrowForward/>
</div>
      </SeeOneItem> 
      }
    </Container>
  );
};

export default StudentOrder;
