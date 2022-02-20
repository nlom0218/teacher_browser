import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DetailStudentLayout, DetailTitle } from './styled/DetailStudent';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { BtnFadeIn } from "../../Animations/Fade"
import { useMutation } from '@apollo/client';
import { customMedia } from '../../styles';
import { SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import { ME_QUERY } from '../../Hooks/useMe';

const AllergyList = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`

const AllergyItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const Allergy = styled.div`
  font-weight: ${props => props.isTrue ? "600" : "400"};
  color: ${props => props.isTrue && props.theme.redColor};
`

const EditBtn = styled.div`
  cursor: pointer;
  text-align: center;
  grid-column: 2 / -1;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  animation: ${BtnFadeIn} 1s ease;
  ${customMedia.greaterThan("desktop")`
    grid-column: 1 / -1;
    justify-self: flex-end;
  `}
`

const DetailStudentAllergy = ({ studentInfo, setSuccessMsg }) => {
  const allergy = ["난류", "우유", "메밀", "땅콩", "대두", "밀", "고등어", "게", "새우", "돼지고기", "복숭아", "토마토", "아황산염", "호두", "닭고기", "쇠고기", "오징어", "조개류"]
  const [studentAllergy, setStudentAllergy] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const onCompleted = (result) => {
    const { editStudent: { ok, error } } = result
    if (ok) {
      setSuccessMsg("학생 알레르기 정보가 수정되었습니다. 😀")
      setIsEdit(false)
    }
  }

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ONE_STUDENT_QUERY, variables: { studentId: studentInfo?._id } },
      { query: ME_QUERY },
    ]
  })

  const addAllergy = (allergy) => {
    setIsEdit(true)
    if (studentAllergy.length === 0) {
      setStudentAllergy([allergy])
    } else {
      setStudentAllergy([...studentAllergy, allergy])
    }
  }

  const removeAllergy = (allergy) => {
    setIsEdit(true)
    const newStudentAllergy = studentAllergy.filter(item => item !== allergy)
    setStudentAllergy(newStudentAllergy)
  }

  const onClickAllergy = (allergy) => {
    const exist = studentAllergy.includes(allergy)
    if (exist) {
      removeAllergy(allergy)
    } else {
      addAllergy(allergy)
    }
  }

  const onClickEditBtn = () => {
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId: studentInfo?._id,
        allergy: studentAllergy
      }
    })
  }

  useEffect(() => {
    if (studentInfo) {
      setStudentAllergy(studentInfo.allergy)
    }
  }, [studentInfo])
  return (<DetailStudentLayout>
    <DetailTitle>알레르기</DetailTitle>
    <AllergyList isEdit={isEdit}>
      {allergy.map((item, index) => {
        return <AllergyItem key={index} onClick={() => onClickAllergy(index + 1)}>
          <div>{studentAllergy.includes(index + 1) ?
            <RiCheckboxLine />
            :
            <RiCheckboxBlankLine />}
          </div>
          <Allergy isTrue={studentAllergy.includes(index + 1)}>{item}</Allergy>
        </AllergyItem>
      })}
    </AllergyList>
    {isEdit && <EditBtn onClick={onClickEditBtn}>수정</EditBtn>}
  </DetailStudentLayout>);
}

export default DetailStudentAllergy;