import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_XMAS_MSG_MUTATION } from "../../Graphql/XmasTree/mutation";
import { DELETE_XMAS_MSG_MUTATION } from "../../Graphql/XmasTree/mutation";
import { XMAS_MSG_QUERY } from "../../Graphql/XmasTree/query";
import { ME_QUERY } from "../../Hooks/useMe";
import { BsFillTrashFill } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";

const Container = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
`;
const Name = styled.div`
  padding: 10px;
  padding: 0.625rem;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
`;
const WishText = styled.div`
  padding: 10px;
  padding: 0.625rem;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
`;
const BtnBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  padding: 10px;
  padding: 0.625rem;
  justify-content: right;
`;
const BtnOne = styled.div`
  border-radius: 10px;
  border-radius: 0.625rem;
  border: 1px solid;
  padding: 5px;
  padding: 0.3125rem;
  justify-items: flex-end;
  font-size: 1em;
  font-size: 1rem;
  cursor: pointer;
`;

const WishCardBox = ({ item, me }) => {
  console.log(item);
  const [msgAuthor, setMsgAuthor] = useState(item.author);
  const [msgXmasText, setMsgXmasText] = useState(item.text);

  const onClickUpdate = () => {};

  // const onCompleted = (result) => {
  //   const {
  //     updateXmasMsg: { ok, error },
  //   } = result;
  //   if (!ok) {
  //     window.alert(error);
  //   } else {
  //     window.alert("소원 내용이 수정되었습니다.");
  //   }
  // };
  const deleteOnCompleted = (result) => {
    const {
      deleteXmasMsg: { ok },
    } = result;
    if (ok) {
      window.alert("지워짐");
      // refetchQueries: [{ query: ME_QUERY }],
    }
  };

  // const [updateXmasMsg, { loading: updateLoading }] = useMutation(UPDATE_XMAS_MSG_MUTATION, { onCompleted });
  const [deleteXmasMsg, { loading: deleteLoading }] = useMutation(DELETE_XMAS_MSG_MUTATION, {
    onCompleted: deleteOnCompleted,
    refetchQueries: [{ query: XMAS_MSG_QUERY, variables: { userEmail: me?.email } }],
  });
  // const onSubmit = (data) => {
  //   const { item } = data;
  //   updateXmasMsg({
  //     variables: {
  //       userEmail,
  //       xmasMsgId,
  //       author,
  //       text,
  //     },
  //   });
  // };

  const onClickDelBtn = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteXmasMsg({
        variables: {
          userEmail: item.userEmail,
          xmasMsgId: item._id,
        },
      });
    } else {
      return;
    }
  };
  // useEffect(() => {
  //   if (data) {
  //     setMsgAuthor();
  //     setMsgXmasText();
  //   }
  // }, [data]);

  return (
    <Container>
      <BtnBox>
        <BtnOne>
          <TiPencil onClick={onClickUpdate} />
        </BtnOne>
        <BtnOne>
          <BsFillTrashFill onClick={onClickDelBtn} />
        </BtnOne>
      </BtnBox>
      <WishText>{msgXmasText}</WishText>
      <Name>- {msgAuthor} -</Name>
    </Container>
  );
};

export default WishCardBox;
