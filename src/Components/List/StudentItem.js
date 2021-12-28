import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';

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

const StudentItem = ({ item }) => {
  return (<Layout>
    <Link to={`${routes.list}/student/${item._id}`}>
      <StudentName>{item.studentName}</StudentName>
    </Link>
  </Layout>);
}

export default StudentItem;