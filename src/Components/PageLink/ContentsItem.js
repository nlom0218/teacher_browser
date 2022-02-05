import React from "react";
import styled from "styled-components";
import { IoArrowRedo } from "react-icons/io5";
import { BsBookmarkPlus, BsFillBookFill } from "react-icons/bs";
import { inPopup } from "../../apollo";
import IcBookMark from "../../icons/Bookmark/IcBookMark";
import IcBookMarkClick from "../../icons/Bookmark/IcBookMarkClick";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../../Hooks/useMe";
import { SETTING_LINK_MUTATION } from "../../Graphql/User/mutation";
import { CgFileDocument } from "react-icons/cg";
import { AiFillYoutube } from "react-icons/ai";
import { useState } from "react/cjs/react.development";
import { CardFadeIn } from "../../Animations/Fade";
import ContentsItemLayout from "./Styled/ContentsItemLayout";
import SiteType from "./SiteType";

const SiteName = styled.div`
  line-height: 160%;
  justify-self: center;
  align-self: center;
  text-align: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const SiteBtn = styled.div`
  display: grid;
  align-items: flex-end;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  font-size: 1.5rem;
  font-size: 1.5em;
`;
const SiteInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.cardHoverBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${CardFadeIn} 0.6s ease forwards;
  color: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 20px;
  padding: 1.25rem;
  line-height: 160%;
  overflow: hidden;
`;

const LinkBtn = styled.div`
  cursor: pointer;
`;
const BookMarkBtn = styled.div`
  cursor: pointer;
`;
const BookmarkIcon = styled.div``;

const ContentsItem = ({ item, userEmail, userLinkTitleArr }) => {
  const [isHover, setIsHover] = useState(false);

  const [settingLink, { loading }] = useMutation(SETTING_LINK_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onClickLinkBtn = () => {
    window.open(item.pageURL, "_blank");
  };
  const onClickBookmark = () => {
    inPopup("addBookmark");
    localStorage.setItem("addBookmark", item.pageTitle);
  };
  const onClickDelBookmark = () => {
    settingLink({
      variables: {
        userEmail,
        siteName: item.pageTitle,
      },
    });
  };
  const onClickSiteName = () => {
    inPopup("seePageLink");
    localStorage.setItem("addBookmark", item.pageTitle);
  };

  return (
    <ContentsItemLayout isBottom={true}>
      <SiteName onClick={onClickSiteName}>{item.pageTitle}</SiteName>
      <SiteBtn>
        <LinkBtn onClick={onClickLinkBtn}>
          <IoArrowRedo />
        </LinkBtn>
        <BookMarkBtn>
          {userLinkTitleArr.length === 0 && (
            <BookmarkIcon onClick={onClickBookmark}>
              <BsBookmarkPlus />
            </BookmarkIcon>
          )}
          {userLinkTitleArr.length !== 0 &&
            (userLinkTitleArr?.includes(item.pageTitle) ? (
              <BookmarkIcon onClick={onClickDelBookmark}>
                <IcBookMarkClick />
              </BookmarkIcon>
            ) : (
              <BookmarkIcon onClick={onClickBookmark}>
                <BsBookmarkPlus />
              </BookmarkIcon>
            ))}
        </BookMarkBtn>
      </SiteBtn>
      {/* {isHover &&  <SiteInfo>{item.pageDescription.length <27 ? item.pageDescription
            :${item.pageDescription.substr(0,27)}...더보기</SiteInfo>
            } */}
      {item.type && <SiteType type={item.type} />}
    </ContentsItemLayout>
  );
};

export default ContentsItem;
