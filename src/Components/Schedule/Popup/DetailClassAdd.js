import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inPopup, isPopupVar } from '../../../apollo';
import { DetailStudentLayout, DetailTitle } from '../../List/styled/DetailStudent';
import useMedia from '../../../Hooks/useMedia';
import {ImRadioUnchecked} from 'react-icons/im';

const AddClassContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
  line-height: 120%;
  /* grid-template-columns: 2fr repeat(6,1fr);
  grid-template-rows: repeat(5,1fr) ; */
  grid-template-columns: 2fr repeat(5,1fr);
  grid-template-rows: repeat(6,1fr) ;
`

const TimeTable = styled.div`
  display: grid;
  text-align: center;
  flex-wrap: wrap;
  border:1px solid;
  cursor: pointer;
  svg{
    align-items: center;
    justify-items: center;
  }

`


const DetailClassAdd = ({ }) => {


  const media = useMedia()


  const [isEdit, setIsEdit] = useState(false)
  const [pick, setPick] = useState()


const onClickBtn = (item)=>{
  setPick(item)

}

  //useEffect

const daytime = ["월요일","1","2","3","4","5","6",
                "화요일","1","2","3","4","5","6",
                "수요일","1","2","3","4","5","6",
                "목요일","1","2","3","4","5","6",
                "금요일","1","2","3","4","5","6"]
const timeday = ["1교시","월","화","수","목","금",
                 "2교시","월","화","수","목","금",
                 "3교시","월","화","수","목","금",
                 "4교시","월","화","수","목","금",
                 "5교시","월","화","수","목","금",
                 "6교시","월","화","수","목","금",]

  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>수업 추가</DetailTitle>
      
    <AddClassContainer>
    {timeday.map((item, index) => {
        return (<TimeTable item={item}
          onClick={()=>onClickBtn(item)} 
          index={index}>
            {item}
           
          </TimeTable>)
      })}
 </AddClassContainer>
  </DetailStudentLayout>);
}

export default DetailClassAdd;