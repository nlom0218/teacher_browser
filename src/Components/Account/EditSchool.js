import { gql, useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { ME_QUERY } from '../../Hooks/useMe';
import BtnContainer from './styled/BtnContainer';
import DelBtn from './styled/DelBtn';
import RegisterBtn from './styled/RegisterBtn';

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

const EditSchool = ({ userEmail, schoolName, schoolAdress }) => {
  const onClickRegisterBtn = () => {
    inPopup("registerSchool")
  }
  const [deleteSchoolInfo, { loading }] = useMutation(DELETE_SCHOOL_INFO_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onClickDelBtn = () => {
    if (loading) {
      return
    }
    if (schoolName) {
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
    {schoolAdress && <SchoolAdress>{schoolAdress}</SchoolAdress>}
    <BtnContainer>
      <RegisterBtn onClick={onClickRegisterBtn}>{schoolName ? "변경하기" : "등록하기"}</RegisterBtn>
      <DelBtn onClick={onClickDelBtn}>학교정보 삭제하기</DelBtn>
    </BtnContainer>
  </Container>);
}

export default EditSchool;