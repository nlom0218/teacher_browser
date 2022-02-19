// 리액트
import React, { useState } from "react";

// 스타일
import styled from "styled-components";
import { customMedia } from "../../styles";

// 아이콘
import IcNameTable from "../../icons/NameTable/IcNameTable";
import IcNameTableClick from "../../icons/NameTable/IcNameTableClick";
import { inPopup } from "../../apollo";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
`;

const ListIcon = styled.div`
  grid-row: 1/2;
  grid-column: 1/3;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 2.5em;
    font-size: 2.5rem;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
    grid-column: 2/3;
  `}
`;

const ListName = styled.div``;

const TitleArea = ({ studentListName, type, studentName }) => {
  const [IconListIsHover, setIconListIsHover] = useState(false);
  const onClickListIcon = () => {
    inPopup("seeStudentList");
  };

  return (
    <Container>
      <Title>{studentName && studentName} 학급일지</Title>
      {type !== "student" && <ListIcon>
        <ListName>{studentListName ? studentListName : "선택된 명렬표가 없습니다."}</ListName>
        <div onClick={onClickListIcon} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
          {IconListIsHover ? <IcNameTableClick /> : <IcNameTable />}
        </div>
      </ListIcon>}
    </Container>
  );
};

export default TitleArea;
