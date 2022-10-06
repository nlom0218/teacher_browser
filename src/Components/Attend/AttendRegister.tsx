import { useMutation } from "@apollo/client";
import { format, isWeekend } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CREATE_ATTENDANCE_MUTATION } from "../../Graphql/Attendance/mutation";
import { SEE_ATTENDANCE_QUERY } from "../../Graphql/Attendance/query";
import routes from "../../routes";
import AlertMessage from "../Shared/AlertMessage";
import Loading from "../Shared/Loading";
import AttendDetail from "./AttendDetail";
import AttendType from "./AttendType";
import SeletedDate from "./SeletedDate";
import StudentList from "./StudentList";

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Title = styled.div`
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  justify-self: flex-end;
`;

const RegisterContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  align-items: flex-start;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.girdBorderColor};
  transition: background-color 1s ease, border 1s ease;
`;

const NeedLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div:first-child {
    margin: 20px 0px;
    margin: 1.25rem 0rem;
  }
  div:nth-child(2) {
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.originBgColor};
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    transition: background-color 1s ease, color 1s ease;
  }
`;

interface IForm {
  contents: string | undefined;
}

interface IProps {
  email: string | undefined;
}

const AttendRegister = ({ email }: IProps) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [seletedStudent, setSeletedStudent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new window.Date());
  const [endDate, setEndDate] = useState(new window.Date());
  const [type, setType] = useState<string>("");
  const { register, getValues, setValue } = useForm<IForm>({
    mode: "onChange",
  });

  const [createAttendance, { loading }] = useMutation(CREATE_ATTENDANCE_MUTATION, {
    onCompleted: (result) => {
      const { createAttendance } = result;
      if (createAttendance.length > 0) {
        setMsg("출결이 등록되었습니다.");
        setSeletedStudent([]);
        setStartDate(new window.Date());
        setEndDate(new window.Date());
        setValue("contents", "");
        setType("");
      } else {
        // setErrMsg(error);
      }
    },
    update: (cache, { data: { createAttendance } }) => {
      if (createAttendance.length > 0) {
        const months: number[] = [];
        createAttendance.forEach(({ month }: { month: number }) => {
          if (!months.includes(month)) {
            months.push(month);
          }
        });
        months.forEach((item: number) => {
          const newAttends = createAttendance.filter(({ month }: { month: number }) => month === item);
          const attends = cache.readQuery<any>({
            query: SEE_ATTENDANCE_QUERY,
            variables: { month: item },
          });
          if (attends) {
            cache.writeQuery({
              query: SEE_ATTENDANCE_QUERY,
              variables: { month: item },
              data: {
                seeAttendance: [...attends?.seeAttendance, ...newAttends],
              },
            });
          }
        });
      }
    },
  });

  const onClickLogin = () => {
    navigate(routes.login);
  };

  useEffect(() => {
    if (type !== "") {
      const startDateObject = new window.Date(startDate);
      const startDateMillisecond = startDateObject.setHours(0, 0, 0, 0);
      const endDateObject = new window.Date(endDate);
      const endDateMillisecond = endDateObject.setHours(0, 0, 0, 0);
      const term = (endDateMillisecond - startDateMillisecond) / 24 / 60 / 60 / 1000 + 1;
      const dateMonthArr = [];
      for (let index = 0; index < term; index++) {
        const date = new window.Date(startDateMillisecond + 86400000 * index).setHours(0, 0, 0, 0);
        const month = parseInt(format(startDateMillisecond + 86400000 * index, "yyMM"));
        if (!isWeekend(date)) {
          dateMonthArr.push({ date, month });
        }
      }
      createAttendance({
        variables: {
          userEmail: email,
          studentId: seletedStudent,
          type,
          dateMonthArr,
          ...(getValues("contents") && { contents: getValues("contents") }),
        },
      });
    }
  }, [type]);

  return (
    <Layout>
      {loading && <Loading page="center" />}
      <Title>출결등록</Title>
      <RegisterContainer>
        {email ? (
          <React.Fragment>
            <StudentList seletedStudent={seletedStudent} setSeletedStudent={setSeletedStudent} />
            <SeletedDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <AttendDetail register={register("contents")} />
            <AttendType type={type} setType={setType} seletedStudent={seletedStudent} />
          </React.Fragment>
        ) : (
          <NeedLogin>
            <div>출결 등록을 하기 위해선 로그인이 필요합니다.☺️</div>
            <div onClick={onClickLogin}>로그인하기</div>
          </NeedLogin>
        )}
      </RegisterContainer>
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
    </Layout>
  );
};

export default AttendRegister;
