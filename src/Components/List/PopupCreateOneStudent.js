import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import styled from 'styled-components';


const Form = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const NameInput = styled.input`
  grid-column: 1 / -1;
  padding: 12px 20px;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
  }
`

const GengerBtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    font-size: 1.25rem;
    font-size: 1.25em;
    cursor: pointer;
  }
`

const GengerBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`

const SubmitInput = styled.input`
  justify-self: flex-end;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const ErrMsg = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: ${props => props.theme.redColor};
`

const PopupCreateOneStudent = ({ createStudent, loading, email, errMsg, setErrMsg }) => {
  const [gender, setGender] = useState(undefined)
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    if (!gender) {
      setErrMsg("성별을 선택하지 않았습니다.")
      return
    }
    if (loading) {
      return
    }
    const { name } = data
    createStudent({
      variables: {
        teacherEmail: email,
        studentString: JSON.stringify([{ name, gender }])
      }
    })
  }
  const onClickGender = (type) => {
    setGender(type)
    setErrMsg(undefined)
  }
  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <NameInput
      {...register("name", {
        required: true,
        onChange: () => setErrMsg(undefined)
      })}
      type="text"
      autoComplete="off"
      placeholder="학생 이름을 입력해주세요."
    />
    <GengerBtnContainer>
      <GengerBtn gender={gender}>
        <div className="gender_icon" onClick={() => onClickGender("male")}>
          {gender === "male" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        </div>
        <div>남자</div>
      </GengerBtn>
      <GengerBtn gender={gender}>
        <div className="gender_icon" onClick={() => onClickGender("female")}>
          {gender === "female" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
        </div>
        <div>여자</div>
      </GengerBtn>
    </GengerBtnContainer>
    <SubmitInput
      type="submit"
      value="생성"
    />
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
  </Form>);
}

export default PopupCreateOneStudent;