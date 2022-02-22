import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import CreateOneStudent from './CreateOneStudent';
import CreateManyStudent from './CreateManyStudent';
import useMe from '../../../Hooks/useMe';
import { inPopup, outPopup } from '../../../apollo';
import PopupContainer from '../../Shared/PopupContainer';
import { customMedia } from '../../../styles';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { CREATE_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { IoArrowBackSharp } from 'react-icons/io5';
import useMedia from '../../../Hooks/useMedia';
import Loading from '../../Shared/Loading';

const BackBtn = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-top: 1.25rem;
  svg {
    cursor: pointer;
    display: flex;
  }
`

const CreationType = styled.div`
  display: grid;
  text-align: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
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
  ${customMedia.greaterThan("desktop")`
    padding: 20px 0px;
    padding: 1.25rem 0px;
  `}
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

const CreateStudent = ({ existStudentArray, selectedTag, selectedSort, setErrorMsg }) => {
  // 단일 생성, 복수 생성을 위한 state값
  const [creationType, setCreationType] = useState(undefined)

  const me = useMe()
  const media = useMedia()
  const onCompleted = (result) => {
    const { createStudent: { ok, error } } = result
    if (ok) {
      // 성공적으로 생성을 하였으면 팝업창 닫기
      outPopup()
    }
    if (error) {
      setErrorMsg(error)
    }
  }
  const [createStudent, { loading }] = useMutation(CREATE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{
      query: SEE_ALL_STUDENT_QUERY,
      variables: {
        ...(selectedTag.length !== 0 && { tag: selectedTag }),
        ...(selectedSort && { sort: selectedSort }),
        trash: false
      },
    }, {
      query: SEE_ALL_STUDENT_QUERY,
      variables: {
        sort: "name",
        trash: false
      },
    }]
  })

  if (loading) {
    return <Loading page="subPage" />
  }

  const onClickCreationType = (type) => setCreationType(type)
  const onClickBackAddTagBtn = () => inPopup("students")
  return (<PopupContainer>
    {media !== "Desktop" && <BackBtn onClick={onClickBackAddTagBtn}><IoArrowBackSharp /></BackBtn>}
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
        setErrorMsg={setErrorMsg}
      />
    }
    {creationType === "many" &&
      <CreateManyStudent
        existStudentArray={existStudentArray}
        createStudent={createStudent}
        loading={loading}
        setErrorMsg={setErrorMsg}
        email={me?.email}
      />}
  </PopupContainer>);
}

export default CreateStudent;