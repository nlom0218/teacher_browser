import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import PopupContainer from '../../Shared/PopupContainer';
import { SEE_ALL_STUDENT_QUERY } from '../StudentList';
import { Btn, Container, Item, List } from '../styled/PopupSeeStudent';

const AddManyStudent = ({ inStudent }) => {
  const [outStudent, setOutStudent] = useState([])
  console.log(outStudent);
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY)
  useEffect(() => {
    if (data && inStudent) {
      const inStudentName = inStudent.map(item => item.studentName)
      const newOutStudent = data?.seeAllStudent.filter(item => {
        return !inStudentName.includes(item.studentName)
      })
      setOutStudent(newOutStudent)
      return
    }
    if (data) {
      setOutStudent(data?.seeAllStudent)
    }
  }, [data])
  return (<PopupContainer maxHeight={true}>
    <Container>
      <List>
        {outStudent.length === 0 ? <div className="noStudnet">학생들이 모두 포함되어 있습니다.</div>
          :
          outStudent.map((item, index) => {
            return <Item key={index} addStudent={true}>
              <div>{item.studentName}</div>
              <div><RiCheckboxLine /><RiCheckboxBlankLine /></div>
            </Item>
          })
        }
      </List>
      <Btn>학생 추가하기</Btn>
    </Container>
  </PopupContainer>);
}

export default AddManyStudent;