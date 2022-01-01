import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import { color } from '../../styles';
import { SEE_ALL_STUDENT_LIST_QUERY } from './AllList';
import SetEmoji from './Popup/SetEmoji';
import StudentInList from './StudentInList';


export const SEE_ONE_STUDENT_LIST_QUERY = gql`
  query SeeStudentList($listId: ID) {
    seeStudentList(listId: $listId) {
      listId
      listOrder
      listName
      listIcon
      teacherEmail
      students {
        _id
        studentName
        studentGender
        studentOrder
        listId
      }
    }
  }
`

const EDIT_STUDENT_LIST = gql`
  mutation Mutation($teacherEmail: String!, $listId: ID!, $listIcon: String, $listName: String) {
    editStudentList(teacherEmail: $teacherEmail, listId: $listId, listIcon: $listIcon, listName: $listName) {
      ok
      error
    }
  }
`

const Container = styled.div`
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  justify-items: flex-start;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
  }
`

const ListEomji = styled.div`
  display: flex;
  align-self: center;
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
  padding: 0.3125rem;
  transform: background-color 0.6s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${props => props.theme.blurColor};
    transition: background-color 0.6s ease;
  }
`

const ListName = styled.input`
  width: 100%;
  font-size: 2em;
  font-size: 2rem;
  padding: 5px;
  padding: 0.3125rem;
`

const SubmitInput = styled.input`
  grid-column: -2 / -1;
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const SettingBtn = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  font-size: 0.875em;
  font-size: 0.875rem;
  animation: ${FadeIn} 0.2s ease forwards;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  div {
    padding: 5px;
    padding: 0.3125rem;
    :hover {
    background-color: ${props => props.theme.blurColor};
    transition: background-color 0.6s ease;
    cursor: pointer;
    border-radius: 5px;
    border-radius: 0.3125rem;
    }
  }
`

const SetEmojiBtn = styled.div`
`

const EditListName = styled.div``

const ErrMsg = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
`

const DetailList = ({ listId }) => {
  const isPopup = useReactiveVar(isPopupVar)
  const [teacherEmail, setTeacherEmail] = useState(undefined)
  const [isEditName, setIsEditName] = useState(false)
  const [errMsg, setErrMsg] = useState(undefined)

  const [seeSettingBtn, setSeeSettingBtn] = useState(false)

  const [chosenEmoji, setChosenEmoji] = useState(null)

  // 리스트으 정보를 불러오는 쿼리
  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId
    }
  })

  const onCompleted = (result) => {
    const { editStudentList: { ok, error } } = result
    if (!ok) {
      setErrMsg(error)
    } else {
      setIsEditName(false)
    }
  }

  // 리스트 아이콘 수정을 위한
  const [editStudentList, { loading: editLoading }] = useMutation(EDIT_STUDENT_LIST, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ONE_STUDENT_LIST_QUERY, variables: { listId } },
      { query: SEE_ALL_STUDENT_LIST_QUERY }
    ]
  })

  const { register, setValue, handleSubmit, setFocus } = useForm({
    mode: "onChange",
  })

  const onClickEmojiBtn = () => inPopup("emoji")
  const onClickEmojiDelBtn = () => {
    setChosenEmoji(null)
    if (editLoading) {
      return
    }
    editStudentList({
      variables: {
        teacherEmail,
        listId,
        listIcon: "delete"
      }
    })
  }
  const onClickEditListBtn = () => {
    setIsEditName(true)
    setFocus("name")
  }

  const onMouseEnterName = () => setSeeSettingBtn(true)
  const onMouseLeaveName = () => setSeeSettingBtn(false)

  const onSubmit = (data) => {
    const { name } = data
    if (name.length < 3 || name.length > 11) {
      setErrMsg("명렬표의 이름은 3~11자 사이로 입력하세요.")
      return
    }
    if (editLoading) {
      return
    }
    editStudentList({
      variables: {
        teacherEmail,
        listId,
        listName: name
      }
    })
  }

  // 데이터 정보가 불러온 뒤 아이콘과 이름 값 세팅하기
  useEffect(() => {
    if (data) {
      setChosenEmoji(data?.seeStudentList[0].listIcon)
      setTeacherEmail(data?.seeStudentList[0].teacherEmail)
      setValue("name", data?.seeStudentList[0].listName)
    }
  }, [data])

  return (<Container>
    <NameContainer onMouseEnter={onMouseEnterName} onMouseLeave={onMouseLeaveName}>
      {chosenEmoji ? <ListEomji onClick={onClickEmojiBtn}>{chosenEmoji}</ListEomji> : <div></div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListName
          {...register("name", {
            required: true,
            onChange: () => setErrMsg(undefined)
          })}
          placeholder="명렬표 이름을 입력하세요."
          autoComplete="off"
          readOnly={!isEditName}
        // id="change_list_name_input"
        />
        {isEditName && <SubmitInput type="submit" value="수정" />}
      </form>
      {seeSettingBtn &&
        <SettingBtn>
          {chosenEmoji ?
            <SetEmojiBtn onClick={onClickEmojiDelBtn}>아이콘 삭제</SetEmojiBtn>
            :
            <SetEmojiBtn onClick={onClickEmojiBtn}>아이콘 추가</SetEmojiBtn>}
          <EditListName onClick={onClickEditListBtn}>명렬표 이름 수정</EditListName>
        </SettingBtn>
      }
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    </NameContainer>
    {data?.seeStudentList[0]?.students && <StudentInList students={data?.seeStudentList[0]?.students} />}
    {isPopup === "emoji" &&
      <SetEmoji
        setChosenEmoji={setChosenEmoji}
        teacherEmail={data?.seeStudentList[0].teacherEmail}
        listId={data?.seeStudentList[0].listId}
        editStudentList={editStudentList}
        loading={editLoading}
      />}
  </Container>);
}

export default DetailList;