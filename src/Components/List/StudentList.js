import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import { color } from '../../styles';
import CreateStudent from './Popup/CreateStudent';
import StudentItem from './StudentItem';

export const SEE_ALL_STUDENT_QUERY = gql`
  query Query {
    seeAllStudent {
      _id
      teacherEmail
      studentName
      listId
    } 
  }
`

const StudentContainer = styled.div`
  position: absolute;
  right: 1%;
  top: 2%;
  width: 24%;
  height: 96%;
  min-height: 96%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 30px;
  row-gap: 1.875rem;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
`

const SStudentList = styled.div`
  max-height: 100%;
  align-self: flex-start;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  .noStudnet {
    text-align: center;
    color: ${props => props.theme.redColor};
    transition: color 1s ease;
  }
`

const AddStudentBtn = styled.div`
  justify-self: center;
  cursor: pointer;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  transition: background-color 1s ease, color 1s ease;
`

const StudentList = ({ setSomeDragging }) => {
  const isPopup = useReactiveVar(isPopupVar)

  // studentArray => 복수생성할 때 이미 존재하는 학생들의 이름과 새롭게 생성하는 학생들의 이름을 비교하기 위한 배열
  // 중복생성을 막기 위함
  const [existStudentArray, setExistStudentArray] = useState(undefined)

  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY)

  // 학생 생성을 위한 팝업창
  const onClickAddBtn = () => inPopup("createStudent")

  // 학생 정보가 불러와지면 existStudentArray 값 생성
  useEffect(() => {
    if (data) {
      const newExistStudentArray = data?.seeAllStudent.map((item) => item.studentName)
      setExistStudentArray(newExistStudentArray)
    }
  }, [data])
  return (<StudentContainer>
    <SStudentList>
      {data?.seeAllStudent?.length === 0 ?
        <div className="noStudnet">생성된 학생이 없습니다.</div>
        :
        data?.seeAllStudent?.map((item, index) => {
          return <StudentItem key={index} item={item} setSomeDragging={setSomeDragging} />
        })}
    </SStudentList>
    <AddStudentBtn onClick={onClickAddBtn}>학생 생성하기</AddStudentBtn>
    {isPopup === "createStudent" && <CreateStudent existStudentArray={existStudentArray} />}
  </StudentContainer>);
}

export default StudentList;