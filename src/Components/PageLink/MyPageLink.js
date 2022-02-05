import React from "react";
import { FaWindowMinimize } from "react-icons/fa";
import styled from "styled-components";
import SiteType from "./SiteType";
import ContentsItemLayout from "./Styled/ContentsItemLayout";
import { BsInfo } from "react-icons/bs";
import { inPopup } from "../../apollo";

const Title = styled.div`
  display: grid;
  text-align: center;
  align-items: center;
  cursor: pointer;
  line-height: 160%;
`;
const InfoIcon = styled.div`
  position: absolute;
  top: 5px;
  top: 0.3125rem;
  right: 5px;
  right: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 0.4s ease, color 0.4s ease;
  }
  svg {
    display: flex;
    font-size: 1.25rem;
    font-size: 1.25em;
  }
`;
const MyPageLink = ({ item }) => {
  const onClickLink = () => {
    window.open(item.pageURL, "_blank");
  };
  const onClickInfoBtn = () => {
    inPopup("detailPageLink");
    localStorage.setItem("addBookmark", item.pageTitle);
  };

  return (
    <ContentsItemLayout>
      <Title onClick={onClickLink}>{item.pageTitle}</Title>
      {item.type && <SiteType type={item.type} />}
      <InfoIcon onClick={onClickInfoBtn}>
        <BsInfo />
      </InfoIcon>
    </ContentsItemLayout>
  );
};

export default MyPageLink;
