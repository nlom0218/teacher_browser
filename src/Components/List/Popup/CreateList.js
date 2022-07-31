import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { CREATE_STUDENT_LIST_MUTATION } from "../../../Graphql/StudentList/mutation";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import useMe from "../../../Hooks/useMe";
import { customMedia } from "../../../styles";
import Loading from "../../Shared/Loading";
import PopupContainer from "../../Shared/PopupContainer";

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
    column-gap: 40px;
    column-gap: 2.5rem;
  `}
`;

const NameInput = styled.input`
  padding: 12px 20px;
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
  }
`;

const SubmitInput = styled.input`
  text-align: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.6s ease;
`;

const ErrMsg = styled.div`
  grid-column: 1 / -1;
  color: ${(props) => props.theme.redColor};
  text-align: center;
`;

const CreateList = ({ setErrorMsg, setSuccessMsg }) => {
  const [errMsg, setErrMsg] = useState(undefined);
  const me = useMe();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (result) => {
    const {
      createStudentList: { ok, error },
    } = result;
    if (!ok) {
      setErrorMsg(error);
      outPopup();
      return;
    } else {
      setSuccessMsg("명렬표가 생성되었습니다. 😀");
      outPopup();
    }
  };
  const [createStudentList, { loading }] = useMutation(CREATE_STUDENT_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_LIST_QUERY }],
  });
  const onSubmit = (data) => {
    if (loading) {
      return;
    }
    const { listName } = data;
    if (listName.length < 2 || listName.length > 11) {
      setErrMsg("명렬표의 이름은 2~10자 사이로 입력하세요.");
      return;
    }
    createStudentList({
      variables: {
        teacherEmail: me?.email,
        listName,
      },
    });
  };

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <PopupContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <NameInput
          {...register("listName", {
            required: true,
            onChange: () => setErrMsg(undefined),
          })}
          type="text"
          autoComplete="off"
          placeholder="명렬표 이름을 입력하세요."
          maxLength="10"
          autoFocus
        />
        <SubmitInput type="submit" value="생성" />
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      </Form>
    </PopupContainer>
  );
};

export default CreateList;
