import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../Components/Shared/BasicContainer';

const ListItem = () => {
  const { order } = useParams()
  // const [localListItem, setLocalListItem] = useState(undefined)

  // const processList = () => {
  //   const isLocal = order.includes("local")
  //   if (isLocal) {
  //     setLocalListItem(JSON.parse(localStorage.getItem("localList")).filter(item => item.order === order)[0])
  //     return []
  //   } else {

  //   }
  // }
  // console.log(processList());
  return (<BasicContainer menuItem={true}>
    {/* {processList()} */}
  </BasicContainer>);
}

export default ListItem;