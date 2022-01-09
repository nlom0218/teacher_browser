import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { inPopup, isPopupVar, isSeeStudentListVar } from '../apollo';
import AllList from '../Components/List/AllList';
import DetailList from '../Components/List/DetailList';
import DetailStudent from '../Components/List/DetailStudent';
import SeeStudents from '../Components/List/Popup/SeeStudents';
import StudentList from '../Components/List/StudentList';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from '../Hooks/useMe';
import useMedia from '../Hooks/useMedia';
import { color, customMedia } from '../styles';

const Container = styled.div`
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  display: grid;
  align-items: flex-start;
  position: relative;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 3fr 1fr;
  `}
`

const StudentIcon = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 1.75em;
  font-size: 1.75rem;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  :hover {
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: color 0.6s ease;
  }
    transition: background-color 0.6s ease;
`

const Layout = styled.div`
  height: 100%;
  min-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    padding: 40px;
    padding: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.isSeeStudentList ? "75%" : "100%"};
    transition: width 1s ease;
  `}
`

const SuccessMsg = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.error ? props.theme.redColor : props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  box-shadow: ${color.boxShadow};
`

const List = () => {
  const me = useMe()
  const isSeeStudentList = useReactiveVar(isSeeStudentListVar)
  const isPopup = useReactiveVar(isPopupVar)

  const media = useMedia()

  // 드래그 중일 때와 아닐 때를 나타내기 위한 값
  const [someDragging, setSomeDragging] = useState(false)

  // 드래그 성공 및 메시지를 띄우기 위한 값
  const [successMsg, setSuccessMsg] = useState(undefined)

  // url 주소에서 가져오는 값들
  const { type, id } = useParams()

  const onClickStudentIcon = () => inPopup("students")

  // 무언가를 드래그 중일 때 successMsg 초기화
  useEffect(() => {
    if (successMsg) {
      setSuccessMsg(undefined)
    }
  }, [someDragging])

  // successMsg를 5초 후에 초기화
  useEffect(() => {
    if (successMsg) {
      let timer = setTimeout(() => {
        setSuccessMsg(undefined)
      }, 5000)

      // setTimeout 타이머를 사용한 경우 타이머를 해재해야 한다.
      // 컴포넌트가 사라질 때 타이머를 없애는 코드 추가 필요
      return () => { clearTimeout(timer) }
    }
  }, [successMsg])
  return (<BasicContainer menuItem={true} notScroll={true}>
    <Container>
      <Layout isSeeStudentList={isSeeStudentList}>
        {!type && <AllList setSomeDragging={setSomeDragging} someDragging={someDragging} setSuccessMsg={setSuccessMsg} />}
        {type === "student" && <DetailStudent studentId={id} />}
        {type === "detail" && <DetailList listId={id} someDragging={someDragging} setSuccessMsg={setSuccessMsg} />}
      </Layout>
      {media === "Desktop" ?
        <StudentList setSomeDragging={setSomeDragging} studentId={id} meTag={me?.tag} />
        :
        <StudentIcon onClick={onClickStudentIcon}><FaUserFriends /></StudentIcon>
      }
    </Container>
    {successMsg && <SuccessMsg error={successMsg.ok === false}>{successMsg.msg}</SuccessMsg>}

    {/* 데스크탑이 아닐 때 학생 전체 리스트를 팝업으로 띄우기 */}
    {isPopup === "students" && <SeeStudents />}
  </BasicContainer>);
}

export default List;