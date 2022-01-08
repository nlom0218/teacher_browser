import React from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns: repeat(4, 1fr);
  `}
  ${customMedia.greaterThan("desktop")`
   grid-template-columns: repeat(6, 1fr);
  `}
`;

const Item = styled.div`
  min-height: 120px;
  min-height: 7.5rem;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
`;
const Order = styled.div``;

const Name = styled.div`
  font-size: 1.25rem;
  font-size: 1.25em;
`;

const StudentOrder = ({ selectedStudent }) => {
  return (
    <Container>
      {selectedStudent.map((item, index) => {
        return (
          <Item key={item}>
            <Order>{index + 1}</Order>
            <Name>{item}</Name>
          </Item>
        );
      })}
    </Container>
  );
};

export default StudentOrder;
