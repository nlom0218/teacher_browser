import React from "react";
import { AiFillFolderOpen, AiFillHome, AiFillLike, AiFillYoutube } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaHeart, FaSearch } from "react-icons/fa";
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  svg {
    color: rgba(255, 255, 255, 1);
    display: flex;
  }
  :hover {
    transform: scale(1.3);
  }
  transform: ${(props) => props.isPage && "scale(1.3)"};
  transition: transform 0.4s ease;
`;

const BtnContainer = ({ page, userEmail }) => {
  return (
    <Container>
      <Link to={routes.familyMonth}>
        <Btn isPage={!page}>
          <AiFillHome />
        </Btn>
      </Link>
      <Link
        to={{
          pathname: `${routes.familyMonth}/list`,
          search: "?page=1",
        }}
      >
        <Btn isPage={page === "list"}>
          <AiFillYoutube />
        </Btn>
      </Link>
      {/* <Link to={`${routes.familyMonth}/recommend`}>
        <Btn isPage={page === "recommend"}>
          <AiFillLike />
        </Btn>
      </Link> */}
      {userEmail && (
        <Link
          to={{
            pathname: `${routes.familyMonth}/liked`,
            search: "?page=1",
          }}
        >
          <Btn isPage={page === "liked"}>
            <FaHeart />
          </Btn>
        </Link>
      )}
      <Link to={`${routes.familyMonth}/search`}>
        <Btn isPage={page === "search"}>
          <FaSearch />
        </Btn>
      </Link>
      {userEmail && (
        <Link
          to={{
            pathname: `${routes.familyMonth}/my`,
            search: "?page=1",
          }}
        >
          <Btn isPage={page === "my"}>
            <AiFillFolderOpen />
          </Btn>
        </Link>
      )}
      <Link to={`${routes.familyMonth}/create`}>
        <Btn isPage={page === "create"}>
          <BsPlusLg />
        </Btn>
      </Link>
    </Container>
  );
};

export default BtnContainer;
