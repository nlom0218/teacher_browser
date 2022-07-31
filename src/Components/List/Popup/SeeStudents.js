import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { inPopup, outPopup } from "../../../apollo";
import routes from "../../../routes";
import { processStudentIcon } from "../../../shared";
import PopupContainer from "../../Shared/PopupContainer";
import SortTagBtn from "../SortTagBtn";
import { Btn, Container, Item, List } from "../styled/PopupSeeStudent";

const StudentName = styled.div``;

const StudentNum = styled.div`
  font-size: 0.85em;
  font-size: 0.85rem;
  opacity: 0.8;
  grid-row: 2 / 3;
  grid-column: 1 / 3;
`;

const StudentIcon = styled.div``;

const SeeStudents = ({ me, seeNum, allStudent, seeStudentIcon }) => {
  const navigate = useNavigate();

  const onClickName = (id) => {
    outPopup();
    navigate(`${routes.list}/student/${id}`);
  };

  const onClickAddBtn = () => {
    inPopup("createStudent");
  };
  return (
    <PopupContainer maxHeight={true}>
      <Container>
        <List>
          <SortTagBtn me={me} />
          {allStudent?.length === 0 ? (
            <div className="noStudnet">생성된 학생이 없습니다.</div>
          ) : (
            allStudent?.map((item, index) => {
              return (
                <Item key={index} onClick={() => onClickName(item._id)}>
                  {seeStudentIcon && item.icon && <StudentIcon>{processStudentIcon(item.icon)}</StudentIcon>}
                  <StudentName>{item.studentName}</StudentName>
                  {seeNum && (
                    <StudentNum>{item.studentNumber ? `${item.studentNumber}번` : "번호가 없습니다."}</StudentNum>
                  )}
                </Item>
              );
            })
          )}
        </List>
        <Btn onClick={onClickAddBtn}>학생 생성하기</Btn>
      </Container>
    </PopupContainer>
  );
};

export default SeeStudents;
