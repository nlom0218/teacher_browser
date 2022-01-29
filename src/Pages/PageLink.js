import React from 'react';
import styled from 'styled-components';
import AccountInput from '../Components/Account/styled/AccountInput';
import BasicContainer from '../Components/Shared/BasicContainer';
import { useForm } from 'react-hook-form';
import RegisterForm from '../Components/Account/styled/RegisterForm';
import { useState } from 'react/cjs/react.development';

const Container=styled.div`
display: grid;
padding: 40px;
padding: 2.5rem;
row-gap: 10px;
row-gap: 0.625rem;
column-gap: 10px;
column-gap: 0.625rem;
grid-template-rows: 1fr 10fr;
height: 100%;
`
const TopContents=styled.form`
display: grid;
column-gap: 10px;
column-gap: 0.625rem;
grid-template-columns: 1fr 1fr 2fr 2fr 1fr;
background-color: #F2F2F2;
padding: 10px;
padding: 0.625rem;
`
const LinkPage = styled.div`
display: grid;
grid-template-columns: repeat(3,1fr);
height: 100%;
border: 1px solid;
padding: 20px;
padding: 1.25rem;
column-gap: 10px;
column-gap: 0.625rem;
row-gap: 10px;
row-gap: 0.625rem;
border-radius: 10px;
border-radius: 0.625rem;
`
const Folder = styled.div`
display: gird;
border: 1px solid;
padding: 20px;
padding: 1.25rem;
height: 100%;
border-radius: 10px;
border-radius: 0.625rem;
`
const SubmitBtn = styled.button`
text-align: center;
padding: 10px 20px;
padding: 0.625rem 1.25rem;
background-color: ${props => props.theme.btnBgColor};
color: ${props => props.theme.bgColor};
border-radius: 5px;
border-radius: 0.3125rem;
cursor: pointer;
`

const PageLink = () => {
  
  const [dataAll, setDataAll] = useState()

  const { register, handleSubmit, getValues} = useForm()
  const onSubmit = (data) => {
    const { folder, title, link, memo } = data
    const folderName=getValues("folder")
    setDataAll([data.folder,data.title,data.link,data.memo])
  }
   


  return (<BasicContainer menuItem={true}>
<Container> 
<TopContents onSubmit={handleSubmit(onSubmit)}>
<AccountInput
 {...register("folder", {
  required: true,
  onChange: onSubmit,
})}
type="text"
autoComplete="off"
placeholder="폴더명" 
/>{/* 폴더선택으로 변경 */}
<AccountInput
 {...register("title", {
  required: true,
  onChange: onSubmit,
})}
type="text"
autoComplete="off"
placeholder='제목'/>
<AccountInput
 {...register("link", {
  required: true,
  onChange: onSubmit,
})}
type="text"
autoComplete="off"
placeholder='사이트링크'/>
<AccountInput
 {...register("memo", {
  required: true,
  onChange: onSubmit,
})}
type="text"
autoComplete="off"
placeholder='메모'/>
<SubmitBtn
type='submit'
>추가</SubmitBtn>
</TopContents>
<LinkPage>
<Folder>
1
</Folder>
<Folder>2</Folder>
<Folder>3</Folder>
<Folder>
1
</Folder>
<Folder>2</Folder>
<Folder>3</Folder>


</LinkPage>
</Container>



   
  </BasicContainer>);
}

export default PageLink;