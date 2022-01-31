import React from 'react';
import styled from 'styled-components';
import IcNameTable from '../../../icons/NameTable/IcNameTable';
import { IcStudent1, IcStudent10, IcStudent11, IcStudent12, IcStudent13, IcStudent14, IcStudent15, IcStudent16, IcStudent17, IcStudent18, IcStudent19, IcStudent2, IcStudent20, IcStudent21, IcStudent22, IcStudent23, IcStudent24, IcStudent26, IcStudent27, IcStudent28, IcStudent29, IcStudent3, IcStudent30, IcStudent31, IcStudent32, IcStudent33, IcStudent34, IcStudent35, IcStudent38, IcStudent39, IcStudent4, IcStudent40, IcStudent41, IcStudent42, IcStudent43, IcStudent44, IcStudent46, IcStudent47, IcStudent48, IcStudent49, IcStudent5, IcStudent50, IcStudent6, IcStudent7, IcStudent8, IcStudent9 } from '../../../icons/Students/IcStudents';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';

const StudentIconList = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  font-size: 3em;
  font-size: 3rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(6, 1fr);
  `}
`

const StudentIconItem = styled.div`
  cursor: pointer;
  svg {
    display: flex;
  }
  :hover {
    background-color: ${props => props.theme.hoverColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    transition: background-color 0.2s ease;
  }
`

const StudentIcon = () => {
  const studentIconArr = [
    <IcStudent1 />, <IcStudent2 />, <IcStudent3 />, <IcStudent4 />, <IcStudent5 />,
    <IcStudent6 />, <IcStudent7 />, <IcStudent8 />, <IcStudent9 />, <IcStudent10 />,
    <IcStudent11 />, <IcStudent12 />, <IcStudent13 />, <IcStudent14 />, <IcStudent15 />,
    <IcStudent16 />, <IcStudent17 />, <IcStudent18 />, <IcStudent19 />, <IcStudent20 />,
    <IcStudent21 />, <IcStudent22 />, <IcStudent23 />, <IcStudent24 />, <IcNameTable />,
    <IcStudent26 />, <IcStudent27 />, <IcStudent28 />, <IcStudent29 />, <IcStudent30 />,
    <IcStudent31 />, <IcStudent32 />, <IcStudent33 />, <IcStudent34 />, <IcStudent35 />,
    <IcNameTable />, <IcNameTable />, <IcStudent38 />, <IcStudent39 />, <IcStudent40 />,
    <IcStudent41 />, <IcStudent42 />, <IcNameTable />, <IcStudent43 />, <IcStudent44 />,
    <IcStudent46 />, <IcStudent47 />, <IcStudent48 />, <IcStudent49 />, <IcStudent50 />
  ]
  return (<PopupContainer>
    <StudentIconList>
      {studentIconArr.map((item, index) => {
        return <StudentIconItem key={index}>{item}</StudentIconItem>
      })}
    </StudentIconList>
  </PopupContainer>);
}

export default StudentIcon;