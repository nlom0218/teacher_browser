import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.hover && props.theme.cardBg};
  background-color: ${(props) => props.isDragging && props.theme.cardBg};
  border-radius: 10px;
  border-radius: 0.625rem;
  transition: background-color 0.4s ease;
  padding: 20px;
  padding: 1.25rem;
`;

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
  transition: background-color 1s ease;
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

const LinkSetting = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  display: grid;
  justify-items: flex-end;
  z-index: 10;
`;

const SettingIcon = styled.div``;

const SettingList = styled.div`
  display: grid;
  border-radius: 10px;
`;

const SettingItem = styled.div`
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
  transition: background-color 1s ease;
  :hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  :first-child {
    border-bottom-left-radius: 0px;
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0px;
    border-bottom-right-radius: 0rem;
  }
  :last-child {
    border-top-left-radius: 0px;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0px;
    border-top-right-radius: 0rem;
  }
`;

const LinkItem = ({ magic, info, link, title }) => {
  const [settingMode, setSettingMode] = useState(false);
  const [hover, setHover] = useState(false);
  const onClickLink = () => {
    window.open(link);
  };
  const onClickSettingBtn = () => {
    setSettingMode((prev) => !prev);
  };

  const onClickEditBtn = () => {};

  const onClickDeleteBtn = () => {};

  return (
    <Container
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setSettingMode(false);
      }}
      hover={hover}
      isDragging={info.isDragging}
      ref={magic.innerRef}
      {...magic.draggableProps}
      {...magic.dragHandleProps}
    >
      <Link onClick={onClickLink}>
        <LinkIconLayout>
          <LinkIcon link={link}></LinkIcon>
        </LinkIconLayout>
        <LinkTitle>{title}</LinkTitle>
      </Link>
      {hover && (
        <LinkSetting>
          <SettingIcon onClick={onClickSettingBtn}>
            <AiOutlineMenu />
          </SettingIcon>
          {settingMode && (
            <SettingList settingMode={settingMode}>
              <SettingItem onClick={onClickEditBtn}>바로가기 수정</SettingItem>
              <SettingItem onClick={onClickDeleteBtn}>
                바로가기 삭제
              </SettingItem>
            </SettingList>
          )}
        </LinkSetting>
      )}
    </Container>
  );
};

export default React.memo(LinkItem);
