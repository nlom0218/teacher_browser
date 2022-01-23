import React from 'react';
import styled from 'styled-components';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import { outPopup } from '../../../apollo';
import { DetailStudentLayout,DetailTitle } from '../../List/styled/DetailStudent';



const Form = styled.form`
    display : grid;
    grid-gap : 20px;
    grid-gap : 1.25rem;
    grid-template-columns: 1fr 1fr;
    color : ${props => props.theme.bgColor};
`

const Input = styled.input`
    padding : 10px;
    background-color : ${props => props.theme.cardBg};
    color : ${props => props.theme.fontColor};
    border-radius : 5px;
    border-radius : 0.3125rem;
`

const DetailStartTime = () => {
    const [errMsg, setErrMsg] = useState(undefined)
    const { register, handleSubmit, getValues } = useForm({
        mode : "onChange" ,
        defaultValues : {
           
        }
    })



const onSubmit = (data) => {
    const {num : stringNum} = data
    const num = parseInt(stringNum)

    }

    return ( 
        <React.Fragment>
        <DetailStudentLayout>
            <DetailTitle>수업 시작</DetailTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
            {...register("hour", {
                required : true
            })}
                type = "number"    
                max="24"
                defaultValue={9}
        /> 
               <Input
            {...register("minutes", {
                required : true
            })}
                type = "number"    
                min="00"
                max="59"
                step="5"
                defaultValue={0}
        />
        </Form>
        </DetailStudentLayout>
        <DetailStudentLayout>
            <DetailTitle>수업 시간</DetailTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
               <Input
            {...register("classtime", {
                required : true
            })}
                type = "number"    
                min="00"
                max="59"
                step="5"
                defaultValue={40}
        />
        </Form>
        </DetailStudentLayout>
        <DetailStudentLayout>
            <DetailTitle>쉬는 시간</DetailTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
               <Input
            {...register("resttime", {
                required : true
            })}
                type = "number"    
                min="00"
                max="59"
                step="5"
                defaultValue={10}
        />
        </Form>
        </DetailStudentLayout>
        <DetailStudentLayout>
            <DetailTitle>점심 시간</DetailTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
            {...register("lunchhour", {
                required : true
            })}
                type = "number"    
                max="6"
                // defaultValue={4}
                placeholder='4교시 후'
        /> 
               <Input
            {...register("lunchminutes", {
                required : true
            })}
                type = "number"    
                min="00"
                max="80"
                step="5"
                defaultValue={50}
        />
        </Form>
        </DetailStudentLayout>
        </React.Fragment>
  );
}

export default DetailStartTime ;