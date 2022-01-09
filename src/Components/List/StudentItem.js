import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';
import { useDrag } from "react-dnd"

const Layout = styled.div`
  :hover {
    background-color: ${props => props.theme.hoverColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
  background-color: ${props => props.isSeleted && props.theme.hoverColor};
  border-radius: ${props => props.isSeleted && "5px"};
  border-radius: ${props => props.isSeleted && "0.3125rem"};
  transition: background-color 1s ease;
  padding: 10px;
  padding: 0.625rem;
  cursor: pointer;
  a {
    display: grid;
    row-gap: 5px;
    row-gap: 0.3125rem;
  }
`

const StudentName = styled.div`
`

const StudentNum = styled.div`
  font-size: 0.85em;
  font-size: 0.85rem;
  opacity: 0.8;
`

const StudentItem = ({ item, setSomeDragging, studentId, seeNum }) => {
  // 학생 이름 drag를 위해 필요한 것
  // 아래의 두번째 인자를 드래그 할 곳에 참조로 넣는다.
  const [{ isDragging }, drag] = useDrag(() => ({
    // type은 필수값으로 drop하는 곳의 accept과 같아야 한다.
    type: "STUDENT",

    // drag를 통해 전달할 내용들
    item: { studentId: item._id, studentName: item.studentName },

    // 현재 드래그를 하고 있는지 안하고 있는지 확인하기 위한 것....(블로그 참고)
    // useDrag의 첫 번째 인자의 객체에 속해 있는 isDragging으로 알 수 있다.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]
  )

  // useDrag의 isDragging을 보며 someDragging값 바꾸기
  useEffect(() => {
    isDragging ? setSomeDragging(true) : setSomeDragging(false)
  }, [isDragging, setSomeDragging])
  return (<Layout ref={drag} isSeleted={studentId === item._id}>
    <Link to={`${routes.list}/student/${item._id}`}>
      <StudentName>{item.studentName}</StudentName>
      {seeNum && <StudentNum>{item.studentNumber ? item.studentNumber : "번호가 없습니다."}</StudentNum>}
    </Link>
  </Layout>);
}

export default StudentItem;