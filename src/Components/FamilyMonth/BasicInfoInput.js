import React from "react";
import { AiFillTags } from "react-icons/ai";
import { BsFillCameraVideoFill, BsFillPencilFill } from "react-icons/bs";
import { FaStickyNote, FaUserAlt } from "react-icons/fa";
import { IoColorFill } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { customMedia } from "../../styles";
import ColorBox from "./ColorBox";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  .not-center {
    svg {
      align-self: flex-start;
      margin-top: 10px;
      margin-top: 0.625rem;
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

const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(4, 1fr);  
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(6, 1fr);  
  `}
`;

const BasicInfoInput = ({ register, userEmail, bgColor, setBgColor }) => {
  const cardColor = [
    "#FCBAD3",
    "#FFE2E2",
    "#AA96DA",
    "#DBE2EF",
    "#FCE38A",
    "#62D2A2",
    "#B6FFCE",
    "#EAFFD0",
    "#FFFFD2",
    "#A8D8EA",
    "#95E1D3",
    "#E4D1B9",
  ];
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
          placeholder="유튜브 영상의 종류를 적어주세요.😃(최대 10자) ex) 노래 / 영화리뷰 / 브이로그 등등"
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
      <InputLayout className="not-center">
        <FaStickyNote />
        <TextareaAutosize
          {...register("contents")}
          minRows={10}
          maxRows={10}
          placeholder="가정의 달 이야기를 적어주세요.😃"
        ></TextareaAutosize>
      </InputLayout>
      <InputLayout className="not-center">
        <IoColorFill />
        <ColorContainer>
          {cardColor.map((item, index) => {
            return (
              <ColorBox
                setBgColor={setBgColor}
                bgColor={bgColor}
                key={index}
                color={item}
              />
            );
          })}
        </ColorContainer>
      </InputLayout>
      <InputLayout>
        <AiFillTags />
        <input
          {...register("tag")}
          autoComplete="off"
          placeholder="태그를 적어주세요.😃(태그는 ,로 구분됩니다.)"
        ></input>
      </InputLayout>
    </Container>
  );
};

export default BasicInfoInput;
