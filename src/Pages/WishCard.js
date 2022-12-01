import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../Hooks/useMe";
import { useQuery } from "@apollo/client";
import { XMAS_MSG_QUERY } from "../Graphql/XmasTree/query";
import Snowfall from "react-snowfall";
import Loading from "../Components/Shared/Loading";
import { outPopup } from "../../../apollo";
// import { useNavigate } from "react-router-dom";
// import routes from "../../../routes";
// import { UPDATE_XMAS_MSG_MUTATION } from "../../../Graphql/XmasTree/mutation";
import { DELETE_XMAS_MSG_MUTATION } from "../../../Graphql/XmasTree/mutation";
import AlertMessage from "../../Shared/AlertMessage";

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
  grid-template-rows: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`;

const Check = styled.div``;
const WishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const WishCardBox = styled.div`
  border: 1px solid black;
  background-color: white;
`;
const WishContext = styled.div``;

const WishCard = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");
  const me = useMe();
  const { data, loading } = useQuery(XMAS_MSG_QUERY);

  const deleteonComplted = (result) => {
    const {
      deleteXmasMsg: { ok },
    } = result;
    if (ok) {
      // setMsg("소원이 저장되었습니다. 😀");
      outPopup();
    }
  };

  const [deleteXmasMsg, { loading: delloading }] = useMutation(DELETE_XMAS_MSG_MUTATION, {
    onComplted: deleteonComplted,
    refetchQueries: [{ query: XMAS_MSG_QUERY, variables: { userEmail: me?.email } }],
  });
  if (delloading) {
    return <Loading page="popupPage" />;
  }

  const onClickDel = () => {
    deleteXmasMsg({
      variables: {
        userEmail: me?.email,
        xmasMsgId: xmasMsgId,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const mylist = data?.xmasMsg.map((item, index) => {
        return { author: item.author, text: item.text, id: item.id, userEmail: item.userEmail };
      });
      console.log(mylist);
    }
  }, [data]);

  return (
    // 크리스마스 배경
    <Container>
      <Snowfall color={"white"} snowflakeCount={280} />
      <WishMain>
        <Check></Check>
        <WishContainer>
          {data?.xmasMsg.map((item, index) => (
            <WishCardBox>
              <WishContext>{item.text}</WishContext>
              <button>수정</button>
              <button onClick={onClickDel}>삭제</button>
            </WishCardBox>
          ))}
        </WishContainer>
      </WishMain>
      <AlertMessage></AlertMessage>
    </Container>
  );
};

export default WishCard;
