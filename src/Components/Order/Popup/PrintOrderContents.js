import React, { useState } from "react";
import styled from "styled-components";
import IcPrint from "../../../icons/Print/IcPrint";
import PopupPrintContainer from "../../Shared/PopupPrintContainer";
import { useReactToPrint } from "react-to-print";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { color } from "../../../styles";

const PrintTopContents = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const PrintType = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const PrintTypeItem = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`;

const PrintIcon = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-weight: 600;
  cursor: pointer;
  svg {
    font-size: 2.25em;
    font-size: 2.25rem;
    display: flex;
  }
`;

const PrintContainer = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  padding: 20px;
  padding: 1.25rem;
  @media print {
    @page {
      size: A4;
      margin: 10mm;
    }
  }
`;

const PageTitle = styled.div`
  color: ${color.black};
`;

const Title = styled.div`
  text-align: center;
  font-size: 2em;
  font-size: 2rem;
  color: ${color.black};
`;

const List = styled.div`
  border: ${color.black} 2px solid;
  background-color: ${color.black};
  color: ${color.black};
  row-gap: 2px;
  row-gap: 0.125rem;
  column-gap: 2px;
  column-gap: 0.125rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .print_table_row_name {
    text-align: center;
    font-weight: 600;
    background-color: ${color.white};
  }
`;

const Item = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.2em;
  font-size: 1.2rem;
`;

const Number = styled.div`
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  background-color: ${color.white};
  text-align: center;
  border-right: ${color.black} 2px solid;
  font-weight: 600;
`;

const Name = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
`;

const GridItem = styled.div`
  display: grid;
  text-align: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 20px 5px;
  padding: 1.25rem 0.3125rem;
  border: 1px solid ${color.black};
  border-radius: 5px;
  border-radius: 0.3125rem;
  line-height: 160%;
`;

const PrintOrderContents = ({ printRef, title, selectedStudent }) => {
  const [printType, setPrintType] = useState("grid");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = () => {
    handlePrint();
  };

  const onClickPrintType = (type) => {
    setPrintType(type);
  };

  return (
    <PopupPrintContainer printRef={printRef}>
      <PrintTopContents>
        <PrintType>
          <PrintTypeItem onClick={() => onClickPrintType("grid")}>
            {printType === "grid" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>그리드</div>
          </PrintTypeItem>
          <PrintTypeItem onClick={() => onClickPrintType("table")}>
            {printType === "table" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>표</div>
          </PrintTypeItem>
        </PrintType>
        <PrintIcon onClick={onClickPrint}>
          <div>인쇄하기</div>
          <IcPrint />
        </PrintIcon>
      </PrintTopContents>
      <PrintContainer ref={printRef}>
        <PageTitle>순서 정하기</PageTitle>
        <Title>{title}</Title>
        {printType === "table" && (
          <List>
            <Item>
              <Number className="print_table_row_name">순서</Number>
              <Name className="print_table_row_name">이름</Name>
            </Item>
            <Item>
              <Number className="print_table_row_name">순서</Number>
              <Name className="print_table_row_name">이름</Name>
            </Item>
            {selectedStudent?.map((item, index) => {
              return (
                <Item key={index}>
                  <Number>{index + 1}</Number>
                  <Name>{item}</Name>
                </Item>
              );
            })}
            {selectedStudent?.length % 2 !== 0 && <Item></Item>}
          </List>
        )}
        {printType === "grid" && (
          <GridList>
            {selectedStudent?.map((item, index) => {
              return (
                <GridItem key={index}>
                  <div>{index + 1}</div>
                  <div>{item}</div>
                </GridItem>
              );
            })}
          </GridList>
        )}
      </PrintContainer>
    </PopupPrintContainer>
  );
};

export default PrintOrderContents;
