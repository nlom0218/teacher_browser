import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../Components/Shared/BasicContainer';

const ListItem = () => {
  const { order } = useParams()
  console.log(order);
  return (<BasicContainer menuItem={true}>

  </BasicContainer>);
}

export default ListItem;