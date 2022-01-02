import { useQuery } from '@apollo/client';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import routes from '../../../routes';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';
import { SEE_ALL_STUDENT_QUERY } from '../StudentList';

const StudentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 30px;
  row-gap: 1.875rem;
  height: 96%;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0);
`

const StudnetList = styled.div`
  max-height: 100%;
  align-self: flex-start;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    column-gap: 2.5rem;
  `}
`

const AddStudentBtn = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  transition: background-color 1s ease, color 1s ease;
`

const StudentItem = styled.div`
  padding: 10px;
  padding: 0.625rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.hoverColor};
    transition: background-color 0.6s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
`

const SeeStudents = () => {
  const navigate = useNavigate()

  const { data } = useQuery(SEE_ALL_STUDENT_QUERY)

  const onClickName = ({ id }) => {
    outPopup()
    navigate(`${routes.list}/student/${id}`)
  }

  const onClickAddBtn = () => {
    window.alert("학생 추가하기, 팝업안의 팝업")
  }
  return (<PopupContainer maxHeight={true}>
    <StudentContainer>
      <StudnetList>
        {data?.seeAllStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          data?.seeAllStudent?.map((item, index) => {
            return <StudentItem onClick={() => onClickName(item._id)} key={index}>{item.studentName} </StudentItem>
          })}
      </StudnetList>
      <AddStudentBtn onClick={onClickAddBtn}>학생 생성하기</AddStudentBtn>
    </StudentContainer>
  </PopupContainer>);
}

export default SeeStudents;