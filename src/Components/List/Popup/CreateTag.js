import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useMe, { ME_QUERY } from '../../../Hooks/useMe';
import PopupContainer from '../../Shared/PopupContainer';

const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation($userEmail: String!, $tag: [String]!) {
    createTag(userEmail: $userEmail, tag: $tag) {
      ok
      error
    }
  }
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 40px;
  column-gap: 2.5rem;
  padding-top: 20px;
  padding-top: 1.25rem;
`

const Input = styled.input`
  padding: 12px 20px;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
  }
`

const SubmitInput = styled.input`
  cursor: pointer;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const SeeTag = styled.div`
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TagItem = styled.div`
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  padding: 5px 10px;
  padding: 0.3215rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.purple};
`

const CreateTag = () => {
  const me = useMe()
  const [tag, setTag] = useState([])
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })

  const onCompleted = (result) => {
    const { createTag: { ok, error } } = result
    if (ok) {
      setValue("tag", "")
    }
  }

  const [createTag, { loading }] = useMutation(CREATE_TAG_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }]
  })

  const onSubmit = (data) => {
    const { tag } = data
    if (loading) {
      return
    }
    createTag({
      variables: {
        userEmail: me?.email,
        tag: [tag]
      }
    })
  }

  useEffect(() => {
    if (me) {
      setTag(me?.tag)
    }
  }, [me])
  return (<PopupContainer>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("tag", {
          required: true
        })}
        autoComplete="off"
        type="text"
      />
      <SubmitInput
        type="submit"
        value="생성"
      />
    </Form>
    <SeeTag>
      <div>{tag.length === 0 ? "생성된 태그가 없습니다." : "셍상된 태그"}</div>
      <TagList>
        {tag.map((item, index) => {
          return <TagItem key={index}>
            {item}
          </TagItem>
        })}
      </TagList>
    </SeeTag>
  </PopupContainer>);
}

export default CreateTag;