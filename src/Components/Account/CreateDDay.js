import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_DDAY } from "../../Graphql/User/mutation";
import { ME_QUERY } from "../../Hooks/useMe";

const SCreateDDay = styled.form`
  display: grid;
  grid-template-columns: 1fr auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const TitleInput = styled.input`
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.originBgColor};
`;

const DDayDate = styled.div`
  input {
    width: 100%;
    background-color: ${(props) => props.theme.originBgColor};
    padding: 10px 0px;
    padding: 0.625rem 0rem;
    border-radius: 5px;
    border-radius: 0.315rem;
    cursor: pointer;
    text-align: center;
  }
`;

const Submit = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  cursor: pointer;
`;

const CreateDDay = ({ setErrMsg, userEmail }) => {
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const [cerateDDay, { loading }] = useMutation(CREATE_DDAY, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onSubmit = (data) => {
    const { title } = data;
    if (!title) {
      setErrMsg("제목을 입력하세요.😂");
      return;
    }
    const numberDate = new Date(date).setHours(0, 0, 0, 0);
    const ID = new window.Date().getTime();
    cerateDDay({
      variables: {
        userEmail,
        title,
        date: numberDate,
        ID,
      },
    });
  };

  return (
    <SCreateDDay onSubmit={handleSubmit(onSubmit)}>
      <TitleInput {...register("title")} placeholder="제목을 입력하세요." />
      <DDayDate>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={(date) => setDate(date)}
          todayButton="오늘"
          locale={ko}
        />
      </DDayDate>
      <Submit type="submit" value="저장" />
    </SCreateDDay>
  );
};

export default CreateDDay;
