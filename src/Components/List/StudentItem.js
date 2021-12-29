import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';
import { useDrag } from "react-dnd"

const Layout = styled.div`
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

const StudentIcon = styled.div``

const StudentName = styled.div``

const StudentItem = ({ item, setSomeDragging }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "STUDENT",
    item: { studentId: item._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  useEffect(() => {
    isDragging ? setSomeDragging(true) : setSomeDragging(false)
  }, [isDragging, setSomeDragging])
  return (<Layout ref={drag}>
    <Link to={`${routes.list}/student/${item._id}`}>
      <StudentName>{item.studentName}</StudentName>
    </Link>
  </Layout>);
}

export default StudentItem;