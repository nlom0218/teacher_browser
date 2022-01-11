import React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from "styled-components";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes';
import { outPopup } from '../../../apollo';

const ListItem = styled.div`
  display : grid;
  grid-template-rows : 1fr 1fr;
  row-gap : 10px;
  row-gap : 0.625rem;
  justify-items : center;
  cursor : pointer;
`

const ListIcon = styled.div`
  font-size : 2.5em;
  font-size : 2.5rem;
  svg {
    display : flex;
  }
`

const ListName = styled.div`
`


const StudentListItem = ({item}) => {
    const navigate = useNavigate()
    const [isEnterIcon, setIsEnterIcon] = useState(false)
    const onMouseEnterIcon = () => setIsEnterIcon(true)
    const onMouseLeaveIcon = () => setIsEnterIcon(false)
    const onClickItem = () => {
        navigate(`${routes.draw}/${item.listId}`)
        outPopup()
    }
    return( <ListItem 
    onMouseEnter={onMouseEnterIcon} 
    onMouseLeave={onMouseLeaveIcon}
    onClick={onClickItem}
    >
        <ListIcon>{item.listIcon ? item.listIcon 
        :
         (isEnterIcon ? <FcOpenedFolder/> : <FcFolder/> )
         }
         </ListIcon>
        <ListName>{item.listName}</ListName>
      </ListItem>);
}

export default StudentListItem;