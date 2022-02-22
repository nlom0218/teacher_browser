import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { inPopup } from '../../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import routes from '../../../routes';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import AttendSelectedStudentItem from './AttendSelectedStudentItem';
import { CalenderPopupTitle } from './PopupLayout';

const Container = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`

const StudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: flex-start;
  column-gap: 1px;
  column-gap: 0.0625rem;
  row-gap: 1px;
  row-gap: 0.0625rem;
  background-color: ${props => props.theme.hoverColor};
  border: 1px solid ${props => props.theme.hoverColor};
`

const NoDataMsg = styled.div`
  align-self: flex-start;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
`

const Msg = styled.div`
  line-height: 160%;
`

const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  cursor: pointer;
`

const AttendSelectedStudent = () => {
  const navigate = useNavigate()

  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: { sort: "name", trash: false }
  })

  const onClickBtn = () => {
    navigate(routes.list)
    inPopup("createStudent")
  }

  if (loading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer maxHeight={true}>
    <Container>
      <CalenderPopupTitle>학생선택</CalenderPopupTitle>
      {data?.seeAllStudent.length === 0 ?
        <NoDataMsg>
          <Msg>생성된 학생이 없습니다.</Msg>
          <Msg>명렬표에서 학생을 생성해주세요.</Msg>
          <Btn onClick={onClickBtn}>명렬표로 이동하기</Btn>
        </NoDataMsg>
        :
        <StudentList>
          {data?.seeAllStudent.map((item, index) => {
            return <AttendSelectedStudentItem key={index} item={item} />
          })}
          {data?.seeAllStudent.length % 2 === 1 && <AttendSelectedStudentItem />}
        </StudentList>}
    </Container>
  </PopupContainer>);
}

export default AttendSelectedStudent;