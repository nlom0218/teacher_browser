import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useMe, { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { outPopup } from "../../../apollo";
import InputUnderLine from "../../List/InputUnderLine";
import { BsCheck } from "react-icons/bs";
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
  row-gap: 20px;
  row-gap: 1.25rem;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`;
const LayOut = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  text-align: center;
  align-items: center;
  .addClass {
    align-self: flex-start;
  }
`;

const DetailTitle = styled.div`
  justify-self: flex-start;
  font-weight: 600;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: start;
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
  border-radius: 5px;
  border-radius: 0.625rem;
  grid-template-rows: 1fr 6fr;
`;

const DayContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(5, 1fr);
`;

const DownContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 5fr;
`;

const TimeContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const TimeTable = styled.div`
  display: grid;
  text-align: center;
  flex-wrap: wrap;
  border: 1px solid;
  cursor: pointer;
  align-items: center;
  justify-items: center;
`;

const bgColorArr = [
  "#FFB6C1",
  "#F4A460",
  "#FFFF00",
  "#98FB98",
  "#87CDDB",
  "#DA70D6",
];

const timeday = ["", "월", "화", "수", "목", "금"];
const timelist = ["1", "2", "3", "4", "5", "6"];

const ClassRegisterPage = ({
  setErrMsg,
  timetableData,
  userEmail,
  num,
  item,
  color,
  tag,
}) => {
  const [pickColor, setPickColor] = useState(undefined);
  const [isEditMemo, setIsEditMemo] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [pickIndexArr, setPickIndexArr] = useState([parseInt(localStorage.getItem("classPick"))])

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

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onClickColorBtn = (item) => {
    if (pickColor == item) {
      setPickColor(undefined)
    } else {
      setPickColor(item);
    }
  };

  const onClickInputMemo = () => {
    setIsEditMemo(true);
  };

  const onClickInputName = () => {
    setIsEditName(true);
  };

  const onSubmit = (data) => {
    const { subName, memo } = data;
    if (!subName) {
      setErrMsg("과목명을 입력해주세요. 😅")
      return
    }
    console.log(pickIndexArr, pickColor, userEmail, subName, memo);
    setTimetableData({
      variables: {
        teacherEmail: userEmail,
        subName,
        color: pickColor,
        memo,
        index: pickIndexArr
      },
    });
  };

  const onClickTimeIndex = (index) => {
    let newPickIndexArr
    if (pickIndexArr.includes(index)) {
      if (pickIndexArr.length === 1) {
        setErrMsg("최소 한 개의 시간을 포함해야 합니다. 😅")
        return
      }
      newPickIndexArr = pickIndexArr.filter(item => item !== index)
    } else {
      newPickIndexArr = [...pickIndexArr, index]
    }
    setPickIndexArr(newPickIndexArr)
  }

  return (
    <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <LayOut>
          <DetailTitle>수업명</DetailTitle>
          <InputUnderLine isEdit={isEditName}>
            <Input
              {...register("subName", {
                onChange: () => {
                  if (!isEditName) {
                    setIsEditName(true);
                  }
                },
              })}
              autoComplete="off"
              placeholder="과목명을 입력해주세요."
              type="text"
              onClick={onClickInputName}
              isEdit={isEditName}
            />
          </InputUnderLine>
        </LayOut>
        <LayOut>
          <DetailTitle>음영</DetailTitle>
          <ColorBox>
            {bgColorArr.map((item, index) => {
              return (
                <ColorBgThemeItem
                  key={index}
                  color={item}
                  onClick={() => onClickColorBtn(item)}
                >
                  {pickColor === item && <BsCheck />}
                </ColorBgThemeItem>
              );
            })}
          </ColorBox>
        </LayOut>
        <LayOut>
          <DetailTitle>메모</DetailTitle>
          <InputUnderLine isEdit={isEditMemo}>
            <Input
              {...register("memo", {
                onChange: () => {
                  if (!isEditMemo) {
                    setIsEditMemo(true);
                  }
                },
              })}
              autoComplete="off"
              placeholder="수업장소, 교사명 등 메모를 남겨주세요."
              type="text"
              onClick={onClickInputMemo}
              isEdit={isEditMemo}
            />{" "}
          </InputUnderLine>
        </LayOut>
        <LayOut>
          <DetailTitle className="addClass">수업추가</DetailTitle>
          <AddClassContainer>
            <DayContainer>
              {timeday.map((item, index) => {
                return (
                  <TimeTable item={item} index={index} key={index}>
                    {item}
                  </TimeTable>
                );
              })}
            </DayContainer>
            <DownContainer>
              <TimeContainer>
                {timelist.map((item, index) => {
                  return (
                    <TimeTable item={item} index={index} key={index}>
                      {item}
                    </TimeTable>
                  );
                })}
              </TimeContainer>
              <ClassContainer>
                {Array.from({ length: 30 }, () => 0).map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {pickIndexArr.includes(index) ? (
                        <TimeTable onClick={() => onClickTimeIndex(index)}>
                          <BsCheck />
                        </TimeTable>
                      ) : (
                        <TimeTable onClick={() => onClickTimeIndex(index)}>
                          {index + 1}
                        </TimeTable>
                      )}
                    </React.Fragment>
                  );
                })}
              </ClassContainer>
            </DownContainer>
          </AddClassContainer>
        </LayOut>
        <BtnFrame>
          <AddTagBtn type="submit" value="완료" />
          <DelBtn>초기화</DelBtn>
        </BtnFrame>
      </RegisterForm>
    </PopupContainer>
  );
};

export default ClassRegisterPage;
