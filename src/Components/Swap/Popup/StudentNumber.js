import React from 'react';
import styled from 'styled-components';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`


const Form = styled.form`
    display : grid;
    grid-gap : 20px;
    grid-gap : 1.25rem;
    color : ${props => props.theme.bgColor};
`

const Input = styled.input`
    padding : 10px 20px;
    background-color : ${props => props.theme.cardBg};
    color : ${props => props.theme.fontColor};
    border-radius : 5px;
    border-radius : 0.3125rem;
`

const TypeLayout = styled.div`
    display : grid;
    column-gap : 20px;
    column-gap : 1.25rem;
    cursor : pointer;
`

const Type = styled.div`
    display : grid;
    column-gap : 10px;
    column-gap : 0.625rem;
    align-items : center;
`

const SubmitInput = styled.input`
    text-align : center;
    padding : 10px 40px;
    padding : 0.625rem 2.5rem;
    background-color : ${props => props.theme.btnBgColor};
    border-radius : 5px;
    border-radius : 0.3125rem;
    cursor : pointer;
`

const StudentNumber = ({ pickNum, setPickNum, onClickShuffleBtn, setErrMsg }) => {
    const { register, handleSubmit, getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            num: pickNum
        }
    })

    const onSubmit = (data) => {
        const { num: stringNum } = data
        const num = parseInt(stringNum)
        if (num <= 1 || num >= 11) {
            setErrMsg("2~10사이의 숫자를 입력해주세요. 😂")
            return
        }
        setPickNum(num)
        onClickShuffleBtn("init")
    }

    return (<BtnPopupContainer>
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("num", {
                        required: true
                    })}
                    type="number"
                    placeholder="몇 명을 뽑나요?"
                />
                <TypeLayout>
                    <Type> 한 줄에 들어갈 학생 수를 입력해주세요. </Type>
                </TypeLayout>
                <SubmitInput
                    type="submit"
                    value="선택"
                />
            </Form>
        </Container>
    </BtnPopupContainer>);
}

export default StudentNumber;