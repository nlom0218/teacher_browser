import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BtnFadeIn } from "../../../Animations/Fade";
import useMedia from "../../../Hooks/useMedia";
import {
  DetailStudentLayout,
  DetailTitle,
} from "../../List/styled/DetailStudent";
import InputUnderLine from "../../List/InputUnderLine";
import { BsCheck } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { SET_TIMETABLE_DATA_MUTATION } from "../../../Graphql/TimeTable/mutation";

const DetailClassNameForm = styled.form`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
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

const TypeLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(6, 1fr);
  column-gap: 20px;
  column-gap: 1.25rem;
  cursor: pointer;
`;
const Type = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  justify-self: center;
  text-align: center;
  /* border: 1px solid;  */
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

const Submit = styled.input`
  cursor: pointer;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  text-align: center;
  grid-column: 2 / -1;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  animation: ${BtnFadeIn} 1s ease;
`;

const DetailClassName = (userEmail) => {
  const [isEdit, setIsEdit] = useState(false);
  const [pickType, setPickType] = useState(false);
  const [classData, setClassData] = useState([]);

  const [setTimetableData, { data, loading, error }] = useMutation(
    SET_TIMETABLE_DATA_MUTATION,
    {
      variables: {
        teacherEmail: userEmail,
        timetableData: classData,
      },
    }
  );

  const media = useMedia();
  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const onClickInput = () => {
    setIsEdit(true);
  };

  const onClickTypeBtn = (item) => {
    setPickType(item);
  };

  const onSubmit = (data) => {
    const { className } = data;
    const newClassName = className;
  };

  const onBlurForm = () => {
    setIsEdit(false);
    const className = getValues("className");
    onSubmit({ className });
  };
  //useEffect()

  const bgColorArr = [
    "#FFB6C1",
    "#F4A460",
    "#FFFF00",
    "#98FB98",
    "#87CDDB",
    "#DA70D6",
  ];

  return (
    <DetailStudentLayout>
      <DetailTitle>과목명</DetailTitle>
      <DetailClassNameForm
        onSubmit={handleSubmit(onSubmit)}
        onBlur={onBlurForm}
      >
        <InputUnderLine isEdit={isEdit}>
          <Input
            {...register("className", {
              onChange: () => {
                if (!isEdit) {
                  setIsEdit(true);
                }
              },
            })}
            autoComplete="off"
            placeholder="과목명을 입력해주세요."
            type="string"
            onClick={onClickInput}
            isEdit={isEdit}
            min={1}
            max={999999999}
          />
        </InputUnderLine>

        {media !== "Mobile" && (
          <TypeLayout>
            <Type>
              <mark>*음영</mark>
            </Type>
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
            })}
          </TypeLayout>
        )}
      </DetailClassNameForm>
    </DetailStudentLayout>
  );
};

export default DetailClassName;
