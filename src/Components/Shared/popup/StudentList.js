import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import StudentListItem from "./StudentListItem";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import Loading from "../Loading";
import routes from "../../../routes";
import { useNavigate } from "react-router";
import { inPopup } from "../../../apollo";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
  text-align: center;
`;
const NoDataMsg = styled.div`
  grid-column: 1 / -1;
  align-self: flex-start;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
`;

const Msg = styled.div`
  line-height: 160%;
`;

const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const StudentList = ({ setIsShuffle, page }) => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);

  const onClickBtn = () => {
    navigate(routes.list);
    inPopup("createList");
  };

  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <Container>
        {data?.seeStudentList?.length === 0 ? (
          <NoDataMsg>
            <Msg>생성된 명렬표가 없습니다.</Msg>
            <Msg>명렬표에서 생성해주세요.</Msg>
            <Btn onClick={onClickBtn}>명렬표로 이동하기</Btn>
          </NoDataMsg>
        ) : (
          data?.seeStudentList.map((item, index) => {
            return <StudentListItem key={index} item={item} setIsShuffle={setIsShuffle} page={page} />;
          })
        )}
      </Container>
    </PopupContainer>
  );
};

export default StudentList;
