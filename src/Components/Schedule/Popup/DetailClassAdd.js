import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inPopup, isPopupVar } from '../../../apollo';
import { DetailStudentLayout, DetailTitle } from '../../List/styled/DetailStudent';
import useMedia from '../../../Hooks/useMedia';


const AddClassContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
  grid-template-columns: 2fr repeat(6,1fr);
  grid-template-rows: repeat(5,1fr) ;
`

const TimeTable = styled.button`
  display: grid;
text-align: center;
  flex-wrap: wrap;
  border:1px solid;
  cursor: pointer;
`

const DetailClassAdd = ({ }) => {


  const media = useMedia()


  const [isEdit, setIsEdit] = useState(false)
  const [pick, setPick] = useState(false)

const onClickBtn = ()=>{setPick(true)}

  //useEffect

const daytime = ["월요일","1","2","3","4","5","6",
                "화요일","1","2","3","4","5","6",
                "수요일","1","2","3","4","5","6",
                "목요일","1","2","3","4","5","6",
                "금요일","1","2","3","4","5","6"]

  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>수업 추가</DetailTitle>
      
    <AddClassContainer>
    {daytime.map((item, index) => {
        return (<TimeTable onClick={onClickBtn} index={index}>{item}</TimeTable>)
      })}
 

 </AddClassContainer>
  </DetailStudentLayout>);
}

export default DetailClassAdd;