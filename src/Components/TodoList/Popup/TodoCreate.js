import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import PopupContainer from '../../Shared/PopupContainer';
import { useMutation } from '@apollo/client';
import { CREATE_TO_DO_LIST_MUTATION } from '../../../Graphql/ToDoList/mutation';
import { SEE_TO_DO_LIST_QUERY } from '../../../Graphql/ToDoList/query';
import PopupForm from '../styled/PopupForm';
import PopupTitle from "../styled/PopupTitle"
import PopupInput from "../styled/PopupInput"
import { PopupDate, PopupInputLayout, PopupStar, PopupTextarea } from './PopupLayout';
import TextareaAutosize from 'react-textarea-autosize';

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


const TodoCreate = ({ setErrMsg, userEmail, setRefetchQuery, urlDate, setMsg }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [star, setStar] = useState(3)

    const onCompleted = (result) => {
        const { createToDoList: { ok } } = result
        if (ok) {
            outPopup()
            setMsg("할 일이 추가되었습니다. 😄")
            if (setRefetchQuery) {
                setRefetchQuery(prev => prev + 1)
            }
        }
    }

    const [createToDoList, { loading }] = useMutation(CREATE_TO_DO_LIST_MUTATION, {
        onCompleted,
        refetchQueries: [{ query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } }]
    })

    const { register, handleSubmit, } = useForm({
        mode: "onChange"
    })

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
        createToDoList({
            variables: {
                userEmail,
                toDo,
                star,
                ...(contents && { contents }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }
        })
    }

    useEffect(() => {
        if (urlDate) {
            setStartDate(new window.Date(parseInt(urlDate)))
            setEndDate(new window.Date(parseInt(urlDate)))
        }
    }, [])

    return (
        <PopupContainer maxHeight={true}>
            <PopupForm onSubmit={handleSubmit(onSubmit)} create={true}>
                <PopupTitle>할 일 등록</PopupTitle>
                <PopupInputLayout>
                    <PopupInput
                        {...register("toDo", {
                            required: true
                        })}
                        placeholder="내용을 입력하세요"
                        autoComplete="off"
                    >
                    </PopupInput>
                </PopupInputLayout>
                <PopupTextarea>
                    <TextareaAutosize
                        {...register('contents')}
                        placeholder="세부내용을 입력하세요"
                        minRows={3}
                    >
                    </TextareaAutosize>
                </PopupTextarea>
                <PopupDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                <PopupStar star={star} setStar={setStar} />
                <SubmitBtn
                    type="submit"
                    value="등록하기"
                />
            </PopupForm>
        </PopupContainer>

    );
}

export default TodoCreate;