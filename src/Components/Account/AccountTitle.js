import React from "react";
import styled from "styled-components";

const SAccountTitle = styled.div`
  font-size: 32px;
  font-size: 2rem;
  font-weight: 600;
`;

const AccountTitle = ({ title }) => {
  return <SAccountTitle>{title}</SAccountTitle>;
};

export default AccountTitle;
