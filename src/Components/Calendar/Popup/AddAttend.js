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
  CalenderPopupDateLayout,
} from "./PopupLayout";
import { BsFillPersonCheckFill, BsFillPersonFill } from "react-icons/bs";
import { customMedia } from "../../../styles";
import IcNameTableClick from "../../../icons/NameTable/IcNameTableClick";
import {
  CREATE_ATTENDANCE_MUTATION,
  CREATE_MANY_ATTENDANCE_MUTATION,
} from "../../../Graphql/Attendance/mutation";
import { format, getDay, isWeekend } from "date-fns";
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
  const [monthArr, setMonthArr] = useState([]);
  const [studentName, setStudentName] = useState(undefined);
  const [studentId, setStudentId] = useState(undefined);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const refetchCalendarAttendance = () => {
    return monthArr.map((item) => {
      return {
        query: SEE_ATTENDANCE_QUERY,
        variables: {
          month: item,
          userEmail,
        },
      };
    });
  };

  const onCompleted = () => {
    setMsg("????????? ????????? ?????????????????????. ????");
    outPopup();
    localStorage.removeItem("attendStudentName");
    localStorage.removeItem("attendStudentId");
    setRefetchQuery((prev) => prev + 1);
  };

  const [createAttendance, { loading }] = useMutation(
    CREATE_ATTENDANCE_MUTATION,
    {
      onCompleted: (result) => {
        const {
          createAttendance: { ok, error },
        } = result;
        if (ok) {
          onCompleted();
        } else {
          setErrMsg(error);
        }
      },
      refetchQueries: refetchCalendarAttendance(),
    }
  );

  const [createManyAttendance, { loading: manyLoading }] = useMutation(
    CREATE_MANY_ATTENDANCE_MUTATION,
    {
      onCompleted: (result) => {
        const {
          createManyAttendance: { ok, error },
        } = result;
        if (ok) {
          onCompleted();
        } else {
          setErrMsg(error);
        }
      },
      refetchQueries: refetchCalendarAttendance(),
    }
  );

  const onSubmit = (data) => {
    const { contents } = data;
    if (!studentId) {
      setErrMsg("????????? ??????????????????. ????");
      return;
    }
    if (!type) {
      setErrMsg("?????? ????????? ??????????????????. ????");
      return;
    }
    if (!startDate) {
      setErrMsg("????????? ??????????????????. ????");
      return;
    }

    const startDateObject = new window.Date(startDate);
    const startDateMillisecond = startDateObject.setHours(0, 0, 0, 0);
    const endDateObject = new window.Date(endDate);
    const endDateMillisecond = endDateObject.setHours(0, 0, 0, 0);

    if (startDateMillisecond === endDateMillisecond) {
      const month = parseInt(format(startDateObject, "yyMM"));
      setMonthArr([month]);
      createAttendance({
        variables: {
          userEmail,
          studentId,
          type,
          month,
          date: startDateMillisecond,
          ...(contents && { contents }),
        },
      });
    } else {
      // ?????? ?????? ???????????? ????????? ????????? ???
      const term =
        (endDateMillisecond - startDateMillisecond) / 24 / 60 / 60 / 1000 + 1;
      const dateMonthArr = [];
      const newMonthArr = [];
      for (let index = 0; index < term; index++) {
        const date = new window.Date(
          startDateMillisecond + 86400000 * index
        ).setHours(0, 0, 0, 0);
        const month = parseInt(
          format(startDateMillisecond + 86400000 * index, "yyMM")
        );
        if (!isWeekend(date)) {
          dateMonthArr.push({ date, month });
          newMonthArr.push(month);
        }
      }
      setMonthArr([...new Set(newMonthArr)]);
      createManyAttendance({
        variables: {
          userEmail,
          studentId,
          type,
          dateMonthArr,
          ...(contents && { contents }),
        },
      });
    }
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

  if (loading || manyLoading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer maxHeight={true} needAlert={true}>
      <CalenderPopupFormContainer onSubmit={handleSubmit(onSubmit)}>
        <CalenderPopupTitle>????????????</CalenderPopupTitle>
        <InputLayout>
          <Icon>
            <BsFillPersonFill />
          </Icon>
          <SelectedStudent>
            <StudentName selected={studentName}>
              {studentName ? studentName : "????????? ????????? ????????????."}
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
              onClick={() => setType("?????? ??????")}
              selected={type === "?????? ??????"}
            >
              ?????? ??????
            </Type>
            <Type
              onClick={() => setType("?????? ??????")}
              selected={type === "?????? ??????"}
            >
              ?????? ??????
            </Type>
            <Type
              onClick={() => setType("????????? ??????")}
              selected={type === "????????? ??????"}
            >
              ????????? ??????
            </Type>
            <Type
              onClick={() => setType("?????? ??????")}
              selected={type === "?????? ??????"}
            >
              ?????? ??????
            </Type>
            <Type onClick={() => setType("??????")} selected={type === "??????"}>
              ??????
            </Type>
            <Type onClick={() => setType("??????")} selected={type === "??????"}>
              ??????
            </Type>
            <Type onClick={() => setType("??????")} selected={type === "??????"}>
              ??????
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
        <SubmitInput type="submit" value="????????????" />
      </CalenderPopupFormContainer>
    </PopupContainer>
  );
};

export default AddAttend;
