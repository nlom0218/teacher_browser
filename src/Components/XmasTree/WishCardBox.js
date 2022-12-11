import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { DELETE_XMAS_MSG_MUTATION } from "../../Graphql/XmasTree/mutation";
import { XMAS_MSG_QUERY } from "../../Graphql/XmasTree/query";
import { BsFillTrashFill } from "react-icons/bs";
import CardBackground from "./Popup/CardBackground";
import { inPopup } from "../../apollo";

const Container = styled.div`
  background: url(${(props) => CardBackground[props.bg]});
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  border-radius: 10px;
  border-radius: 0.625rem;
  overflow: hidden;
  padding: 20px;
  padding: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Layout = styled.div`
  background-color: white;
  opacity: 0.8;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 10px;
  border-radius: 0.625rem;
  .wishCardBox_text {
    opacity: 1;
  }
  cursor: pointer;
`;

const Name = styled.div`
  padding: 10px;
  padding: 0.625rem;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
`;
const WishText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding: 1.25rem;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  overflow: hidden;
  line-height: 160%;
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
  z-index: 20;
  :hover {
    transform: scale(1.1);
  }
`;

const WishCardBox = ({ item, me, viewMode, refetch }) => {
  const [msgAuthor, setMsgAuthor] = useState(item.author);
  const [msgXmasText, setMsgXmasText] = useState(item.text);

  const onClickDelBtn = () => {
    deleteXmasMsg({
      variables: {
        userEmail: me?.email,
        xmasMsgId: item._id,
      },
    });
  };

  const onClickBoxPopup = () => {
    inPopup("xmasCardPopup");
    localStorage.setItem("xmasCardPopup", JSON.stringify(item));
  };

  const deleteonComplted = (result) => {
    const {
      deleteXmasMsg: { ok },
    } = result;
    if (ok) {
    }
  };

  const [deleteXmasMsg] = useMutation(DELETE_XMAS_MSG_MUTATION, {
    onComplted: deleteonComplted,
    refetchQueries: [
      {
        query: XMAS_MSG_QUERY,
        variables: { userEmail: viewMode === "my" ? me?.email : undefined, pageNumber: 1 },
      },
    ],
  });

  return (
    <Container bg={item.bg}>
      <Layout>
        <BtnBox className="wishCardBox_text">
          {me?.email === item?.userEmail ? (
            <React.Fragment>
              <BtnOne>
                <BsFillTrashFill onClick={onClickDelBtn} />
              </BtnOne>
            </React.Fragment>
          ) : null}
        </BtnBox>
        <WishText className="wishCardBox_text" onClick={onClickBoxPopup}>
          {msgXmasText.length < 60 ? msgXmasText : msgXmasText.slice(0, 60) + "..."}
        </WishText>
        <Name className="wishCardBox_text">- {msgAuthor} -</Name>
      </Layout>
    </Container>
  );
};

export default WishCardBox;
