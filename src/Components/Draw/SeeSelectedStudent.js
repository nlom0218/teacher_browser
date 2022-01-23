import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import SeeSelectedStudentItem from './SeeSelectedStudentItem';


const Container = styled.div`
  grid-column : 1 / -1;
  min-height : 100%;
  display : grid;
  column-gap : 20px;
  column-gap : 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  ${customMedia.greaterThan('desktop')`
   grid-template-columns : ${props => props.pickNum === 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"};  
  `}
`

const StudentItem = styled.div`
  grid-column : ${props => props.pickNum === 1 && "2 / 3"};
  min-height : 160px;
  min-height : 10rem;
  display : flex;
  justify-content : center;
  align-items : center;
  border : 1px solid ${props => props.theme.fontColor};
  border-radius : 5px;
  border-radius : 0.3125rem;
  font-size : ${props => props.fontSize +1}em;
  font-size : ${props => props.fontSize +1}rem;
  position : relative;
`

const HideBox = styled.div`
  position : absolute;
`

const SeeSelectedStudent = ( {selectedStudent, pickNum, pickType, fontSizeAll} ) => {
    const [pickStudent, setPickStudent] = useState([])
    useEffect(() => {
        const newSelectedStudent = []
        for (let i = 0; i < pickNum; i++) {
            newSelectedStudent.push(selectedStudent[i])   
        }
        setPickStudent(newSelectedStudent);
    } ,[])
    return (<Container pickNum={pickNum}>
        {pickStudent.map((item,index) => {
            return<SeeSelectedStudentItem key={index} 
            fontSize={fontSizeAll} 
            pickType={pickType} 
            item={item}
            pickNum={pickNum}
            />
        })}
    </Container>);
}

export default SeeSelectedStudent;