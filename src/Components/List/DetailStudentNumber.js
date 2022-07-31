import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BtnFadeIn } from "../../Animations/Fade";
import { EDIT_STUDENT_MUTATION } from "../../Graphql/Student/mutation";
import { SEE_ALL_STUDENT_QUERY, SEE_ONE_STUDENT_QUERY } from "../../Graphql/Student/query";
import useMedia from "../../Hooks/useMedia";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import InputUnderLine from "./InputUnderLine";
import { DetailStudentLayout, DetailTitle } from "./styled/DetailStudent";

const DetailNumberForm = styled.form`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 5fr 2fr;
  `}
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
  ${customMedia.greaterThan("tablet")`
    padding: 0;
  `}
`;

const DetailStudentNumber = ({ studentInfo, selectedSort, selectedTag, setSuccessMsg }) => {
  const [isEdit, setIsEdit] = useState(false);

  const media = useMedia();

  const onCompleted = (result) => {
    const {
      editStudent: { ok },
    } = result;
    if (ok) {
      setIsEdit(false);
      setSuccessMsg("학생 번호가 수정되었습니다. 😀");
    }
  };

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ONE_STUDENT_QUERY, variables: { studentId: studentInfo?._id } },
      {
        query: SEE_ALL_STUDENT_QUERY,
        variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false,
        },
      },
    ],
  });

  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const onClickInput = () => {
    setIsEdit(true);
  };

  const onSubmit = (data) => {
    const { studentNum } = data;
    console.log(!studentNum);
    if (loading) {
      return;
    }
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId: studentInfo?._id,
        ...(studentNum ? { studentNumber: studentNum } : { studentNumber: "delNum" }),
      },
    });
  };

  const onBlurForm = () => {
    setIsEdit(false);
    const studentNum = getValues("studentNum");
    onSubmit({ studentNum });
  };

  useEffect(() => {
    if (studentInfo?.studentNumber) {
      setValue("studentNum", studentInfo?.studentNumber);
    } else if (studentInfo?.studentNumber === null) {
      setValue("studentNum", "");
    }
  }, [studentInfo]);

  return (
    <DetailStudentLayout>
      <DetailTitle>번호</DetailTitle>
      <DetailNumberForm onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
        <InputUnderLine isEdit={isEdit}>
          <Input
            {...register("studentNum", {
              onChange: () => {
                if (!isEdit) {
                  setIsEdit(true);
                }
              },
            })}
            autoComplete="off"
            placeholder="학생 번호를 입력하세요."
            type="number"
            onClick={onClickInput}
            isEdit={isEdit}
            min={1}
            max={999999999}
            // int범위로 인해... 줄어듬...
          />
        </InputUnderLine>
        {isEdit ? <Submit value="수정" type="submit" /> : media !== "Mobile" && <div></div>}
      </DetailNumberForm>
      {loading && <Loading page="center" />}
    </DetailStudentLayout>
  );
};

export default DetailStudentNumber;
