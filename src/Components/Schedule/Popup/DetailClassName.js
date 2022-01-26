import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import {  } from '../../../Graphql/Student/mutation';
import {  } from '../../../Graphql/Student/query';
import useMedia from '../../../Hooks/useMedia';
import { customMedia } from '../../../styles';
import { DetailStudentLayout,DetailTitle } from '../../List/styled/DetailStudent';
import InputUnderLine from '../../List/InputUnderLine';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import {AiTwotoneDownSquare} from "react-icons/ai";

const DetailClassNameForm = styled.form`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`

const TypeLayout = styled.div`
    display : grid;
    grid-template-columns : auto repeat(5,1fr);
    column-gap : 20px;
    column-gap : 1.25rem;
    cursor : pointer;
`
const Type = styled.div`
    display : grid;
    grid-template-columns : 1fr;
    column-gap : 10px;
    column-gap : 0.625rem;
    align-items : center;

`

const Submit = styled.input`
  cursor: pointer;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  text-align: center;
  grid-column: 2 / -1;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  animation: ${BtnFadeIn} 1s ease;
`

const DetailClassName = ({  }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [pickType, setPickType] = useState (false)

  const media = useMedia()
  const {register,setValue,handleSubmit,getValues}=useForm({mode:"onChange"})
  const onClickInput = () => {setIsEdit(true)}

  const onClickTypeBtn = () => {setPickType(true)}
  const onSubmit = (data) => {
  }
  const onBlurForm = () => {
    setIsEdit(false)
    const className = getValues("className")
    onSubmit({className})
  }
//useEffect()




  return (<DetailStudentLayout>
    <DetailTitle>과목명</DetailTitle>
    <DetailClassNameForm onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
      <InputUnderLine isEdit={isEdit}>
        <Input
          {...register("className", {
            onChange: () => {
              if (!isEdit) {
                setIsEdit(true)
              }
            } 
          })}
          autoComplete="off"
          placeholder="과목명을 입력해주세요."
          type="string"
          onClick={onClickInput}
          isEdit={isEdit}
          min={1}
          max={999999999}  // int범위로ㅌ 조절 인해
        />
      </InputUnderLine>
      {isEdit ? <Submit
        value="수정"
        type="submit"
      /> : (media !== "Mobile" && <div></div>)}
        <TypeLayout>
        <Type>음영</Type>
        {/* <Type onClick={() => onClickTypeBtn()}>{pickType === "true" ? <RiCheckboxLine color='pink'/> : <AiTwotoneDownSquare  color='pink'/>}<div></div></Type> */}
        <Type onClick={() => onClickTypeBtn()}> <AiTwotoneDownSquare color='skyblue'/> </Type>
        <Type onClick={() => onClickTypeBtn()}>{pickType === "true" ? <AiTwotoneDownSquare  color='yellow'/> : <AiTwotoneDownSquare  color='yellow' opacity="0.3"/>}<div></div></Type>
        <Type onClick={() => onClickTypeBtn()}>{pickType === "true" ? <RiCheckboxLine color='lightgreen'/> : <AiTwotoneDownSquare  color='lightgreen' opacity="0.3" />}<div></div></Type>
        <Type onClick={() => onClickTypeBtn()}>{pickType === "true" ? <RiCheckboxLine color='pink'/> : <AiTwotoneDownSquare  color='pink' opacity="0.3"/>}<div></div></Type>
        <Type onClick={() => onClickTypeBtn()}>{pickType === "true" ? <RiCheckboxLine color='violet'/> : <AiTwotoneDownSquare  color='violet' opacity="0.3"/>}<div></div></Type>
        </TypeLayout>
    </DetailClassNameForm>
  </DetailStudentLayout>);
}

export default DetailClassName;