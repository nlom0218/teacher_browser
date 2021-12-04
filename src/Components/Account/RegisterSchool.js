import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcSearch } from 'react-icons/fc';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { gql, useMutation } from '@apollo/client';
import useMe, { ME_QUERY } from '../../Hooks/useMe';
import { FaTimes } from 'react-icons/fa';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userEmail: String!, $schoolName: String, $schoolCode: String, $areaCode: String) {
    updateUser(userEmail: $userEmail, schoolName: $schoolName, schoolCode: $schoolCode, areaCode: $areaCode) {
      ok
      error
    }
  }
`

const Container = styled.div``

const SchoolName = styled.div``

const RegisterBtn = styled.div``

const DelBtn = styled.div``

const RegisterContainer = styled.div`
  position: absolute;
  top: 20px;
  top: 1.25rem;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 90%;
  ${customMedia.greaterThan("tablet")`
    width: 80%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%
  `}
`

const CloseBtn = styled.div`
  color: ${color.red};
  text-align: end;
  margin-right: 10px;
  margin-right: 0.625rem;
  cursor: pointer;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`

const RegisterPage = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  border-radius: 10px;
  display: grid;
  row-gap: 10px;
  row-gap: 1.25rem;
`

const SearchForm = styled.form`
  width: 100%;
  display: grid;
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
  color: ${color.red};
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
`

const SchoolList = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
`

const SchoolItem = styled.div`
  cursor: pointer;
  line-height: 120%;
  :hover {
    text-decoration: underline;
  }
`

const RegisterSchool = ({ schoolName }) => {
  const me = useMe()
  const [registerPage, setRegisterPage] = useState(false)
  const [schoolInfo, setSchoolInfo] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const onClickRegisterBtn = () => setRegisterPage(true)
  const findSchool = (school) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=5&SCHUL_NM=${school}`)
      .then(res => res.json())
      .then(data => {
        if (data.RESULT) {
          setErrMsg("검색 결과가 없습니다.")
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
      })
  }
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = (data) => {
    const { school } = data
    if (school.length < 2) {
      setErrMsg("두 글자 이상 입력해주세요.")
      return
    }
    findSchool(school)
  }
  const onChangeInput = () => {
    setErrMsg(undefined)
    setSchoolInfo(undefined)
  }
  const onCompleted = () => {
    onClickCloseBtn()
  }
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }]
  })
  const onClickSchool = (areaCode, schoolCode, schoolName) => {
    if (loading) {
      return
    }
    if (!me) {
      return
    }
    updateUser({
      variables: {
        userEmail: me?.email,
        areaCode,
        schoolCode,
        schoolName
      }
    })
  }
  const onClickCloseBtn = () => {
    setRegisterPage(false)
    setSchoolInfo(undefined)
    setValue("school", "")
  }
  return (<Container>
    <SchoolName>{schoolName ? schoolName : "등록된 학교가 없습니다."}</SchoolName>
    <RegisterBtn onClick={onClickRegisterBtn}>{schoolName ? "변경하기" : "등록하기"}</RegisterBtn>
    <DelBtn>학교정보 삭제하기</DelBtn>
    {registerPage &&
      <RegisterContainer>
        <CloseBtn onClick={onClickCloseBtn}><FaTimes /></CloseBtn>
        <RegisterPage>
          <SearchForm onSubmit={handleSubmit(onSubmit)}>
            <SearchInput
              {...register("school", {
                required: true,
                onChange: onChangeInput,
              })}
              type="text"
              autoComplete="off"
              placeholder="학교이름을 입력해주세요. ex) 다목초 또는 다목초등학교"
            />
            <FcSearch onClick={handleSubmit(onSubmit)} />
          </SearchForm>
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
          {schoolInfo && <SchoolList>
            {schoolInfo.map((item, index) => {
              return <SchoolItem key={index} onClick={() => onClickSchool(item.areaCode, item.schoolCode, item.schoolName)}>
                {item.areaName} {item.schoolName} {item.schoolAdress}
              </SchoolItem>
            })}
          </SchoolList>}
        </RegisterPage>
      </RegisterContainer>
    }
  </Container>);
}

export default RegisterSchool;