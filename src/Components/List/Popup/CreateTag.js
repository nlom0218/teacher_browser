import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsTrash } from 'react-icons/bs';
import { IoArrowBackSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { inPopup } from '../../../apollo';
import { SEE_ONE_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { CREATE_TAG_MUTATION, DELETE_TAG_MUTATION } from '../../../Graphql/User/mutation';
import useMe, { ME_QUERY } from '../../../Hooks/useMe';
import useMedia from '../../../Hooks/useMedia';
import { customMedia } from '../../../styles';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';

const Container = styled.div`
  display: grid;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const BackBtn = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  padding-top: 20px;
  padding-top: 1.25rem;
  svg {
    cursor: pointer;
    display: flex;
  }
`

const Form = styled.form`
  padding-top: ${props => props.isDesktop && "20px"};
  padding-top: ${props => props.isDesktop && "1.25rem"};
  display: grid;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
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
  text-align: center;
  cursor: pointer;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const ErrMsg = styled.div`
  grid-column: 1 / -1;
  color: ${props => props.theme.redColor};
  text-align: center;
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
  display: flex;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  padding: 5px 10px;
  padding: 0.3215rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.purple};
  svg {
    display: flex;
    cursor: pointer;
    margin-left: 5px;
  }
`

const CreateTag = ({ studentId, isBackBtn }) => {
  const me = useMe()
  const media = useMedia()
  const [tagArr, setTagArr] = useState([])
  const [errMsg, setErrMsg] = useState(undefined)
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

  const [deleteTag, { loadng: delLoading }] = useMutation(DELETE_TAG_MUTATION, {
    refetchQueries: [
      { query: ME_QUERY },
      { query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }]
  })

  const onSubmit = (data) => {
    const { tag } = data
    if (loading) {
      return
    }
    if (tagArr.includes(tag)) {
      setErrMsg("같은 이름의 태그가 있습니다.")
      return
    }
    createTag({
      variables: {
        userEmail: me?.email,
        tag: [tag]
      }
    })
  }

  const onClickDelBtn = (tag) => {
    if (delLoading) {
      return
    }
    deleteTag({
      variables: {
        userEmail: me?.email,
        tag
      }
    })
  }

  const onClickBackAddTagBtn = () => inPopup("addTag")
  const onClickBackSettingSortTagBtn = () => inPopup("studentSetting")

  useEffect(() => {
    if (me) {
      setTagArr(me?.tag)
    }
  }, [me])

  if (loading || delLoading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer>
    <Container>
      {media !== "Desktop" && <BackBtn onClick={onClickBackAddTagBtn}><IoArrowBackSharp /></BackBtn>}
      {isBackBtn && <BackBtn onClick={onClickBackSettingSortTagBtn}><IoArrowBackSharp /></BackBtn>}
      <Form onSubmit={handleSubmit(onSubmit)} isDesktop={media === "Desktop"}>
        <Input
          {...register("tag", {
            required: true,
            onChange: () => setErrMsg(undefined)
          })}
          autoComplete="off"
          autoFocus
          placeholder="태그 이름을 입력하세요."
          type="text"
        />
        <SubmitInput
          type="submit"
          value="생성"
        />
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      </Form>
      <SeeTag>
        <div>{tagArr.length === 0 ? "생성된 태그가 없습니다." : "셍상된 태그"}</div>
        <TagList>
          {tagArr.map((item, index) => {
            return <TagItem key={index}>
              <div>{item}</div>
              <BsTrash onClick={() => onClickDelBtn(item)} />
            </TagItem>
          })}
        </TagList>
      </SeeTag>
    </Container>
  </PopupContainer>);
}

export default CreateTag;