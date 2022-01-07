import styled from "styled-components";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import React, { useState } from "react";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
import { outPopup } from "../../../apollo";

const ListItem = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
  cursor: pointer;
`;

const ListIcon = styled.div`
  font-size: 2.5em;
  font-size: 2.5rem;
`;

const ListName = styled.div``;

const StudentListItem = ({ item }) => {
  const navigate = useNavigate();
  const [isEnterIcon, setIsEnterIcon] = useState(false);
  const onMouseEnterIcon = () => setIsEnterIcon(true);
  const onMouseLeaveIcon = () => setIsEnterIcon(false);
  const onClickItem = () => {
    navigate(`${routes.order}/${item.listId}`);
    outPopup();
  };

  return (
    <ListItem
      onClick={onClickItem}
      onMouseEnter={onMouseEnterIcon}
      onMouseLeave={onMouseLeaveIcon}
    >
      <ListIcon>
        {item.listIcon ? (
          item.listIcon
        ) : isEnterIcon ? (
          <FcOpenedFolder />
        ) : (
          <FcFolder />
        )}
      </ListIcon>
      <ListName>{item.listName}</ListName>
    </ListItem>
  );
};

export default StudentListItem;
