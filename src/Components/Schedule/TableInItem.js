import React, { useState } from "react";
import styled from "styled-components";
import { CardFadeIn } from "../../Animations/Fade";
import RegisterScheduleOne from "./RegisterScheduleOne";
import { customMedia } from "../../styles";
import { useQuery } from "@apollo/client";
import { GET_TIMETABLE_DATA_QUERY } from "../../Graphql/TimeTable/query";

const TableItem = styled.div`
  position: relative;
  height: 100%;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: ${(props) => props.theme.cardBg};
  //background-color: ${(props) => props.color};
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr;
  opacity: ${(props) => (props.hoverContainer ? 0.6 : 1)};
`;

const SubjectName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
  line-height: 250%;
  font-size: 73%;
  ${customMedia.greaterThan("tablet")`
   font-size: ${(props) => props.fontSize}em;
  font-size: ${(props) => props.fontSize}rem;
  `}
`;
const SPAN = styled.span`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const HoverContainer = styled.div`
  display: grid;
  justify-items: center;
  align-self: center;
  align-items: center;
  font-size: 0.8rem;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 1.875rem;
  padding-bottom: 30px;
  align-items: flex-end;
  background-color: ${(props) => props.theme.cardHoverBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${CardFadeIn} 0.6s ease forwards;
  color: ${(props) => props.theme.bgColor};
  overflow: hidden;
`;

const TableInItem = ({ item, index, color, tag, fontSize }) => {
  const [hoverContainer, setHoverContainer] = useState(false);
  const [timetableData, setTimetableData] = useState([]);
  console.log(item);
  const { data, loading, error } = useQuery(GET_TIMETABLE_DATA_QUERY);

  const onMouseEnter = () => {
    setHoverContainer(true);
  };
  const onMouseLeave = () => {
    setHoverContainer(false);
  };

  return (
    <TableItem
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      index={index}
      color={color}
    >
      <SubjectName
        item={item}
        color={color}
        tag={tag}
        fontSize={fontSize}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SPAN color={color}> &nbsp; {item} &nbsp; </SPAN>
        {hoverContainer === true ? (
          <HoverContainer>
            {tag}
            <RegisterScheduleOne item={item} color={color} tag={tag} />
          </HoverContainer>
        ) : null}
      </SubjectName>
    </TableItem>
  );
};

export default TableInItem;
