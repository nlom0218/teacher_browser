import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import useMe, { ME_QUERY } from '../../Hooks/useMe';
import RegisterContainer from './RegisterContainer';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userEmail: String!, $schoolName: String, $schoolCode: String, $areaCode: String, $schoolAdress: String) {
    updateUser(userEmail: $userEmail, schoolName: $schoolName, schoolCode: $schoolCode, areaCode: $areaCode, schoolAdress: $schoolAdress) {
      ok
      error
    }
  }
`

const SearchForm = styled.form`
  width: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr auto;
  align-items: center;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`

const SearchInput = styled.input`
  width: 100%;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`

const ErrMsg = styled.div`
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
`

const SchoolList = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  /* padding-top: 20px;
  padding-top: 1.25rem;
  border-top: 1px solid ${props => props.theme.fontColor};
  transition: border-top 1s ease; */
`

const SchoolItem = styled.div`
  cursor: pointer;
  line-height: 120%;
  :hover {
    text-decoration: underline;
  }
`

const PageBtn = styled.div`
  text-align: end;
  cursor: pointer;
`


const RegisterSchool = ({ setRegisterPage }) => {
  const me = useMe()
  const [page, setPage] = useState(1)
  const [schoolInfo, setSchoolInfo] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const [preventSubmit, setPreventSubmit] = useState(false)
  // 다음페이지로 넘기기 위해서는 '다음 페이지'버튼 이용, 엔터로 다음페이지 넘기기 하지 않기
  const findSchool = (school) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=${page}&pSize=5&SCHUL_NM=${school}`)
      .then(res => res.json())
      .then(data => {
        if (data.RESULT) {
          setErrMsg("검색 결과가 없습니다.")
          setSchoolInfo(undefined)
          return
        }
        const schoolInfo = data.schoolInfo[1].row.map((item) => {
          const areaCode = item.ATPT_OFCDC_SC_CODE
          const areaName = item.ATPT_OFCDC_SC_NM
          const schoolCode = item.SD_SCHUL_CODE
          const schoolName = item.SCHUL_NM
          const schoolAdress = item.ORG_RDNMA
          return { areaCode, areaName, schoolCode, schoolName, schoolAdress }
        })
        setSchoolInfo(schoolInfo);
        setPage(prev => prev + 1)
      })
  }
  const { register, handleSubmit, setValue, getValues } = useForm()
  const onSubmit = (data) => {
    const { school } = data
    if (preventSubmit) {
      return
    }
    if (school.length < 2) {
      setErrMsg("두 글자 이상 입력해주세요.")
      return
    }
    setPreventSubmit(true)
    findSchool(school)
  }
  const onCompleted = () => {
    onChangeInput()
    setRegisterPage(false)
    setValue("school", "")
  }
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onClickSchool = (areaCode, schoolCode, schoolName, schoolAdress) => {
    if (!me) {
      return
    }
    updateUser({
      variables: {
        userEmail: me?.email,
        areaCode,
        schoolCode,
        schoolName,
        schoolAdress
      }
    })
  }
  const onChangeInput = () => {
    setPreventSubmit(false)
    setErrMsg(undefined)
    setSchoolInfo(undefined)
    setPage(1)
  }
  const onClickPageBtn = () => {
    findSchool(getValues("school"))
  }
  return (<RegisterContainer setRegisterPage={setRegisterPage}>
    <SearchForm onSubmit={handleSubmit(onSubmit)}>
      <SearchInput
        {...register("school", {
          required: true,
          onChange: onChangeInput,
        })}
        type="text"
        autoComplete="off"
        placeholder="학교이름을 입력해주세요. ex) 다목초 또는 다목초등학교"
        autoFocus
      />
      <FcSearch onClick={handleSubmit(onSubmit)} />
    </SearchForm>
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    {schoolInfo && <SchoolList>
      {schoolInfo.map((item, index) => {
        return <SchoolItem key={index} onClick={() => onClickSchool(item.areaCode, item.schoolCode, item.schoolName, item.schoolAdress)}>
          {item.areaName} {item.schoolName} {item.schoolAdress}
        </SchoolItem>
      })}
      {schoolInfo.length === 5 &&
        <PageBtn onClick={onClickPageBtn}>
          다음 페이지
          </PageBtn>}
    </SchoolList>}
  </RegisterContainer>);
}

export default RegisterSchool;