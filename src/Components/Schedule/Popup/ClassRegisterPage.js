import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useMe, { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { outPopup } from "../../../apollo";
import InputUnderLine from "../../List/InputUnderLine";
import { BsCheck } from "react-icons/bs";

import DetailClassName from "./DetailClassName";
import DetailClassTag from "./DetailClasstag";
import DetailClassAdd from "./DetailClassAdd";
import {
  DetailStudentLayout,
  DetailTitle,
} from "../../List/styled/DetailStudent";
import { useMutation } from "@apollo/client";
import { SET_TIMETABLE_DATA_MUTATION } from "../../../Graphql/TimeTable/mutation";
import { GET_TIMETABLE_DATA_QUERY } from "../../../Graphql/TimeTable/query";

const RegisterForm = styled.form`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  width: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr;
  align-items: center;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`;
const LayOut = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  font-size: 1em;
  font-size: 1rem;
  text-align: center;
`;
const InputLayout = styled.input`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 70%;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`;
const ColorBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
  column-gap: 0.625rem;
`;
const ColorBgThemeItem = styled.div`
  height: 35px;
  height: 2.1875rem;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;
`;
const AddTagBtn = styled.input`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const DelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;

  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
const BtnFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const AddClassContainer = styled.div`
  padding: 10px;
  padding: 0.625rem;
  display: grid;
  line-height: 130%;
  border-radius: 5px;
  border-radius: 0.625rem;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;
const TimeTable = styled.div`
  display: grid;
  text-align: center;
  flex-wrap: wrap;
  border: 1px solid;
  line-height: 190%;
  cursor: pointer;
  align-items: center;
  justify-items: center;
`;
const M1 = {
  day: 0,
  time: 1,
  subName: "math",
  color: "",
  memo: "",
};
const bgColorArr = [
  "#FFB6C1",
  "#F4A460",
  "#FFFF00",
  "#98FB98",
  "#87CDDB",
  "#DA70D6",
];
const timeday = ["", "월", "화", "수", "목", "금"];

const ClassRegisterPage = ({ userEmail, num, item, color, tag }) => {
  const [pickType, setPickType] = useState(false);
  const [isEditMemo, setIsEditMemo] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const onCompleted = (result) => {
    const {
      setTimetableData: { ok },
    } = result;
    if (ok) {
      outPopup();
    }
  };
  const [setTimetableData, { loading }] = useMutation(
    SET_TIMETABLE_DATA_MUTATION,
    {
      onCompleted,
      refetchQueries: [
        { query: ME_QUERY },
        { query: GET_TIMETABLE_DATA_QUERY, variables: { userEmail } },
      ],
    }
  );

  const me = useMe();

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });
  const onClickTypeBtn = (item) => {
    setPickType(item);
  };
  const onClickInputMemo = () => {
    setIsEditMemo(true);
  };
  const onClickInputName = () => {
    setIsEditName(true);
  };
  const onSubmit = (data) => {
    const { subName } = data;
    outPopup();
    setTimetableData({
      variables: {
        teacherEmail: userEmail,
        timetableData: M1,
      },
    });
  };

  return (
    <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <LayOut>
          <DetailTitle>{num} 수업명</DetailTitle>
          <InputUnderLine isEdit={isEditName}>
            <Input
              {...register("className", {
                onChange: () => {
                  if (!isEditName) {
                    setIsEditName(true);
                  }
                },
              })}
              autoComplete="off"
              placeholder="과목명을 입력해주세요."
              type="string"
              onClick={onClickInputName}
              isEdit={isEditName}
              min={1}
              max={999999999}
            />
          </InputUnderLine>{" "}
          <DetailTitle>음영</DetailTitle>
          <ColorBox>
            {bgColorArr.map((item, index) => {
              return (
                <ColorBgThemeItem
                  key={index}
                  color={item}
                  onClick={() => onClickTypeBtn(item)}
                >
                  {pickType === item && <BsCheck />}
                </ColorBgThemeItem>
              );
            })}{" "}
          </ColorBox>
          <DetailTitle>메모</DetailTitle>
          <InputUnderLine isEdit={isEditMemo}>
            <Input
              {...register("classTag", {
                onChange: () => {
                  if (!isEditMemo) {
                    setIsEditMemo(true);
                  }
                },
              })}
              autoComplete="off"
              placeholder="수업장소, 교사명 등 메모를 남겨주세요."
              type="string"
              onClick={onClickInputMemo}
              isEdit={isEditMemo}
              min={1}
              max={999999999}
            />{" "}
          </InputUnderLine>
          {/* <DetailTitle>수업추가</DetailTitle>
          <AddClassContainer>
            {timeday.map((item, index) => {
              return (
                <TimeTable item={item} index={index}>
                  {item}
                </TimeTable>
              );
            })}{" "}
            <TimeTable>1교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {timeDayData
              .filter((item) => item.time.includes("1"))
              .map((item, index) => {
                return <TimeTable key={index} item={item} />;
              })}
            <TimeTable>2교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <TimeTable>3교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <TimeTable>4교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <TimeTable>5교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <TimeTable>6교시</TimeTable>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>    </AddClassContainer>*/}
        </LayOut>

        {/* <DetailClassName userEmail={userEmail} />
        <DetailClassTag />
        <DetailClassAdd /> */}
        <BtnFrame>
          {" "}
          <AddTagBtn type="submit" value="완료" />
          <DelBtn>초기화</DelBtn>
        </BtnFrame>
      </RegisterForm>
    </PopupContainer>
  );
};

export default ClassRegisterPage;
