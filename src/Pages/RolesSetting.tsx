import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import RolesGraph from "../Components/Roles/RolesGraph";
import BasicContainer from "../Components/Shared/BasicContainer";

const Form = styled.form`
  min-height: 100%;
  max-height: 100%;
  padding: 40px;
  padding: 2.5rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
`;

const BtnConatiner = styled.div`
  display: grid;
  align-items: center;
  column-gap: 20px;
  grid-template-columns: repeat(3, auto) 1fr;
  .line-btn {
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
  }

  .save-btn {
    justify-self: flex-end;
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.bgColor};
  }

  .btn {
    transition: background-color 1s ease, color 1s ease;
    padding: 5px 20px;
    padding: 0.3125rem 1.25em;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesSetting = ({ setErrMsg }: IProps) => {
  const [lineNums, setLineNums] = useState(0);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onClickLineBtn = (type: string) => {
    if (type === "add") return setLineNums((prev) => (prev += 1));
    if (lineNums === -10) return console.log(lineNums, "안댕!!");
    return setLineNums((prev) => (prev -= 1));
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (error: any) => {
    if (error) setErrMsg("빈 칸이 존재합니다. 😓");
  };

  const preventClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <BasicContainer menuItem={true}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
        <BtnConatiner>
          <div className="line-btn btn" onClick={() => onClickLineBtn("add")}>
            줄 추가
          </div>
          <div className="line-btn btn" onClick={() => onClickLineBtn("remove")}>
            줄 삭제
          </div>
          <span>1인 1역 역할을 작성후 저장해 주세요.</span>
          <input type="submit" value="저장" className="save-btn btn" />
        </BtnConatiner>
        <RolesGraph lineNums={lineNums} register={register} />
      </Form>
    </BasicContainer>
  );
};

export default RolesSetting;
