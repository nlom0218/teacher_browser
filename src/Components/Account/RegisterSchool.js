import { gql, useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';

const DELETE_SCHOOL_INFO_MUTATION = gql`
  mutation DeleteSchoolInfo($userEmail: String!) {
    deleteSchoolInfo(userEmail: $userEmail) {
      ok
      error
    }
  }
`

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const SchoolName = styled.div`
`

const SchoolAdress = styled.div`
`

const BtnContainer = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  div {
    text-align: center;
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

const RegisterBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
`

const RegisterSchool = ({ userEmail, schoolName, setRegisterPage, schoolAdress, registerPage }) => {
  const onClickRegisterBtn = () => setRegisterPage(true)
  const [deleteSchoolInfo] = useMutation(DELETE_SCHOOL_INFO_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onClickDelBtn = () => {
    if (schoolName) {
      if (registerPage) {
        return
      }
      if (window.confirm("등록된 학교정보를 삭제하시겠습니까?")) {
        deleteSchoolInfo({
          variables: { userEmail }
        })
      } else {
        return
      }
    }
  }
  return (<Container>
    <SchoolName>{schoolName ? schoolName : "등록된 학교가 없습니다."}</SchoolName>
    <SchoolAdress>{schoolAdress}</SchoolAdress>
    <BtnContainer>
      <RegisterBtn onClick={onClickRegisterBtn}>{schoolName ? "변경하기" : "등록하기"}</RegisterBtn>
      <DelBtn onClick={onClickDelBtn}>학교정보 삭제하기</DelBtn>
    </BtnContainer>
  </Container>);
}

export default RegisterSchool;