import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import LinkItem from "./LinkItem";
import { AiOutlinePlus } from "react-icons/ai";

const Container = styled.div`
  min-width: ${(props) => (props.linksNum > 4 ? "60" : props.linksNum * 12)}%;
  max-width: ${(props) => (props.linksNum > 4 ? "60" : props.linksNum * 12)}%;
  /* max-width: 60%; */
  justify-self: center;
  align-self: center;
`;

const LinksLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.linksNum > 4 ? "1fr" : `${props.linksNum}fr 1fr`};
  column-gap: 40px;
  column-gap: 2.5rem;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.linksNum}, 1fr)`};
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const PlusLayout = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  line-height: 120%;
  align-self: flex-start;
`;

const PlusBtn = styled.div`
  background-color: ${(props) => props.theme.originBgColor};
  padding: 15px;
  padding: 1rem;
  border-radius: 50%;
  svg {
    display: flex;
    width: 24px;
    width: 1.5rem;
    height: 24px;
    height: 1.5rem;
  }
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
    title: "인디스쿨",
    link: "https://www.indischool.com",
    id: 4,
  },
  { title: "다음", link: "https://www.daum.net", id: 5 },
  // { title: "구글", link: "https://www.google.com", id: 6 },
  // {
  //   title: "네이버",
  //   link: "https://www.naver.com",
  //   id: 7,
  // },
  // { title: "다음", link: "https://www.daum.net", id: 8 },
  // { title: "구글", link: "https://www.google.com", id: 9 },
];

const LinkContents = () => {
  const onDragEnd = (arg) => {};
  return (
    <Container linksNum={links.length}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links" direction="horizontal">
          {(magic, info) => (
            <LinksLayout linksNum={links.length}>
              <Links
                linksNum={links.length > 5 ? 5 : links.length}
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
              {links.length !== 5 && (
                <PlusLayout>
                  <PlusBtn>
                    <AiOutlinePlus />
                  </PlusBtn>
                  <div>바로가기 추가</div>
                </PlusLayout>
              )}
            </LinksLayout>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default LinkContents;
