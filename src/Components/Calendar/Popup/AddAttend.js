import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import PopupContainer from "../../Shared/PopupContainer";
import { inPopup, outPopup } from "../../../apollo";
import { useMutation } from "@apollo/client";
import {
  Icon,
  CalenderPopupTextareaLayout,
  CalenderPopupTitle,
  InputLayout,
  DateContainer,
  CalenderPopupDateLayout,
} from "./PopupLayout";
import {
  BsCalendarDate,
  BsFillPersonCheckFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { customMedia } from "../../../styles";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import IcNameTableClick from "../../../icons/NameTable/IcNameTableClick";
import { CREATE_ATTENDANCE_MUTATION } from "../../../Graphql/Attendance/mutation";
import { format, parse } from "date-fns";
import Loading from "../../Shared/Loading";
import { SEE_ATTENDANCE_QUERY } from "../../../Graphql/Attendance/query";

const CalenderPopupFormContainer = styled.form`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto auto auto 1fr auto auto;
  min-height: 100%;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${(props) => props.theme.originBgColor};
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const SelectedStudent = styled.div`
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0px 20px;
  padding: 0rem 1.25rem;
  align-items: center;
`;

const StudentName = styled.div`
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
`;

const SelectBtn = styled.div`
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`;

const AttendType = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  padding: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const Type = styled.div`
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  background-color: ${(props) => props.selected && props.theme.btnBgColor};
  color: ${(props) => props.selected && props.theme.bgColor};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :hover {
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 0.6s ease, color 0.6s ease;
  }
`;

const Date = styled.div`
  grid-column: 1 / -1;
  display: grid;
  align-items: center;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`;

const AddAttend = ({
  userEmail,
  setErrMsg,
  setMsg,
  setRefetchQuery,
  urlDate,
}) => {
  const [type, setType] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [studentName, setStudentName] = useState(undefined);
  const [studentId, setStudentId] = useState(undefined);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onCompleted = (result) => {
    const {
      createAttendance: { ok, error },
    } = result;
    if (ok) {
      setMsg("새로운 출결이 등록되었습니다. 😀");
      outPopup();
      localStorage.removeItem("attendStudentName");
      localStorage.removeItem("attendStudentId");
      setRefetchQuery((prev) => prev + 1);
    } else {
      setErrMsg(error);
    }
  };

  const [createAttendance, { loading }] = useMutation(
    CREATE_ATTENDANCE_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = (data) => {
    const { contents } = data;
    if (!studentId) {
      setErrMsg("학생을 선택해주세요. 🥲");
      return;
    }
    if (!type) {
      setErrMsg("출결 종류를 선택해주세요. 🥲");
      return;
    }
    if (!startDate) {
      setErrMsg("날짜를 선택해주세요. 🥲");
      return;
    }

    const month = parseInt(format(new window.Date(startDate), "yyMM"));

    createAttendance({
      variables: {
        userEmail,
        studentId,
        type,
        month,
        date: new window.Date(startDate).setHours(0, 0, 0, 0),
        ...(contents && { contents }),
      },
    });
  };

  const onClickSelectBtn = () => {
    inPopup("selectedStudent");
  };

  useEffect(() => {
    setStudentName(localStorage.getItem("attendStudentName"));
    setStudentId(localStorage.getItem("attendStudentId"));
  }, []);

  useEffect(() => {
    if (urlDate) {
      setStartDate(new window.Date(parseInt(urlDate)));
      setEndDate(new window.Date(parseInt(urlDate)));
    } else {
      setStartDate(new window.Date());
      setEndDate(new window.Date());
    }
  }, []);

  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer maxHeight={true} needAlert={true}>
      <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
        <CalenderPopupTitle>출결등록</CalenderPopupTitle>
        <InputLayout>
          <Icon>
            <BsFillPersonFill />
          </Icon>
          <SelectedStudent>
            <StudentName selected={studentName}>
              {studentName ? studentName : "선택된 학생이 없습니다."}
            </StudentName>
            <SelectBtn onClick={onClickSelectBtn}>
              <IcNameTableClick />
            </SelectBtn>
          </SelectedStudent>
        </InputLayout>
        <InputLayout>
          <Icon>
            <BsFillPersonCheckFill />
          </Icon>
          <AttendType>
            <Type
              onClick={() => setType("인정 결석")}
              selected={type === "인정 결석"}
            >
              인정 결석
            </Type>
            <Type
              onClick={() => setType("질병 결석")}
              selected={type === "질병 결석"}
            >
              질병 결석
            </Type>
            <Type
              onClick={() => setType("미인정 결석")}
              selected={type === "미인정 결석"}
            >
              미인정 결석
            </Type>
            <Type
              onClick={() => setType("기타 결석")}
              selected={type === "기타 결석"}
            >
              기타 결석
            </Type>
            <Type onClick={() => setType("지각")} selected={type === "지각"}>
              지각
            </Type>
            <Type onClick={() => setType("조퇴")} selected={type === "조퇴"}>
              조퇴
            </Type>
            <Type onClick={() => setType("결과")} selected={type === "결과"}>
              결과
            </Type>
          </AttendType>
        </InputLayout>
        <CalenderPopupTextareaLayout register={register} />
        <CalenderPopupDateLayout
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <SubmitInput type="submit" value="등록하기" />
      </CalenderPopupFormContainer>
    </PopupContainer>
  );
};

export default AddAttend;
