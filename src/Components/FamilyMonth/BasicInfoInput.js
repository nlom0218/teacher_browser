import React from "react";
import { BsFillCameraVideoFill, BsFillPencilFill } from "react-icons/bs";
import { FaStickyNote, FaUserAlt } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  .textarea {
    svg {
      align-self: flex-start;
      margin-top: 15px;
      margin-top: 0.938rem;
    }
  }
`;

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
  input {
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
`;

const BasicInfoInput = ({ register, userEmail }) => {
  console.log(userEmail);
  return (
    <Container>
      {!userEmail && (
        <InputLayout>
          <FaUserAlt />
          <input
            placeholder="로그인을 하지 않았습니다. 작성자의 닉네임을 입력하세요.😃"
            {...register("email")}
            autoComplete="off"
          />
        </InputLayout>
      )}
      <InputLayout>
        <BsFillCameraVideoFill />
        <input
          placeholder="유튜브 영상의 종류를 적어주세요.😃 ex) 노래 / 영화리뷰 / 브이로그 등등"
          {...register("type")}
          autoComplete="off"
        />
      </InputLayout>
      <InputLayout>
        <BsFillPencilFill />
        <input
          placeholder="제목을 입력하세요.😃(최대 40자)"
          {...register("title")}
          autoComplete="off"
        />
      </InputLayout>
      <InputLayout className="textarea">
        <FaStickyNote />
        <TextareaAutosize
          {...register("contents")}
          minRows={10}
          maxRows={10}
          placeholder="가정의 달 이야기를 적어주세요.😃"
        ></TextareaAutosize>
      </InputLayout>
    </Container>
  );
};

export default BasicInfoInput;
