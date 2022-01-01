import React from 'react';
import PopupContainer from '../../Shared/PopupContainer';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../DetailList';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../AllList';

const EDIT_STUDENT_LIST_ICON = gql`
  mutation Mutation($teacherEmail: String!, $listId: ID!, $listIcon: String) {
    editStudentList(teacherEmail: $teacherEmail, listId: $listId, listIcon: $listIcon) {
      ok
    }
  }
`

const SetEmoji = ({ setChosenEmoji, teacherEmail, listId }) => {
  console.log(teacherEmail);
  const [editStudentList, { loading }] = useMutation(EDIT_STUDENT_LIST_ICON, {
    refetchQueries: [
      { query: SEE_ONE_STUDENT_LIST_QUERY, variables: { listId } },
      { query: SEE_ALL_STUDENT_LIST_QUERY }
    ]
  })
  const onEmojiClick = (e, emojiObject) => {
    setChosenEmoji(emojiObject)
    outPopup()
    if (loading) {
      return
    } else {
      editStudentList({
        variables: {
          teacherEmail,
          listId,
          listIcon: JSON.stringify(emojiObject)
        }
      })
    }
  }
  return (<PopupContainer emojiPopup={true}>
    <Picker
      onEmojiClick={onEmojiClick}
      pickerStyle={{ boxShadow: "none", width: "100%", height: "100%" }}
      groupNames={{
        smileys_people: '스마일리 및 사람',
        animals_nature: '동물 및 사람',
        food_drink: '음식 및 음료',
        travel_places: '여행 및 장소',
        activities: '활동',
        objects: '사물',
        symbols: '기호',
        flags: '깃발',
        recently_used: '최근사용',
      }}
      groupVisibility={{

      }}
    />
  </PopupContainer>);
}

export default SetEmoji;