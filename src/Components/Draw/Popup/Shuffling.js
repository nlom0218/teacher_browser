import React from 'react';
import styled from 'styled-components';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import { outPopup } from '../../../apollo';


const Form = styled.form`
    width : 240px;
    width : 15rem;
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
    grid-template-columns : 1fr 1fr;
    column-gap : 20px;
    column-gap : 1.25rem;
    cursor : pointer;
`

const Type = styled.div`
    display : grid;
    grid-template-columns : auto 1fr;
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

const ErrMsg = styled.div`
    text-align : center;
    color : #db3a1e;
`

const Shuffling = ({pickNum, pickType, setPickNum, setPickType, studentNum, setIsShuffle}) => {
    const [errMsg, setErrMsg] = useState(undefined)
    const { register, handleSubmit, getValues } = useForm({
        mode : "onChange" ,
        defaultValues : {
            num : pickNum
        }
    })

    const onClickTypeBtn = () => {
        if(pickType === "see" ) {
            setPickType("hide")
        } else {
            setPickType("see")
        }
        
    }

const onSubmit = (data) => {
    const {num : stringNum} = data
    const num = parseInt(stringNum)
    if(num <= 0 || num >= studentNum) {
        setErrMsg("입력값을 다시 확인하세요.")
            return
        }
        setPickNum(num)
        setIsShuffle("finish")
    }

    return ( <BtnPopupContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
            {...register("num", {
                required : true
            })}
                type = "number"    
                placeholder = "몇 명을 뽑나요?"
        />
        <TypeLayout>
          <Type onClick={onClickTypeBtn}>
          {pickType === "see" ? <RiCheckboxLine/> : <RiCheckboxBlankLine/>}<div>이름 보이기</div></Type>
        </TypeLayout>
        <SubmitInput
            type = "submit"    
            value = "뽑기"
        />
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </Form>
    </BtnPopupContainer>) ;
}

export default Shuffling ;