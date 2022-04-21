import React from "react";
import {
  AiFillHome,
  AiFillLike,
  AiFillYoutube,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaHashtag, FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";

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
    display: flex;
  }
`;

const BtnContainer = () => {
  return (
    <Container>
      <Link to={routes.familyMonth}>
        <Btn>
          <AiFillHome />
        </Btn>
      </Link>
      <Link to={`${routes.familyMonth}/list`}>
        <Btn>
          <AiFillYoutube />
        </Btn>
      </Link>
      <Btn>
        <FaHashtag />
      </Btn>
      <Btn>
        <AiFillLike />
      </Btn>
      <Btn>
        <FaHeart />
      </Btn>
      <Btn>
        <FaSearch />
      </Btn>
      <Btn>
        <BsPlusLg />
      </Btn>
    </Container>
  );
};

export default BtnContainer;
