import React from "react";
import styled from "styled-components";

const Link = styled.div`
  display: grid;
  row-gap: 15px;
  row-gap: 0.625rem;
  justify-items: center;
  align-items: flex-start;
`;

const LinkIconLayout = styled.div`
  padding: 15px;
  padding: 1rem;
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 50%;
`;

const LinkIcon = styled.div`
  background: ${(props) => `url(${props.link}/favicon.ico)`};
  background-size: cover;
  background-position: center;
  width: 24px;
  width: 1.5rem;
  height: 24px;
  height: 1.5rem;
`;

const LinkTitle = styled.div`
  text-align: center;
  line-height: 120%;
`;

const LinkItem = ({ magic, info, link, title }) => {
  return (
    <Link
      ref={magic.innerRef}
      {...magic.draggableProps}
      {...magic.dragHandleProps}
      isDragging={info.isDragging}
    >
      <LinkIconLayout>
        <LinkIcon link={link}></LinkIcon>
      </LinkIconLayout>
      <LinkTitle>{title}</LinkTitle>
    </Link>
  );
};

export default LinkItem;
