import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { SEE_TO_DO_LIST_QUERY } from '../../Graphql/ToDoList/query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { BsCalendarDate, BsFillPencilFill, BsStar, BsStarFill, BsArrowCounterclockwise } from "react-icons/bs"
import { CgNotes } from "react-icons/cg"
import TextareaAutosize from 'react-textarea-autosize';
import Loading from '../Shared/Loading';
import { DELETE_TO_DO_LIST_MUTATION, EDIT_TO_DO_LIST_MUTATION } from '../../Graphql/ToDoList/mutation';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { IoArrowBackSharp } from "react-icons/io5";

const Form = styled.form`
  padding : 20px;
  padding : 1.25rem;
  display : grid;
  grid-template-rows : auto auto 1fr auto auto auto auto; 
  row-gap : 20px;
  row-gap : 1.25rem;
  min-height : 100%;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${props => props.theme.originBgColor};
    transition: background-color 1s ease;
    line-height: 160%;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
}
}
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

const BackIcon = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const Title = styled.div`
    justify-self: flex-end;
    font-size: 1.25em;
    font-size: 1.25rem;
`


const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Icon = styled.div`
  padding: ${props => props.notPaddingTop ? "0px" : "15px"} 0px;
  padding: ${props => props.notPaddingTop ? "0px" : "0.9375rem"} 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`

const Input = styled.input`
width: 100%;
background-color: ${props => props.theme.originBgColor};
transition: background-color 1s ease;
padding: 15px 20px;
padding: 0.9375rem 1.25rem;
border-radius: 5px;
border-radius: 0.3125rem;
::placeholder {
  color: ${props => props.theme.fontColor};
  opacity: 0.8;
  transition: color 1s ease, opacity 1s ease;
}
`;


const SubmitBtn = styled.input`
  cursor : pointer;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding : 10px;
  padding : 0.625rem;
  text-align : center;
  border-radius : 5px;
  border-radius : 0.3125rem;
`;

const SetDate = styled.div`
    display : grid;
    grid-template-columns : 1fr auto 1fr auto;
    align-items: center;
    column-gap : 20px;
    column-gap : 1.25rem;
    row-gap : 10px;
    row-gap : 0.625rem;
    input {
        width : 100%;
        background-color: ${props => props.theme.originBgColor};
        transition: background-color 1s ease;
        text-align : center;
        padding : 20px 10px;
        padding : 1.25rem 0.625rem;
        border-radius : 40px;
        border-radius : 2.5rem;
        cursor : pointer;
    }
`

const StartDate = styled.div`
  display : grid;
  align-items : center;
`

const EndDate = styled.div`
  display : grid;
  align-items : center;
`;

const ResetBtn = styled.div`
  cursor: pointer;
  align-self : center;
  /* color: ${props => props.theme.fontColor}; */
  svg {
      display : flex;
      font-size : 1.25em;
      font-size : 1.25rem;
  }
`;

const SetStar = styled.div`
    justify-self: flex-start;
    display: grid;
    grid-template-columns: repeat(5, auto);
    column-gap: 20px;
    column-gap: 1.25rem;
    background-color: ${props => props.theme.originBgColor};
    transition: background-color 1s ease;
    padding: 0px 40px;
    padding: 0rem 2.5rem;
    border-radius: 40px;
    border-radius: 2.5rem;
    justify-items: center;
`

const StarIcon = styled.div`
    cursor: pointer;
    color: ${props => props.isStar && props.theme.redColor};
    transition: ${props => props.isStar && "color 1s ease"};
    padding: ${props => props.notPaddingTop ? "0px" : "15px"} 0px;
    padding: ${props => props.notPaddingTop ? "0px" : "0.9375rem"} 0rem;
    font-size: 1.25em;
    font-size: 1.25rem;
    svg {
        display: flex;
    }
`

const DelBtn = styled.div`
  cursor : pointer;
  background-color : ${props => props.theme.redColor};
  color : ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding : 10px;
  padding : 0.625rem;
  text-align : center;
  border-radius : 5px;
  border-radius : 0.3125rem;
`

const ToDoDetail = ({ id, userEmail, setErrMsg, setMsg }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [star, setStar] = useState(3)

  const navigate = useNavigate()

  const onClickBackIcon = () => {
    navigate(routes.todo)
  }

  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      isComplete: false,
      id
    }
  })

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { editToDoList: { ok } } = result
    if (ok) {
      setMsg("할 일 정보가 수정되었습니다. 😄")
    }
  }

  const delOnCompleted = (result) => {
    const { deleteToDoList: { ok } } = result
    if (ok) {
      navigate(routes.todo)
      setMsg("할 일이 삭제되었습니다. 😄")
    }
  }

  const [editToDoList, { loading: editLoading }] = useMutation(EDIT_TO_DO_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } }]
  })

  const [deleteToDoList, { loading: delLoading }] = useMutation(DELETE_TO_DO_LIST_MUTATION, {
    onCompleted: delOnCompleted,
    refetchQueries: [{ query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } }]
  })

  const onClickResetDateBtn = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const onSubmit = (data) => {
    if (startDate) {
      if (!endDate) {
        setErrMsg("종료일을 설정해주세요. 🥲")
        return
      }
      if (startDate > endDate) {
        setErrMsg("시작일과 종료일을 다시 확인해주세요. 🥲")
        return
      }
    }
    if (endDate) {
      if (!startDate) {
        setErrMsg("시작일을 설정해주세요. 🥲")
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
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        star
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

  useEffect(() => {
    if (data) {
      const toDo = data?.seeToDoList[0]?.toDo
      const contents = data?.seeToDoList[0]?.contents
      const startDate = data?.seeToDoList[0]?.startDate
      const endDate = data?.seeToDoList[0]?.endDate
      const star = data?.seeToDoList[0]?.star
      const id = data?.seeToDoList[0]?._id
      setValue("toDo", toDo)
      setValue("contents", contents)
      setStartDate(parseInt(startDate))
      setEndDate(parseInt(endDate))
      setStar(star)
    }
  }, [data])

  if (loading) {
    return <Loading page="subPage" />
  }

  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <Top>
      <BackIcon onClick={onClickBackIcon}><IoArrowBackSharp /></BackIcon>
      <Title>할 일 정보</Title>
    </Top>
    <Layout>
      <Icon><BsFillPencilFill /></Icon>
      <Input
        {...register("toDo", {
          required: true
        })}
        placeholder="내용을 입력하세요"
        autoComplete="off"
      >
      </Input>
    </Layout>
    <Layout>
      <Icon><CgNotes /></Icon>
      <TextareaAutosize
        {...register('contents')}
        placeholder="세부내용을 입력하세요"
        minRows={5}
        maxRows={5}
      >
      </TextareaAutosize>
    </Layout>
    <Layout>
      <Icon><BsCalendarDate /></Icon>
      <SetDate>
        <StartDate>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            locale={ko}
            placeholderText="시작일 설정"
            todayButton="오늘"
          />
        </StartDate>
        <div>~</div>
        <EndDate>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            locale={ko}
            placeholderText="종료일 설정"
          />
        </EndDate>
        <ResetBtn onClick={onClickResetDateBtn}><BsArrowCounterclockwise /></ResetBtn>
      </SetDate>
    </Layout>
    <Layout>
      <Icon><BsStarFill /></Icon>
      <SetStar>
        <StarIcon onClick={() => setStar(1)} isStar={star > 0}><BsStarFill /></StarIcon>
        <StarIcon onClick={() => setStar(2)} isStar={star > 1}>{star > 1 ? <BsStarFill /> : <BsStar />}</StarIcon>
        <StarIcon onClick={() => setStar(3)} isStar={star > 2}>{star > 2 ? <BsStarFill /> : <BsStar />}</StarIcon>
        <StarIcon onClick={() => setStar(4)} isStar={star > 3}>{star > 3 ? <BsStarFill /> : <BsStar />}</StarIcon>
        <StarIcon onClick={() => setStar(5)} isStar={star > 4}>{star > 4 ? <BsStarFill /> : <BsStar />}</StarIcon>
      </SetStar>
    </Layout>
    <SubmitBtn
      type="submit"
      value="수정하기"
    />
    <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
  </Form>);
}

export default ToDoDetail;