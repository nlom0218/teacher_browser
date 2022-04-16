import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinkItem from "./LinkItem";
import { AiOutlinePlus } from "react-icons/ai";
import { useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../../apollo";
import RegisterHomeLinks from "./Popup/RegisterHomeLinks";
import { customMedia } from "../../styles";

const Container = styled.div`
  max-width: 100%;
  /* min-width: ${(props) =>
    props.linksNum === 1
      ? "30"
      : props.linksNum !== 0 &&
        (props.linksNum > 4 ? "80" : props.linksNum * 20)}%; */
  /* max-width: ${(props) =>
    props.linksNum === 1
      ? "30"
      : props.linksNum !== 0 &&
        (props.linksNum > 4 ? "80" : props.linksNum * 20)}%; */
  justify-self: center;
  align-self: center;
  display: grid;
  grid-template-columns: ${(props) =>
    props.linksNum === 0 || props.linksNum === 5
      ? "1fr"
      : `${props.linksNum}fr 1fr`};
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("desktop")`
    max-width: 80%;
  `}
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.linksNum}, 1fr)`};
  background-color: ${(props) => props.isDraggingOver && props.theme.blurColor};
  border-radius: 10px;
  border-radius: 0.625rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
  position: relative;
`;

const PlusLayout = styled.div`
  display: grid;
  row-gap: 15px;
  row-gap: 0.625rem;
  justify-items: center;
  align-items: flex-start;
  padding: 20px;
  padding: 1.25rem;
  text-align: center;
  line-height: 120%;
`;

const PlusBtn = styled.div`
  padding: 15px;
  padding: 1rem;
  background-color: ${(props) => props.theme.originBgColor};
  transition: background-color 1s ease;
  border-radius: 50%;
  cursor: pointer;
  svg {
    display: flex;
    width: 24px;
    width: 1.5rem;
    height: 24px;
    height: 1.5rem;
  }
`;

const LinkContents = ({ links, setMsg, setErrMsg, userEmail }) => {
  const isPopup = useReactiveVar(isPopupVar);

  const onDragEnd = (arg) => {
    // const { destination, source } = arg;
    // if (!destination) {
    //   return;
    // }
    // const copyLinks = [...links];
    // const moveObj = links[source.index];
    // copyLinks.splice(source.index, 1);
    // copyLinks.splice(destination.index, 0, moveObj);
    // setLinks(copyLinks);
  };

  const onClickCreateLink = () => {
    inPopup("createHomeLinks");
  };
  return (
    <Container linksNum={links.length}>
      {links.length !== 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="links" direction="horizontal">
            {(magic, info) => (
              <Links
                linksNum={links.length}
                boardId="links"
                ref={magic.innerRef}
                {...magic.droppableProps}
                isDraggingOver={info.isDraggingOver}
              >
                {links.map((item, index) => {
                  return (
                    <Draggable
                      key={item.ID + ""}
                      draggableId={item.ID + ""}
                      index={index}
                    >
                      {(magic, info) => (
                        <LinkItem
                          magic={magic}
                          info={info}
                          {...item}
                          userEmail={userEmail}
                          setMsg={setMsg}
                        />
                      )}
                    </Draggable>
                  );
                })}
              </Links>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {links.length < 5 && (
        <PlusLayout>
          <PlusBtn onClick={onClickCreateLink}>
            <AiOutlinePlus />
          </PlusBtn>
          <div>바로가기 추가</div>
        </PlusLayout>
      )}
      {isPopup === "createHomeLinks" && (
        <RegisterHomeLinks
          setMsg={setMsg}
          userEmail={userEmail}
          setErrMsg={setErrMsg}
          links={links}
        />
      )}
    </Container>
  );
};

export default LinkContents;
