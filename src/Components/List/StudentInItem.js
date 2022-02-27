import React, { useState } from "react";
import styled from "styled-components";
import { CardFadeIn } from "../../Animations/Fade";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPerson, BsPersonDash } from "react-icons/bs";
import { customMedia } from "../../styles";
import useMedia from "../../Hooks/useMedia";
import { useNavigate } from "react-router";
import routes from "../../routes";
import { useMutation } from "@apollo/client";
import useMe from "../../Hooks/useMe";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";
import { DELETE_STUDENT_MUTATION } from "../../Graphql/Student/mutation";
import Loading from "../Shared/Loading";

const Student = styled.div`
  position: relative;
  min-height: 160px;
  max-height: 160px;
  min-height: 10rem;
  max-height: 10rem;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: ${(props) => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: ${props => props.page === "journal" ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr"};
  padding: 10px;
  padding: 0.625rem;
  opacity: ${(props) => (props.hoverContainer ? 0.6 : 1)};
  ${customMedia.greaterThan("tablet")`
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-rows: ${props => props.page === "journal" ? "1fr 1fr 1fr" : "1fr 1fr"};
  `}
`;

const StudentName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
  line-height: 120%;
`;

const StudentJournal = styled.div`
  align-self: center;
  text-align: center;
  font-size: 0.875rem;
`

const HoverContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  ${customMedia.greaterThan("desktop")`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 1.875rem;
    padding-bottom: 30px;
    align-items: flex-end;
    background-color: ${(props) => props.theme.cardHoverBg};
    border-radius: 5px;
    border-radius: 0.3125rem;
    animation: ${CardFadeIn} 0.6s ease forwards;
    color: ${(props) => props.theme.bgColor};
  `}
`;

const FnBtn = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: ${props => props.page === "journal" ? "1fr 1fr" : "1fr 1fr 1fr"};
  justify-items: center;
  padding: 0px 10px;
  padding: 0rem 0.625rem;
  .fnBtn_icon {
    display: flex;
    padding: 5px;
    padding: 0.3125rem;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.fontColor};
    transition: border 1s ease;
    cursor: pointer;
    ${customMedia.greaterThan("desktop")`
      border: 1px solid ${(props) => props.theme.bgColor};
    `}
  }
`;

const StudentNumber = styled.div`
  align-self: center;
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.6;
`;

const StudentInItem = ({ item, listId, page, setSuccessMsg, listName, sort }) => {
  const me = useMe();

  const media = useMedia();
  const navigate = useNavigate();

  const [hoverContainer, setHoverContainer] = useState(false);

  const onCompleted = (result) => {
    const { deleteStudent: { ok } } = result
    if (ok) {
      setSuccessMsg(`${item.studentName}이 ${listName}에서 제거되었습니다. 😀`)
    }
  }

  const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT_MUTATION, {
    onCompleted,
    update: (cache, { data: { deleteStudent: { ok } } }) => {
      if (ok) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeStudentList() {
            }
          }
        })
      }
    }
  });

  const onMouseEnter = () => {
    if (media === "Mobile") {
      return;
    }
    setHoverContainer(true);
  };
  const onMouseLeave = () => {
    if (media === "Mobile") {
      return;
    }
    setHoverContainer(false);
  };

  const onClickProfile = () => {
    navigate(`${routes.list}/student/${item._id}`)
  };
  const onClickJournal = () => {
    navigate(`${routes.journal}/student/${item._id}`)
  };
  const onClickDel = () => {
    deleteStudent({
      variables: {
        disconnectOnly: true,
        teacherEmail: me?.email,
        studentId: item._id,
        listId,
      },
    });
  };

  if (loading) {
    return <Loading page="subPage" />
  }

  return (
    <Student onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} page={page}>
      <StudentName>{item.studentName}</StudentName>
      {page === "journal" && <StudentJournal>{item.journalNum}개의 학급일지</StudentJournal>}
      <StudentNumber>{item.studentNumber ? `${item.studentNumber}번` : <div>번호가 없습니다.</div>}</StudentNumber>
      {media !== "Desktop" ? (
        <HoverContainer>
          <FnBtn page={page}>
            <div className="fnBtn_icon" onClick={onClickJournal}>
              <AiOutlineEdit />
            </div>
            <div className="fnBtn_icon" onClick={onClickProfile}>
              <BsPerson />
            </div>
            {page !== "journal" && <div className="fnBtn_icon" onClick={onClickDel}>
              <BsPersonDash />
            </div>}
          </FnBtn>
        </HoverContainer>
      ) : (
        hoverContainer && (
          <HoverContainer>
            <FnBtn page={page}>
              <div className="fnBtn_icon" onClick={onClickJournal}>
                <AiOutlineEdit />
              </div>
              <div className="fnBtn_icon" onClick={onClickProfile}>
                <BsPerson />
              </div>
              {page !== "journal" && <div className="fnBtn_icon" onClick={onClickDel}>
                <BsPersonDash />
              </div>}
            </FnBtn>
          </HoverContainer>
        )
      )}
    </Student>
  );
};

export default StudentInItem;
