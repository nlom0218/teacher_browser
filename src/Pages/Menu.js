import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import useMe from "../Hooks/useMe";
import { BsGrid3X3GapFill, BsFilterLeft } from "react-icons/bs";
import { ToLeft, ToRight } from "../Animations/MenuBtn";
import GridType from "../Components/Menu/GridType";
import ListType from "../Components/Menu/ListType";
import { useReactiveVar } from "@apollo/client";
import { menuTypeVar, setMenuType } from "../apollo";
import useTitle from "../Hooks/useTitle";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`;

const SeeType = styled.div`
  text-align: end;
  display: grid;
  justify-items: flex-end;
`;

const Type = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 20px;
  border-radius: 1.25rem;
  .see_type_icon {
    padding: 10px 16px;
    padding: 0.625rem 1rem;
    border-radius: 20px;
    border-radius: 1.25rem;
    cursor: pointer;
  }
  svg {
    display: flex;
    font-size: 1em;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: ${(props) => props.theme.redColor};
  font-weight: 700;
  span {
    margin: 0px 10px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  transform: ${(props) => (props.seeType === "list" ? "translateX(0%)" : "translateX(100%)")};
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) => !props.init && (props.seeType === "list" ? ToLeft : ToRight)} 1s ease forwards;
`;

const ListTypeIcon = styled.div``;

const GridTypeIcon = styled.div``;

const Menu = () => {
  const titleUpdataer = useTitle("티처캔 | 메뉴");
  const menuType = useReactiveVar(menuTypeVar);

  const [init, setInit] = useState(true);

  const me = useMe();

  const onClickType = (type) => {
    setInit(false);
    setMenuType(type);
  };

  const onClickErrorMsg = () => {
    window.open("https://sparkly-corleggy-3e4.notion.site/23-4-3-8e84540280514b2b89c269872acb7049");
  };

  return (
    <BasicContainer>
      <Container>
        <SeeType>
          <Type>
            <ListTypeIcon seeType={menuType === "list"} className="see_type_icon" onClick={() => onClickType("list")}>
              <BsFilterLeft />
            </ListTypeIcon>
            <GridTypeIcon
              seeType={menuType === "grid" || null}
              className="see_type_icon"
              onClick={() => onClickType("grid")}
            >
              <BsGrid3X3GapFill />
            </GridTypeIcon>
            <Background seeType={menuType} init={init}>
              {menuType === "list" ? (
                <BsFilterLeft onClick={() => onClickType("grid")} />
              ) : (
                <BsGrid3X3GapFill onClick={() => onClickType("list")} />
              )}
            </Background>
          </Type>
        </SeeType>
        {menuType === "list" ? <ListType /> : <GridType />}
      </Container>
      <Error>
        학생 관련 데이터 오류에 대한 공지사항입니다.
        <span onClick={onClickErrorMsg}>공지 확인하기</span>
        불편을 드려 죄송합니다.
      </Error>
    </BasicContainer>
  );
};

export default Menu;
