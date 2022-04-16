import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_HOME_LINKS_MUTATION } from "../../../Graphql/User/mutation";
import { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import { outPopup } from "../../../apollo";

const Container = styled.form``;

const RegisterHomeLinks = ({ setMsg, setErrMsg, userEmail }) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [createHomeLinks, { loading }] = useMutation(
    CREATE_HOME_LINKS_MUTATION,
    {
      refetchQueries: [{ query: ME_QUERY }],
      onCompleted: (result) => {
        const {
          createHomeLinks: { ok },
        } = result;
        if (ok) {
          outPopup();
          setMsg("즐겨찾기가 추가되었습니다.😀");
        }
      },
    }
  );
  const onSubmit = (data) => {
    const { title, link } = data;
    console.log(title, link);
    createHomeLinks({
      variables: {
        userEmail,
        title,
        link,
        ID: new window.Date().getTime(),
      },
    });
  };
  return (
    <PopupContainer>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} />
        <input {...register("link")} />
        <input type="submit" value="추가하기" />
      </Container>
    </PopupContainer>
  );
};

export default RegisterHomeLinks;
