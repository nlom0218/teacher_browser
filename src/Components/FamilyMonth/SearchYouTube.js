import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";
import routes from "../../routes";
import ListYouTube from "./AllListYouTube";
import { customMedia } from "../../styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Form = styled.form`
  justify-self: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  ${customMedia.greaterThan("tablet")`
    width: 80%;
    font-size: 1em;
    font-size: 1rem;
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%;
    `}
  .textInput {
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
  .submitInput {
    background-color: #f38181;
    padding: 0px 40px;
    padding: 0rem 2.5rem;
    color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 10px;
    border-radius: 0.625rem;
    cursor: pointer;
  }
`;

const SearchYouTube = ({ setErrMsg }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { search } = data;
    if (!search) {
      setErrMsg("검색할 태그를 입력하세요.😢");
      return;
    }
    navigate({
      pathname: `${routes.familyMonth}/search`,
      search: `?search=${search}&page=1`,
    });
  };

  useEffect(() => {
    setValue("search", search);
  }, [search]);
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="textInput"
          type="text"
          autoComplete="off"
          {...register("search")}
          placeholder="검색할 태그를 입력하세요.😀"
        />
        <input type="submit" value="검색" className="submitInput" />
      </Form>
      {/* {search && <ListYouTube />} */}
    </Container>
  );
};

export default SearchYouTube;
