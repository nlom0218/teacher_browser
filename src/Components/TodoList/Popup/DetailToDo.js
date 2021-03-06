import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { COMPLETE_TO_DO_LIST_MUTATION, DELETE_TO_DO_LIST_MUTATION, EDIT_TO_DO_LIST_MUTATION } from '../../../Graphql/ToDoList/mutation';
import { SEE_TO_DO_LIST_QUERY } from '../../../Graphql/ToDoList/query';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import PopupForm from '../styled/PopupForm';
import PopupInput from '../styled/PopupInput';
import PopupTitle from '../styled/PopupTitle';
import { PopupDate, PopupInputLayout, PopupStar, PopupTextarea } from './PopupLayout';

const Type = styled.div`
  color: ${props => props.not ? props.theme.redColor : props.theme.btnBgColor};
  font-weight: 600;
`

const SubmitBtn = styled.input`
  cursor : pointer;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  padding : 10px;
  padding : 0.625rem;
  text-align : center;
  border-radius : 5px;
  border-radius : 0.3125rem;
`;

const BottomBtn = styled.div`
  display: grid;
  grid-template-columns: ${props => props.type === "complete" ? "1fr" : "1fr 1fr"};
  column-gap: 20px;
  column-gap: 1.25rem;
  .bottom_btn {
    cursor : pointer;
    padding: 10px 0px;
    padding: 0.625rem 0rem;
    text-align : center;
    border-radius : 5px;
    border-radius : 0.3125rem;
  }
`

const DelBtn = styled.div`
  background-color : ${props => props.theme.redColor};
  color : ${props => props.theme.bgColor};
`

const CompleteBtn = styled.div`
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
`

const DetailToDo = ({ setMsg, setErrMsg, userEmail, setRefetchQuery }) => {
  const id = localStorage.getItem("detailToDo")

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [star, setStar] = useState(null)
  const [type, setType] = useState(undefined)

  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange"
  })

  const { data, loading, refetch } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      id
    }
  })

  const onCompleted = (result) => {
    const { editToDoList: { ok } } = result
    if (ok) {
      outPopup()
      setMsg("??? ??? ????????? ?????????????????????. ????")
      localStorage.removeItem("detailToDo")
      if (setRefetchQuery) {
        setRefetchQuery(prev => prev + 1)
      }
    }
  }

  const delOnCompleted = (result) => {
    const { deleteToDoList: { ok } } = result
    if (ok) {
      outPopup()
      setMsg("??? ?????? ?????????????????????. ????")
      localStorage.removeItem("detailToDo")
      if (setRefetchQuery) {
        setRefetchQuery(prev => prev + 1)
      }
    }
  }

  const completeOnCompleted = (result) => {
    const { completeToDoList: { ok } } = result
    if (ok) {
      outPopup()
      setMsg("??? ?????? ?????????????????????. ????")
      localStorage.removeItem("detailToDo")
      if (setRefetchQuery) {
        setRefetchQuery(prev => prev + 1)
      }
    }
  }

  const [editToDoList, { loading: editLoading }] = useMutation(EDIT_TO_DO_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: true } },
    ]
  })

  const [deleteToDoList, { loading: delLoading }] = useMutation(DELETE_TO_DO_LIST_MUTATION, {
    onCompleted: delOnCompleted,
    refetchQueries: [
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: true } },
    ]
  })

  const [completeToDoList, { loading: completeLoading }] = useMutation(COMPLETE_TO_DO_LIST_MUTATION, {
    onCompleted: completeOnCompleted,
    refetchQueries: [
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: true } },
    ]
  })

  useEffect(() => {
    if (data) {
      setValue("toDo", data?.seeToDoList[0]?.toDo)
      setValue("contents", data?.seeToDoList[0]?.contents)
      setStartDate(parseInt(data?.seeToDoList[0]?.startDate))
      setEndDate(parseInt(data?.seeToDoList[0]?.endDate))
      setStar(data?.seeToDoList[0]?.star)
      if (!data?.seeToDoList[0].startDate) {
        setType("ing")
      } else if (new Date(parseInt(data?.seeToDoList[0].startDate)) > new Date().setHours(0, 0, 0, 0)) {
        setType("inComing")
      } else if (new Date(parseInt(data?.seeToDoList[0].endDate)) < new Date().setHours(0, 0, 0, 0)) {
        setType("not")
      } else {
        setType("ing")
      }
      if (data?.seeToDoList[0].isComplete) {
        setType("complete")
      }
    }
  }, [data])

  const onSubmit = (data) => {
    if (type === "complete") {
      return
    }
    if (startDate) {
      if (!endDate) {
        setErrMsg("???????????? ??????????????????. ????")
        return
      }
      if (startDate > endDate) {
        setErrMsg("???????????? ???????????? ?????? ??????????????????. ????")
        return
      }
    }
    if (endDate) {
      if (!startDate) {
        setErrMsg("???????????? ??????????????????. ????")
        return
      }
    }
    const { toDo, contents } = data
    editToDoList({
      variables: {
        id,
        userEmail,
        toDo,
        contents,
        ...(startDate && { startDate: new Date(startDate).setHours(0, 0, 0, 0) }),
        ...(endDate && { endDate: new Date(endDate).setHours(0, 0, 0, 0) }),
        star
      }
    })
  }

  const onClickCompleteBtn = () => {
    completeToDoList({
      variables: {
        userEmail,
        id
      }
    })
  }

  const onClickDelBtn = () => {
    deleteToDoList({
      variables: {
        id,
        userEmail,
      }
    })
  }

  if (loading || editLoading || delLoading || completeLoading) {
    return (<Loading page="popupPage" />)
  }

  return (<PopupContainer maxHeight={true} needAlert={type !== "complete" && true}>
    <PopupForm create={false} onSubmit={handleSubmit(onSubmit)} type={type}>
      <PopupTitle>??? ??? ???????????? ??? ????????????</PopupTitle>
      <Type not={type === "not"}>
        {type === "not" && "???????????? ??? ???"}
        {type === "inComing" && "???????????? ??? ???"}
        {type === "ing" && "???????????? ??? ???"}
        {type === "complete" && "????????? ??? ???"}
      </Type>
      <PopupInputLayout>
        <PopupInput
          {...register("toDo", {
            required: true
          })}
          placeholder="????????? ???????????????"
          autoComplete="off"
        />
      </PopupInputLayout>
      <PopupTextarea>
        <TextareaAutosize
          {...register('contents')}
          placeholder="??????????????? ???????????????"
          minRows={3}
        >
        </TextareaAutosize>
      </PopupTextarea>
      <PopupDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <PopupStar star={star} setStar={setStar} />
      {type !== "complete" && <SubmitBtn
        type="submit"
        value="????????????"
      />}
      <BottomBtn type={type}>
        {type !== "complete" && <CompleteBtn onClick={onClickCompleteBtn} className="bottom_btn">????????????</CompleteBtn>}
        <DelBtn onClick={onClickDelBtn} className="bottom_btn">????????????</DelBtn>
      </BottomBtn>
    </PopupForm>
  </PopupContainer>);
}

export default DetailToDo;