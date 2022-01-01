import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AllList from '../Components/List/AllList';
import DetailList from '../Components/List/DetailList';
import StudentList from '../Components/List/StudentList';
import BasicContainer from '../Components/Shared/BasicContainer';
import { color, customMedia } from '../styles';

const Container = styled.div`
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: flex-start;
  position: absolute;
`

const SuccessMsg = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  box-shadow: ${color.boxShadow};
`

const List = () => {
  // 드래그 중일 때와 아닐 때를 나타내기 위한 값
  const [someDragging, setSomeDragging] = useState(false)

  // 드래그 성공 및 메시지를 띄우기 위한 값
  const [successMsg, setSuccessMsg] = useState(undefined)

  // url 주소에서 가져오는 값들
  const { type, id } = useParams()

  // 무언가를 드래그 중일 때 successMsg 초기화
  useEffect(() => {
    if (successMsg) {
      setSuccessMsg(undefined)
    }
  }, [someDragging])

  // successMsg를 5초 후에 초기화
  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg(undefined)
      }, 5000)
    }
  }, [successMsg])
  return (<BasicContainer menuItem={true}>
    <Container>
      {!type && <AllList setSomeDragging={setSomeDragging} someDragging={someDragging} setSuccessMsg={setSuccessMsg} />}
      {type === "student" && "학생 상세 정보 보기 및 수정"}
      {type === "detail" && <DetailList />}
      <StudentList setSomeDragging={setSomeDragging} />
    </Container>
    {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
  </BasicContainer>);
}

export default List;