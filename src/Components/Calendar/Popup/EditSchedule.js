import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSortUp } from 'react-icons/bi';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { DELETE_SCHEDULE_MUTATION, EDIT_SCHEDULE_MUTATION, UPDATE_SCHEDULE_SORT_MUTATION } from '../../../Graphql/Schedule/mutation';
import { SEE_SCHEDULE_QUERY } from '../../../Graphql/Schedule/query';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import { ENABLE_SORT_NUM_QUERY } from "../../../Graphql/Schedule/query"
import { CalenderPopupColorLayout, CalenderPopupDateLayout, CalenderPopupFormContainer, CalenderPopupInputLayout, CalenderPopupTextareaLayout, CalenderPopupTitle } from './PopupLayout';
import format from 'date-fns/format';

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-end;
`

const SubmitInput = styled.input`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const SortBtn = styled.div`
  cursor: pointer;  
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`

const EditSchedule = ({ userEmail, setErrMsg, setMsg }) => {
  const id = localStorage.getItem("editSchedule")

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);
  const [color, setColor] = useState(undefined)
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange"
  })

  const { data, loading, refetch: seeRefetch } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      scheduleId: id
    }
  })

  const [editSchedule, { loading: editLoading }] = useMutation(EDIT_SCHEDULE_MUTATION, {
    update(cache, { data: { editSchedule: { ok, schedule, delSchedule } } }) {
      if (ok) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeSchedule(prev) {
              const delRef = `Schedule:${delSchedule._id}`
              const newRef = `Schedule:${schedule._id}`
              const newSchedule = prev.filter(item => item.__ref !== delRef)
              return [...newSchedule, { __ref: newRef }]
            }
          }
        })
        setMsg("일정이 수정되었습니다. 😀")
        localStorage.removeItem("editSchedule")
        outPopup()
      }
    }
  })

  const [deleteSchedule, { loading: deleteLoading }] = useMutation(DELETE_SCHEDULE_MUTATION, {
    update(cache, { data: { deleteSchedule: { ok, schedule } } }) {
      if (ok) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeSchedule(prev) {
              const delRef = `Schedule:${schedule._id}`
              const newSchedule = prev.filter(item => item.__ref !== delRef)
              return newSchedule
            }
          }
        })
        setMsg("일정이 삭제되었습니다. 😀")
        localStorage.removeItem("editSchedule")
        outPopup()
      }
    }
  })

  const [updateScheduleSort, { loading: updateLoading }] = useMutation(UPDATE_SCHEDULE_SORT_MUTATION, {
    update(cache, { data: { updateScheduleSort: { ok } } }) {
      if (ok) {
        cache.modify({
          id: `Schedule:${id}`,
          fields: {
            sort() {
              return enableSortNumData?.enableSortNum
            }
          }
        })
        setMsg("일정이 정렬 되었습니다. 😀")
        localStorage.removeItem("editSchedule")
        outPopup()
      }
    }
  })

  const [enableSortNum, { data: enableSortNumData, loading: enableLoading }] = useLazyQuery(ENABLE_SORT_NUM_QUERY)

  const onSubmit = (data) => {
    const { schedule, contents } = data
    if (!endDate) {
      setErrMsg("종료일을 설정해주세요. 🥲")
      return
    }
    if (!color) {
      setErrMsg("배경색을 설정해주세요. 🥲")
      return
    }
    if (startDate > endDate) {
      setErrMsg("시작일과 종료일을 다시 확인해주세요. 🥲")
      return
    }
    const startMonths = parseInt(format(new Date(startDate), "yyMM"))
    const endMonths = parseInt(format(new Date(endDate), "yyMM"))

    let months = undefined
    if (startMonths === endMonths) {
      months = [startMonths]
    } else if (endMonths - startMonths === 1) {
      months = [startMonths, endMonths]
    } else {
      const newMonths = []
      for (let i = 1; i < endMonths - startMonths; i++) {
        newMonths.push(startMonths + i)
      }
      months = [startMonths, ...newMonths, endMonths]
    }

    editSchedule({
      variables: {
        scheduleId: id,
        userEmail,
        schedule,
        startDate: new Date(startDate).setHours(0, 0, 0, 0),
        endDate: new Date(endDate).setHours(0, 0, 0, 0),
        color,
        months,
        ...(contents && { contents })
      }
    })
  }

  const onClickDleBtn = () => {
    deleteSchedule({
      variables: {
        scheduleId: id,
        userEmail
      }
    })
  }

  const onClickUpdateBtn = () => {
    enableSortNum({
      variables: {
        scheduleId: id,
        userEmail
      }
    })
  }

  const updateSortFn = () => {
    updateScheduleSort({
      variables: {
        scheduleId: id,
        userEmail,
        sort: enableSortNumData?.enableSortNum
      }
    })
  }

  useEffect(() => {
    if (data) {
      setValue("schedule", data?.seeSchedule[0].schedule)
      setValue("contents", data?.seeSchedule[0].contents)
      setStartDate(new Date(parseInt(data?.seeSchedule[0].startDate)))
      setEndDate(new Date(parseInt(data?.seeSchedule[0].endDate)))
      setColor(data?.seeSchedule[0].color)
    }
  }, [data])

  useEffect(() => {
    if (enableSortNumData) {
      if (enableSortNumData?.enableSortNum === 0) {
        setErrMsg("현재 정렬은 불가능합니다. 🥲")
      } else {
        updateSortFn()
      }
    }
  }, [enableSortNumData])

  if (loading) {
    return <Loading page="popupPage" />
  }
  if (editLoading) {
    return <Loading page="popupPage" />
  }
  if (deleteLoading) {
    return <Loading page="popupPage" />
  }
  if (updateLoading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer maxHeight={true}>
    <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
      <TopContainer>
        <SortBtn onClick={onClickUpdateBtn}>
          <BiSortUp />
        </SortBtn>
        <CalenderPopupTitle>일정수정</CalenderPopupTitle>
      </TopContainer>
      <CalenderPopupInputLayout register={register} />
      <CalenderPopupTextareaLayout register={register} />
      <CalenderPopupDateLayout startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      <CalenderPopupColorLayout color={color} setColor={setColor} />
      <SubmitInput
        type="submit"
        value="수정하기"
      />
      <DelBtn onClick={onClickDleBtn}>
        삭제하기
      </DelBtn>
    </CalenderPopupFormContainer>
  </PopupContainer>);
}

export default EditSchedule;