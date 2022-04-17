import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PopupContainer from "../../Shared/PopupContainer";
import {
  CREATE_DDAY,
  EDIT_DDAY_MUTATION,
} from "../../../Graphql/User/mutation";
import { ME_QUERY } from "../../../Hooks/useMe";
import { BsCalendarDate, BsFillPencilFill } from "react-icons/bs";
import { outPopup } from "../../../apollo";
import Loading from "../../Shared/Loading";

const SCreateDDay = styled.form`
  letter-spacing: 0px;
  letter-spacing: 0rem;
  text-align: start;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  /* grid-template-columns: 1fr auto auto; */
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  :last-child {
    grid-template-columns: auto 1fr auto;
  }
`;

const Icon = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`;

const TitleInput = styled.input`
  padding: 15px 20px;
  padding: 0.938rem 1.25rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.originBgColor};
`;

const DDayDate = styled.div`
  input {
    width: 100%;
    background-color: ${(props) => props.theme.originBgColor};
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 40px;
    border-radius: 2.5rem;
    cursor: pointer;
    text-align: center;
  }
`;

const Submit = styled.input`
  justify-self: flex-end;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
`;

const RegisterDDay = ({
  setErrMsg,
  userEmail,
  setMsg,
  dDay,
  initMove,
  toggleIsMoveDDay,
  userId,
}) => {
  const dDayID = parseInt(localStorage.getItem("dDayID"));
  const [date, setDate] = useState(new Date());
  const [createID, setCreateID] = useState(undefined);
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const onCompleted = (result) => {
    const {
      createDDay: { ok, error },
    } = result;
    if (ok) {
      outPopup();
      setMsg("D-DAY가 생성되었습니다.😀");
    }
  };

  const [createDDay, { loading }] = useMutation(CREATE_DDAY, {
    onCompleted,
    update(
      cache,
      {
        data: {
          createDDay: { ok },
        },
      }
    ) {
      if (ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            dDay(prev) {
              return [
                ...prev,
                {
                  date: new Date(date).setHours(0, 0, 0, 0),
                  title: getValues("title"),
                  ID: createID,
                },
              ];
            },
          },
        });
      }
    },
  });

  const [editDDay, { loading: editLoading }] = useMutation(EDIT_DDAY_MUTATION, {
    onCompleted: (result) => {
      const {
        editDDay: { ok },
      } = result;
      if (ok) {
        if (initMove) {
          toggleIsMoveDDay({
            variables: { userEmail, type: "start" },
          });
        }
        outPopup();
        localStorage.removeItem("dDayID");
        setMsg("D-DAY가 수정되었습니다.😀");
      }
    },
    update(
      cache,
      {
        data: {
          editDDay: { ok },
        },
      }
    ) {
      if (ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            dDay(prev) {
              const copyDDay = [...prev];
              const targetIndex = copyDDay.findIndex(
                (item) => item.ID === dDayID
              );
              return [
                ...copyDDay.slice(0, targetIndex),
                {
                  ID: dDayID,
                  title: getValues("title"),
                  date: new Date(date).setHours(0, 0, 0, 0),
                },
                ...copyDDay.slice(targetIndex + 1),
              ];
            },
          },
        });
      }
    },
  });

  const onSubmit = (data) => {
    const { title } = data;
    if (!title) {
      setErrMsg("내용을 입력하세요.😂");
      return;
    }
    const numberDate = new Date(date).setHours(0, 0, 0, 0);
    const ID = new window.Date().getTime();
    setCreateID(ID);
    if (dDayID) {
      editDDay({
        variables: {
          userEmail,
          title,
          date: numberDate,
          ID: dDayID,
        },
      });
    } else {
      createDDay({
        variables: {
          userEmail,
          title,
          date: numberDate,
          ID,
        },
      });
    }
  };

  useEffect(() => {
    if (dDayID) {
      const curDDay = dDay.filter((item) => item.ID === dDayID)[0];
      setValue("title", curDDay.title);
      setDate(new Date(curDDay.date));
    }
  }, []);

  if (loading || editLoading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <SCreateDDay onSubmit={handleSubmit(onSubmit)}>
        <Title>D-DAY {dDayID ? "수정" : "등록"}</Title>
        <InputLayout>
          <Icon>
            <BsFillPencilFill />
          </Icon>
          <TitleInput
            {...register("title")}
            placeholder="내용을 입력하세요."
            autoComplete="off"
          />
        </InputLayout>
        <InputLayout className="dateInput">
          <Icon>
            <BsCalendarDate />
          </Icon>
          <DDayDate>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={date}
              onChange={(date) => setDate(date)}
              todayButton="오늘"
              locale={ko}
            />
          </DDayDate>
          {<Submit type="submit" value={dDayID ? "수정하기" : "등록하기"} />}
        </InputLayout>
      </SCreateDDay>
    </PopupContainer>
  );
};

export default RegisterDDay;
