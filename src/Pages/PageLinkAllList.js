import { useQuery } from '@apollo/client';
import React, { useState } from "react";
import styled from 'styled-components';
import { SEE_PAGE_LINK_QUERY } from '../Graphql/PageLink/query';
import { FiLink } from "react-icons/fi"
import { BiEdit } from "react-icons/bi"
import { useState } from 'react/cjs/react.development';
import { useForm } from 'react-hook-form';
import { GrPowerReset } from 'react-icons/gr';
import { useNavigate } from 'react-router';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  position: absolute;
  top: 3%;
  bottom: 3%;
  right: 3%;
  left: 3%;
  background-color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  overflow: ${props => props.notScroll ? "scroll" : "scroll"};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`

const BasicLayout = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const PageTitle = styled.div`
  justify-self: flex-end;
  font-size: 2em;
  font-size: 2rem;
`

const PageSearch = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
`

const Input = styled.input`
  background-color: #ffffff;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 10px;
  border-radius: 0.625rem;
`

const SubmitInput = styled.input`
  background: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const ResetIcon = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: ${props => props.theme.fontColor};
  border: 1px solid ${props => props.theme.fontColor};
  row-gap: 1px;
  column-gap: 1px;
`

const Item = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const LinkIcon = styled.div`
  cursor: pointer;
`

const EditIcon = styled.div`
  cursor: pointer;
`

const PageLinkAllList = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(undefined)
  const { data, loading } = useQuery(SEE_PAGE_LINK_QUERY, {
    variables: {
      pageTitle: search
    }
  })
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onClickLink = (url) => {
    window.open(url, "_blank")
  }
  const onCLickEdit = (pageTitle) => {
    navigate(`/pageLink/${pageTitle}`)
  }
  const onSubmit = (data) => {
    const { search } = data
    setSearch(search)
  }
  const onClickResetBtn = () => {
    setSearch(undefined)
    setValue("search", "")
  }
  return (<Container>
    <BasicLayout>
      <PageTitle>전체 추천 페이지</PageTitle>
      <PageSearch onSubmit={handleSubmit(onSubmit)}>
        <div></div>
        <Input
          {...register("search", { required: true })}
          placeholder="추천 페이지 제목을 입력하세요."
          autoComplete="off"
        />
        <SubmitInput
          type="submit"
          value="검색"
        />
        <ResetIcon onClick={onClickResetBtn}><GrPowerReset /></ResetIcon>
      </PageSearch>
      {data && <ListContainer>
        {data?.seePageLink.map((item, index) => {
          return <Item key={index}>
            <div>{index + 1}.</div>
            <div>{item.pageTitle}</div>
            <LinkIcon onClick={() => onClickLink(item.pageURL)}><FiLink /></LinkIcon>
            <EditIcon onClick={() => onCLickEdit(item.pageTitle)}><BiEdit /></EditIcon>
          </Item>
        })}
      </ListContainer>}
    </BasicLayout>
  </Container>);
}

export default PageLinkAllList;