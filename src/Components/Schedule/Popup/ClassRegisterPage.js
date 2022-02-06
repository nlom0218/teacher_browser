import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import useMe, { ME_QUERY } from '../../../Hooks/useMe';
import PopupContainer from '../../Shared/PopupContainer';
import { outPopup } from '../../../apollo';
import { UPDATE_USER_MUTATION } from '../../../Graphql/User/mutation';
import DetailClassName from './DetailClassName';
import DetailClassTag from './DetailClasstag';
import DetailClassAdd from './DetailClassAdd';
import { DetailStudentLayout,DetailTitle } from '../../List/styled/DetailStudent';


const RegisterForm = styled.form`
width: 100%;
display: grid;
column-gap: 20px;
column-gap: 1.25rem;
grid-template-columns: 1fr;
align-items: center;
svg {
  font-size: 1.875em;
  font-size: 1.875rem;
  cursor: pointer;
}
`

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

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  text-align: center;
padding: 10px 20px;
padding: 0.625rem 1.25rem;

color: ${props => props.theme.bgColor};
border-radius: 5px;
border-radius: 0.3125rem;
cursor: pointer;
`
const BtnFrame = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
column-gap: 20px;
column-gap: 1.25rem;

`

const ClassRegisterPage = () => {
  const me = useMe()

  const { register, handleSubmit, setValue, getValues } = useForm()
  const onSubmit = (data) => {
  
  }
  const onCompleted = () => {
    onChangeInput()
    outPopup()

  }


  const onChangeInput = () => {

 

  }

  return (<PopupContainer>
    <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        
    <DetailClassName/>
    <DetailClassTag/>
    <DetailClassAdd/>
    <BtnFrame> <AddTagBtn onClick={onCompleted}>완료</AddTagBtn>
    <DelBtn>초기화</DelBtn></BtnFrame>
  
    </RegisterForm>
  </PopupContainer>);
}

export default ClassRegisterPage;