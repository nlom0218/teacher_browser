import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import { outPopup } from '../../../apollo';
import { DetailStudentLayout,DetailTitle } from '../../List/styled/DetailStudent';



const Form = styled.form`
    display : grid;
    grid-gap : 10px;
    grid-gap : 0.625rem;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    color : ${props => props.theme.bgColor};
`

const Input = styled.input`
    padding : 10px;
    background-color : ${props => props.theme.cardBg};
    color : ${props => props.theme.fontColor};
    border-radius : 5px;
    border-radius : 0.3125rem;
`
const Font = styled.div`
 
    color: black;
    font-weight: 600;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`

const DetailStartTime = () => {
    const [errMsg, setErrMsg] = useState(undefined)
    const { register, handleSubmit, getValues } = useForm({
        mode : "onChange" ,
        defaultValues : {
           
        }
    })

    const AddTagBtn = styled.div`
    text-align: center;
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  `

const onSubmit = (data) => {
    const {num : stringNum} = data
    const num = parseInt(stringNum)
    console.log(data)

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
                min="1" 
                max="24"
                defaultValue={9}
        /> <Font>시 </Font>
               <Input
            {...register("minutes", {
                required : true
            })}
                type = "number"    
                min="00"
                max="59"
                step="5"
                defaultValue={0}
        /><Font>분 </Font>
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
        /><Font>분 </Font>
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
        /><Font>분 </Font>
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
                min="1"
                defaultValue={4}
        /> <Font>교시 후 </Font>
               <Input
            {...register("lunchminutes", {
                required : true
            })}
                type = "number"    
                min="00"
                max="80"
                step="5"
                defaultValue={50}
        /><Font>분 </Font>
        </Form>
        </DetailStudentLayout>
        <DetailStudentLayout>
            <DetailTitle>중간 놀이</DetailTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
            {...register("breaktime", {
                required : true
            })}
                type = "number"    
                max="6"
                min="1"
                defaultValue={0}
        /> <Font>교시 후 </Font>
               <Input
            {...register("breakminutes", {
                required : true
            })}
                type = "number"    
                min="00"
                max="80"
                step="5"
                defaultValue={0}
        /><Font>분 </Font>
        </Form>
       
        </DetailStudentLayout>
        <DetailStudentLayout>
        <div/>
    <AddTagBtn>완료</AddTagBtn>
        </DetailStudentLayout>
     
        </React.Fragment>
  );
}

export default DetailStartTime ;