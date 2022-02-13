import React, { useEffect } from 'react';
import styled from 'styled-components';
import { color } from '../../styles';
import { AiOutlineClose } from "react-icons/ai"

const Container = styled.div`
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.type === "error" ? props.theme.redColor : props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  box-shadow: ${color.boxShadow};
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  z-index: 10;
  text-align: center;
  line-height: 120%;
`

const CloseIcon = styled.div`
  cursor: pointer;
  svg {
    display: flex;
  }
  border-radius: 50%;
  :hover {
    background-color: ${props => props.theme.popupBgColor};
    transition: background-color 0.4s ease;
  }
`

// msg: 메시지 내용
// setMsg: msg state값 바꾸는 함수
// type: 메시지 타입(error, success // warning, info)
// time: 메시지 내용이 사라지는 시간
const AlertMessage = ({ msg, setMsg, type, time }) => {

  const onClickClose = () => {
    setMsg(undefined)
  }

  useEffect(() => {
    if (time) {

      let timer = setTimeout(() => {
        setMsg(undefined)
      }, time)

      // setTimeout 타이머를 사용한 경우 타이머를 해재해야 한다.
      // 컴포넌트가 사라질 때 타이머를 없애는 코드 추가 필요
      return () => { clearTimeout(timer) }
    }
  }, [msg])

  return (<React.Fragment>
    {msg &&
      <Container type={type}>
        <div>{msg}</div>
        {!time && <CloseIcon onClick={onClickClose}><AiOutlineClose /></CloseIcon>}
      </Container>}
  </React.Fragment>);
}

export default AlertMessage;