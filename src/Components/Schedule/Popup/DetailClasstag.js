import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inPopup, isPopupVar } from '../../../apollo';
import { DetailStudentLayout, DetailTitle } from '../../List/styled/DetailStudent';
import useMedia from '../../../Hooks/useMedia';
import InputUnderLine from '../../List/InputUnderLine';
import { useForm } from 'react-hook-form';


const StudentTagContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
`

const StudentTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  .no_student_tag {
    padding-top: 15px;
    padding-top: 0.9375rem;
  }
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
const EditContainer = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  animation: ${BtnFadeIn} 1s ease;
`

const TagBox = styled.div`
  padding: 20px;
  padding: 1.25rem;
  padding-top: 10px;
  padding-top: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  display: flex;
  flex-wrap: wrap;
  .no_tag_div {
    padding-top: 10px;
    padding-top: 0.625rem
  }
`
const DetailClassTagForm = styled.form`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const Tag = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 16px;
  margin-right: 1rem;
  :hover {
    text-decoration: underline;
  }
`

const CreateTagBtn = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const AddTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
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

const DetailClassTag = ({ }) => {


  const media = useMedia()
  const {register,setValue,handleSubmit,getValues}=useForm({mode:"onChange"})



  const [isEdit, setIsEdit] = useState(false)


  const onMouseEnterTag = () => setIsEdit(true)
  const onMouseLeaveTag = () => setIsEdit(false)

  const onClickCreateTag = () => inPopup("createTag")
  const onClickPopupAddTag = () => inPopup("addTag")

  const onClickInput = () => {setIsEdit(true)}

  const onSubmit = (data) => {
  }


  const onBlurForm = () => {
    setIsEdit(false)
    const classTag = getValues("classTag")
    onSubmit({classTag})

  }

  //useEffect

  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>태그</DetailTitle>
    <DetailClassTagForm onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
      <InputUnderLine isEdit={isEdit}>
        <Input
          {...register("classTag", {
            onChange: () => {
              if (!isEdit) {
                setIsEdit(true)
              }
            } 
          })}
          autoComplete="off"
          placeholder="수업장소, 교사명 등 메모"
          type="string"
          onClick={onClickInput}
          isEdit={isEdit}
          min={1}
          max={999999999} 
        />
      </InputUnderLine>
      {isEdit ? <Submit
        value="태그 관리"
        type="submit"
      /> : (media !== "Mobile" && <div></div>)}



     
      
    </DetailClassTagForm>
  </DetailStudentLayout>);
}

export default DetailClassTag;