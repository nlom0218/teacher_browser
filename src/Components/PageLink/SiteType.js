import React from "react";
import styled from "styled-components";
import { CgFileDocument } from "react-icons/cg";
import { AiFillYoutube } from "react-icons/ai";

const SSiteType = styled.div`
  position: absolute;
  top: 5px;
  top: 0.3125rem;
  left: 5px;
  left: 0.3125rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  color: ${(props) => props.type === "유튜브" && "#FF2600"};
  color: ${(props) => props.type === "블로그" && "#19CF60"};
`;

const SiteType = ({ type }) => {
  return (
    <SSiteType type={type}>
      {type === "블로그" && <CgFileDocument />}
      {type === "유튜브" && <AiFillYoutube />}
    </SSiteType>
  );
};

export default SiteType;
