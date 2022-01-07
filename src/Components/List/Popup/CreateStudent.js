import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import CreateOneStudent from './CreateOneStudent';
import CreateManyStudent from './CreateManyStudent';
import useMe from '../../../Hooks/useMe';
import { outPopup } from '../../../apollo';
import PopupContainer from '../../Shared/PopupContainer';
import { customMedia } from '../../../styles';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { CREATE_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';

const CreationType = styled.div`
  display: grid;
  text-align: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 10px 0px;
  padding: 0.625rem 0px;
  .creationTypeBtn {
    cursor: pointer;
    padding: 16px 40px;
    padding: 1rem 2.5rem;
    border: 1px solid ${props => props.theme.fontColor};
    :hover {
      background-color: ${props => props.theme.fontColor};
      color: ${props => props.theme.bgColor};
      transition: background-color 0.6s ease, color 0.6s ease;
    }
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

const OneTypeBtn = styled.div`
  background-color: ${props => props.creationType === "one" && props.theme.fontColor};
  color: ${props => props.creationType === "one" && props.theme.bgColor};
`

const ManyTypeBtn = styled.div`
  background-color: ${props => props.creationType === "many" && props.theme.fontColor};
  color: ${props => props.creationType === "many" && props.theme.bgColor};
`

const CreateStudent = ({ existStudentArray }) => {
  // 단일 생성, 복수 생성을 위한 state값
  const [creationType, setCreationType] = useState(undefined)

  const me = useMe()
  const onCompleted = (result) => {
    const { createStudent: { ok } } = result
    if (ok) {
      // 성공적으로 생성을 하였으면 팝업창 닫기
      outPopup()
    }
  }
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }]
  })
  const onClickCreationType = (type) => setCreationType(type)
  return (<PopupContainer>
    <CreationType>
      <OneTypeBtn className="creationTypeBtn" onClick={() => onClickCreationType("one")} creationType={creationType}>단일 생성</OneTypeBtn>
      <ManyTypeBtn className="creationTypeBtn" onClick={() => onClickCreationType("many")} creationType={creationType}>복수 생성</ManyTypeBtn>
    </CreationType>
    {creationType === "one" &&
      <CreateOneStudent
        existStudentArray={existStudentArray}
        createStudent={createStudent}
        loading={loading}
        email={me?.email}
      />
    }
    {creationType === "many" &&
      <CreateManyStudent
        existStudentArray={existStudentArray}
        createStudent={createStudent}
        loading={loading}
        email={me?.email}
      />}
  </PopupContainer>);
}

export default CreateStudent;