import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PopupContainer from "../../Shared/PopupContainer";
import { CREATE_DDAY } from "../../../Graphql/User/mutation";
import { ME_QUERY } from "../../../Hooks/useMe";
import { BsCalendarDate, BsFillPencilFill } from "react-icons/bs";
import { outPopup } from "../../../apollo";

const SCreateDDay = styled.form`
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

const RegisterDDay = ({ setErrMsg, userEmail, setMsg }) => {
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
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
    refetchQueries: [{ query: ME_QUERY }],
    onCompleted,
  });

  const onSubmit = (data) => {
    const { title } = data;
    if (!title) {
      setErrMsg("내용을 입력하세요.😂");
      return;
    }
    const numberDate = new Date(date).setHours(0, 0, 0, 0);
    const ID = new window.Date().getTime();
    createDDay({
      variables: {
        userEmail,
        title,
        date: numberDate,
        ID,
      },
    });
  };
  return (
    <PopupContainer>
      <SCreateDDay onSubmit={handleSubmit(onSubmit)}>
        <Title>D-DAY 등록</Title>
        <InputLayout>
          <Icon>
            <BsFillPencilFill />
          </Icon>
          <TitleInput {...register("title")} placeholder="내용을 입력하세요." />
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
          <Submit type="submit" value="등록하기" />
        </InputLayout>
      </SCreateDDay>
    </PopupContainer>
  );
};

export default RegisterDDay;
