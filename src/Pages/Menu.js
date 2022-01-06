import React, { useState } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import styled from 'styled-components';
import useMe from '../Hooks/useMe';
import { BsGrid3X3GapFill, BsFilterLeft } from "react-icons/bs";
import { ToLeft, ToRight } from '../Animations/MenuBtn';
import GridType from '../Components/Menu/GridType';
import ListType from '../Components/Menu/ListType';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`

const SeeType = styled.div`
  text-align: end;
  display: grid;
  justify-items: flex-end;
`

const Type = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  background-color: ${props => props.theme.bgColor};
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
  }
`

const Background = styled.div`
  position: absolute;
  left: 0;
  transform: translateX(0%);
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => !props.init && (props.seeType === "list" ? ToLeft : ToRight)} 1s ease forwards;
`

const ListTypeIcon = styled.div`
`

const GridTypeIcon = styled.div`
`

const Menu = () => {
  const [seeType, setSeeType] = useState("list")
  const [init, setInit] = useState(true)

  const me = useMe()

  // 런치메뉴를 눌렀을 때 me가 있으면 lmSetting 생성, 없으면 삭제
  const onClickLunchmenu = () => {
    if (me) {
      localStorage.setItem("lmSetting", JSON.stringify({
        areaCode: me?.areaCode,
        schoolCode: me?.schoolCode,
        schoolName: me?.schoolName,
        date: new window.Date()
      }))
    } else {
      localStorage.setItem("lmSetting", JSON.stringify({
        areaCode: undefined,
        schoolCode: undefined,
        schoolName: undefined,
        date: new window.Date()
      }))
    }
  }

  const onClickType = (type) => {
    setInit(false)
    setSeeType(type)
  }

  return (<BasicContainer>
    <Container>
      <SeeType>
        <Type>
          <ListTypeIcon seeType={seeType === "list"} className="see_type_icon" onClick={() => onClickType("list")}>
            <BsFilterLeft />
          </ListTypeIcon>
          <GridTypeIcon seeType={seeType === "grid"} className="see_type_icon" onClick={() => onClickType("grid")}>
            <BsGrid3X3GapFill />
          </GridTypeIcon>
          <Background seeType={seeType} init={init}>
            {seeType === "list" ? <BsFilterLeft /> : <BsGrid3X3GapFill />}
          </Background>
        </Type>
      </SeeType>
      {seeType === "list" && <ListType onClickLunchmenu={onClickLunchmenu} />}
      {seeType === "grid" && <GridType onClickLunchmenu={onClickLunchmenu} />}
    </Container>
  </BasicContainer>);
}

export default Menu;