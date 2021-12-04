import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcSearch } from 'react-icons/fc';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';

const Container = styled.div``

const SchoolName = styled.div``

const RegisterBtn = styled.div``

const DelBtn = styled.div``

const RegisterPage = styled.div`
  position: absolute;
  background-color: red;
  top: 40px;
  top: 2.5rem;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 90%;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  border-radius: 10px;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    width: 80%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%
  `}
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
`

const RegisterSchool = ({ schoolName, schoolCode, areaCode }) => {
  const [registerPage, setRegisterPage] = useState(false)
  const [schoolInfo, setSchoolInfo] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const onClickRegisterBtn = () => setRegisterPage(true)
  const findSchool = (school) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=10&SCHUL_NM=${school}`)
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
          return { areaCode, areaName, schoolCode, schoolName }
        })
        setSchoolInfo(schoolInfo);
      })
  }
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    const { school } = data
    findSchool(school)
  }
  const onChangeInput = () => setErrMsg(undefined)
  return (<Container>
    <SchoolName>{schoolName ? schoolName : "등록된 학교가 없습니다."}</SchoolName>
    <RegisterBtn onClick={onClickRegisterBtn}>{schoolName ? "변경하기" : "등록하기"}</RegisterBtn>
    <DelBtn>학교정보 삭제하기</DelBtn>
    {registerPage && <RegisterPage>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          {...register("school", {
            required: true,
            onChange: onChangeInput
          })}
          type="text"
          autoComplete="off"
          placeholder="학교이름을 입력해주세요."
        />
        <FcSearch onClick={handleSubmit(onSubmit)} />
      </SearchForm>
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    </RegisterPage>}
  </Container>);
}

export default RegisterSchool;