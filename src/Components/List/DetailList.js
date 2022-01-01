import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import SetEmoji from './Popup/SetEmoji';

const SEE_ONE_STUDENT_LIST_QUERY = gql`
  query SeeStudentList($listId: ID) {
    seeStudentList(listId: $listId) {
      listId
      listOrder
      listName
      students {
        _id
        studentName
        studentGender
        listId
      }
    }
  }
`

const Container = styled.div`
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  justify-items: flex-start;
`

const ListEomji = styled.div`
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
  padding: 0.3125rem;
  transform: background-color 0.6s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${props => props.theme.blurColor};
    transition: background-color 0.6s ease;
  }
`

const ListName = styled.div`
  font-size: 2em;
  font-size: 2rem;
  padding: 5px;
  padding: 0.3125rem;
`

const SetEmojiBtn = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  font-size: 0.875em;
  font-size: 0.875rem;
  /* opacity: 0.8; */
  padding: 5px;
  padding: 0.3125rem;
  cursor: pointer;
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${props => props.theme.blurColor};
    transition: background-color 0.6s ease;
  }
  animation: ${FadeIn} 0.2s ease forwards;
`

const DetailList = ({ listId }) => {
  const isPopup = useReactiveVar(isPopupVar)

  const [seeSetEmojiBtn, setSeeEmojilBtn] = useState(false)

  const [chosenEmoji, setChosenEmoji] = useState(null)

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId
    }
  })

  const onClickEmojiBtn = () => inPopup("emoji")
  const onClickEmojiDelBtn = () => setChosenEmoji(null)

  const onMouseEnterName = () => setSeeEmojilBtn(true)
  const onMouseLeaveName = () => setSeeEmojilBtn(false)
  return (<Container>
    {isPopup === "emoji" && <SetEmoji setChosenEmoji={setChosenEmoji} />}
    <NameContainer onMouseEnter={onMouseEnterName} onMouseLeave={onMouseLeaveName}>
      {chosenEmoji && <ListEomji onClick={onClickEmojiBtn}>{chosenEmoji.emoji}</ListEomji>}
      <ListName>{data?.seeStudentList[0].listName}</ListName>
      {seeSetEmojiBtn && (chosenEmoji ?
        <SetEmojiBtn onClick={onClickEmojiDelBtn}>아이콘 삭제</SetEmojiBtn>
        :
        <SetEmojiBtn onClick={onClickEmojiBtn}>아이콘 추가</SetEmojiBtn>)
      }
    </NameContainer>
  </Container>);
}

export default DetailList;