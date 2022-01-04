import React from 'react';
import PopupContainer from '../../Shared/PopupContainer';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../DetailList';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../AllList';

const SetEmoji = ({ setChosenEmoji, teacherEmail, listId, editStudentList, loading }) => {
  const onEmojiClick = (e, emojiObject) => {
    setChosenEmoji(emojiObject.emoji)
    outPopup()
    if (loading) {
      return
    } else {
      editStudentList({
        variables: {
          teacherEmail,
          listId,
          listIcon: emojiObject.emoji
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