import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SEE_TO_DO_LIST_QUERY } from "../../Graphql/ToDoList/query";
import IcToDoList from "../../icons/ToDoList/IcToDoList";
import Loading from "../Shared/Loading";
import SectionContainer from "./styled/SectionContainer";
import SectionContents from "./styled/SectionContents";
import SectionList from "./styled/SectionList";
import SectionNoDateText from "./styled/SectionNoDateText";
import SectionTitle from "./styled/SectionTitle";
import { compare } from "../../shared";
// import Item from "./Item";
import { AiOutlinePlus } from "react-icons/ai";
import { inPopup } from "../../apollo";
import ToDoListSectionItem from "./ToDoListSectionItem";

const PlusToDoBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const TitleIcon = styled.div`
  svg {
    display: flex;
  }
`;

const ToDay = styled.div`
  opacity: 0.6;
`;

const SectionListLayout = styled.div`
  /* :not(:first-child) {
    margin-top: 10px;
    margin-top: 0.625rem;
  } */
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const SectionListTitle = styled.div`
  position: relative;
  justify-self: flex-start;
`;

const TitleText = styled.div``;

const TitleLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 8px;
  top: 0.5rem;
  height: 8px;
  height: 0.5rem;
  background-color: ${(props) => props.theme.fontColor};
  opacity: 0.2;
  /* transition: background-color 1s ease; */
`;

const NoToDoText = styled.div`
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.8;
`;

const ToDoListSection = ({ urlDate, refetchQuery }) => {
  const toDay = new Date().setHours(0, 0, 0, 0);

  const [completeToDos, setCompleteToDos] = useState([]);
  const [unCompleteToDos, setUnCompleteToDos] = useState([]);

  const { data, loading, refetch } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      date: parseInt(urlDate),
    },
  });
  console.log(data);

  const onClickPlusBtn = () => {
    inPopup("createToDo");
  };

  useEffect(() => {
    if (data) {
      const newUnCompleteToDos = [];
      const newCompleteToDos = [];
      data?.seeToDoList?.forEach((item) => {
        if (item.isComplete) {
          newCompleteToDos.push({ ...item, type: "complete" });
        } else if (!item.startDate) {
          newUnCompleteToDos.push({ ...item, type: "ing" });
        } else if (new Date(parseInt(item.startDate)) > toDay) {
          newUnCompleteToDos.push({ ...item, type: "inComing" });
        } else if (new Date(parseInt(item.endDate)) < toDay) {
          newUnCompleteToDos.push({ ...item, type: "not" });
        } else {
          newUnCompleteToDos.push({ ...item, type: "ing" });
        }
      });
      setCompleteToDos(newCompleteToDos.sort(compare("endDate")));
      setUnCompleteToDos(newUnCompleteToDos.sort(compare("endDate")));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetchQuery]);

  return (
    <SectionContainer>
      <SectionTitle>
        <TitleIcon>
          <IcToDoList />
        </TitleIcon>
        <div>할 일</div>
        <PlusToDoBtn onClick={onClickPlusBtn}>
          <AiOutlinePlus />
        </PlusToDoBtn>
      </SectionTitle>
      <SectionContents>
        {loading ? (
          <Loading page="subPage" />
        ) : data?.seeToDoList.length === 0 ? (
          <SectionNoDateText>생성된 할 일이 없습니다. 😁</SectionNoDateText>
        ) : (
          <SectionList>
            <SectionListLayout>
              <SectionListTitle>
                <TitleText>할 일</TitleText>
                <TitleLine></TitleLine>
              </SectionListTitle>
              {unCompleteToDos.length === 0 ? (
                <NoToDoText>할 일이 없습니다. 😁</NoToDoText>
              ) : (
                unCompleteToDos.map((item, index) => {
                  return <ToDoListSectionItem key={index} item={item} urlDate={urlDate} />;
                })
              )}
            </SectionListLayout>
            <SectionListLayout>
              <SectionListTitle>
                <TitleText>완료된 할 일</TitleText>
                <TitleLine></TitleLine>
              </SectionListTitle>
              {completeToDos.length === 0 ? (
                <NoToDoText>완료된 할 일이 없습니다. 😁</NoToDoText>
              ) : (
                completeToDos.map((item, index) => {
                  return <ToDoListSectionItem key={index} item={item} />;
                })
              )}
            </SectionListLayout>
          </SectionList>
        )}
      </SectionContents>
    </SectionContainer>
  );
};

export default ToDoListSection;
