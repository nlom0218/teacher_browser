import React from "react";
import { AiFillHome, AiFillLike, AiFillYoutube } from "react-icons/ai";
import { FaHashtag, FaSearch } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  align-self: center;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: #f38181;
  border-radius: 50%;
  cursor: pointer;
  svg {
    color: rgba(255, 255, 255, 1);
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const BtnContainer = () => {
  return (
    <Container>
      <Btn>
        <AiFillHome />
      </Btn>
      <Btn>
        <AiFillYoutube />
      </Btn>
      <Btn>
        <FaHashtag />
      </Btn>
      <Btn>
        <AiFillLike />
      </Btn>
      <Btn>
        <FaSearch />
      </Btn>
    </Container>
  );
};

export default BtnContainer;
