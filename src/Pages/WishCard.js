import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../Hooks/useMe";
import { useMutation, useQuery } from "@apollo/client";
import { XMAS_MSG_QUERY } from "../Graphql/XmasTree/query";
import Snowfall from "react-snowfall";
// import { UPDATE_XMAS_MSG_MUTATION } from "../../../Graphql/XmasTree/mutation";
import AlertMessage from "../Components/Shared/AlertMessage";
import WishCardBox from "../Components/XmasTree/WishCardBox";
import { TiHomeOutline } from "react-icons/ti";
import { TiTree } from "react-icons/ti";
import { MdGroups } from "react-icons/md";
import { FiSmile } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { fullScreenMode, inPopup, isPopupVar } from "../apollo";
import routes from "../routes";
import { useNavigate } from "react-router-dom";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";
import XmasCardPopup from "../Components/XmasTree/Popup/XmasCardPopup";

const Container = styled.div`
  background: url(https://media.discordapp.net/attachments/1012001449854648480/1041329981969661982/c6f1be7663bdd36b.png?width=1410&height=793);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;
`;

const WishMain = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`;

const Check = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px;
  padding: 0.625rem;
  margin: 10px;
  margin: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  border-radius: 0.625rem;
  font-size: 1em;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  transform: ${(props) => props.isPage && "scale(1.3)"};
  transition: transform 0.4s ease;
`;
const WishPage = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  margin: 10px;
  margin: 0.625rem;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
`;
const WishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  align-items: stretch;
  column-gap: 40px;
  column-gap: 2.5rem;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const WishCard = () => {
  const me = useMe();
  const userEmail = me?.email;

  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);
  const [viewMode, setViewMode] = useState("all");
  const [viewList, setViewList] = useState(undefined);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(undefined);

  const { data, loading, refetch } = useQuery(XMAS_MSG_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      userEmail: viewMode === "my" ? me?.email : undefined,
      pageNumber: pageNum,
    },
  });
  useEffect(() => {
    if (data) {
      setViewList(data?.xmasMsg.msg);
      const allPageA = parseInt(data?.xmasMsg.count / 6) + 1;
      const plusOne = data?.xmasMsg.count % 6 > 0;
      if (plusOne === true) {
        setLastPage(allPageA + 1);
      }
      setLastPage(allPageA);
    }
  }, [data]);

  useEffect(() => {
    fullScreenMode();
  }, []);

  const onClickHome = () => {
    navigate(routes.home);
  };
  const onClickWishHome = () => {
    navigate(routes.xmasTree);
  };
  const onClickNewWish = () => {
    inPopup("inputWish");
  };

  const onClickMyWish = () => {
    setViewMode("my");
    setPageNum(1);
  };
  const onClickAllWish = () => {
    setViewMode("all");
  };
  const onClickPre = () => {
    setPageNum(pageNum - 1);
  };
  const onClickNext = () => {
    setPageNum(pageNum + 1);
  };
  return (
    <Container>
      <Snowfall color={"white"} snowflakeCount={280} />
      <WishMain>
        <Check>
          <Btn onClick={onClickHome}>
            <TiHomeOutline />
            티처캔 홈
          </Btn>
          <Btn onClick={onClickWishHome}>
            <TiTree />
            이벤트 홈
          </Btn>
          {userEmail && (
            <Btn onClick={onClickNewWish}>
              <TiPencil />
              소원 쓰기
            </Btn>
          )}
          {userEmail && (
            <Btn onClick={onClickMyWish}>
              <FiSmile /> 나의 소원
            </Btn>
          )}
          <Btn onClick={onClickAllWish}>
            <MdGroups />
            전체 보기
          </Btn>
        </Check>
        <WishContainer>
          {viewList &&
            viewList.map((item, index) => (
              <WishCardBox item={item} me={me} key={item._id} viewMode={viewMode} refetch={refetch} />
            ))}
        </WishContainer>
        <WishPage>
          {pageNum > 1 ? (
            <Btn onClick={onClickPre}>
              <FaChevronLeft />
            </Btn>
          ) : (
            <div></div>
          )}
          {pageNum}
          {pageNum === lastPage ? (
            <div></div>
          ) : (
            <Btn onClick={onClickNext}>
              <FaChevronRight />
            </Btn>
          )}
        </WishPage>
      </WishMain>
      <AlertMessage></AlertMessage>
      {isPopup === "inputWish" && <InputWish me={me} viewMode={viewMode} setPageNum={setPageNum} refetch={refetch} />}
      {isPopup === "xmasCardPopup" && <XmasCardPopup />}
    </Container>
  );
};

export default WishCard;
