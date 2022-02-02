import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inPopup, isPopupVar } from '../../../apollo';
import { DetailStudentLayout, DetailTitle } from '../../List/styled/DetailStudent';
import useMedia from '../../../Hooks/useMedia';
import {ImRadioUnchecked} from 'react-icons/im';
import {BsCheck} from "react-icons/bs";

const AddClassContainer = styled.div`
  padding: 10px;
  padding: 0.625rem;
  display: grid;
  line-height: 130%;
  border-radius: 5px;
  border-radius: 0.625rem;
  grid-template-columns: 1.5fr repeat(5,1fr);
  grid-template-rows: repeat(6,1fr) ;
`

const TimeTable = styled.div`
  display: grid;
  text-align: center;
  flex-wrap: wrap;
  border:1px solid;
  line-height: 190%;
  cursor: pointer;
  align-items: center;
  justify-items: center;
`


const DetailClassAdd = ({ }) => {


  const media = useMedia()


  const [isEdit, setIsEdit] = useState(false)
  const [pick, setPick] = useState()
  const [viewTimeDay,setViewTimeDay]=useState(false);


const onClickBtn = (item)=>{
  setPick(item)
}

const onClickViewTimeDay = ()=>{
  setViewTimeDay(!viewTimeDay)
}

  //useEffect


const timeday = ["","월","화","수","목","금",
                 "1교시","","","","","",
                 "2교시","","","","","",
                 "3교시","","","","","",
                 "4교시","","","","","",
                 "5교시","","","","","",
                 "6교시","","","","","",]

  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>수업 추가</DetailTitle>
    <AddClassContainer>
      {
             timeday.map((item, index) => {
            return (<TimeTable item={item}
              onClick={()=>onClickBtn(item)} 
              index={index}>
                {item} {pick === item && <BsCheck />}
               
              </TimeTable>)
          })
      }

 </AddClassContainer>
  </DetailStudentLayout>);
}

export default DetailClassAdd;