import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const SSearchContainer = styled.div`
  top: 0;
  left: 0;
  width: 40%;
  padding: 20px;
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  grid-template-rows: 1fr;
  align-items: flex-start;
`

const SearchBox = styled.div`
  min-height: 100%;
  max-height: 100%;
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.625rem;
  min-height: 100%;
  max-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  align-items: flex-start;
  row-gap: 20px;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Input = styled.input`
  width: 100%;
  background-color: ${props => props.theme.hoverColor};
  color: ${props => props.theme.fontColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`

const SubmitInput = styled.input`
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: color 1s ease;
`

const SeeType = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: flex-start;
`

const SeeTypeIcon = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const SearchContainer = ({ seacrh, setSeacrh, sort, setSort }) => {

  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })

  const onSubmit = (data) => {
    const { search } = data
    setSeacrh(search)
  }

  const onClickSeeType = (type) => {
    setSort(type)
  }

  return (<SSearchContainer>
    <SearchBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("search", {
            required: true
          })}
          type="text"
          autoComplete="off"
          placeholder="검색어를 입력하세요."
        />
        <SubmitInput
          type="submit"
          value="검색"
        />
      </Form>
      <SeeType>
        <SeeTypeIcon onClick={() => onClickSeeType("sim")}>
          {sort === "sim" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>정확순</div>
        </SeeTypeIcon>
        <SeeTypeIcon onClick={() => onClickSeeType("date")}>
          {sort === "date" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>최신순</div>
        </SeeTypeIcon>
      </SeeType>
    </SearchBox>
  </SSearchContainer>);
}

export default SearchContainer;