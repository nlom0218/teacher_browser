import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import LinkItem from "./LinkItem";

const Container = styled.div`
  min-width: 80%;
  max-width: 80%;
  justify-self: center;
  align-self: center;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const links = [
  {
    title: "네이버네이",
    link: "https://www.naver.com",
    id: 1,
  },
  { title: "다음", link: "https://www.daum.net", id: 2 },
  { title: "구글", link: "https://www.google.com", id: 3 },
  {
    title: "네이버",
    link: "https://www.naver.com",
    id: 4,
  },
  { title: "다음", link: "https://www.daum.net", id: 5 },
  { title: "구글", link: "https://www.google.com", id: 6 },
  {
    title: "네이버",
    link: "https://www.naver.com",
    id: 7,
  },
  { title: "다음", link: "https://www.daum.net", id: 8 },
  { title: "구글", link: "https://www.google.com", id: 9 },
];

const LinkContents = () => {
  const onDragEnd = (arg) => {};
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links" direction="horizontal">
          {(magic, info) => (
            <Links
              boardId="links"
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {links.map((item, index) => {
                return (
                  <Draggable
                    key={item.id + ""}
                    draggableId={item.id + ""}
                    index={index}
                  >
                    {(magic, info) => (
                      <LinkItem magic={magic} info={info} {...item} />
                    )}
                  </Draggable>
                );
              })}
            </Links>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default LinkContents;
