import React, { useState } from "react";
import styled from "styled-components";
import IcPrint from "../../../icons/Print/IcPrint";
import PopupPrintContainer from "../../Shared/PopupPrintContainer";
import { useReactToPrint } from "react-to-print";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { color } from "../../../styles";
import {
  BsFillCaretDownSquareFill,
  BsFillCaretUpSquareFill,
} from "react-icons/bs";
const PrintTopContents = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const PrintType = styled.div`
  display: grid;
  grid-template-columns: auto auto 2fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const PrintTypeItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
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
  grid-template-columns: 1fr 2fr;
  .print_table_row_name {
    text-align: center;
    font-weight: 600;
    background-color: ${color.white};
  }
`;

const Item = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: 1.2em;
  font-size: 1.2rem;
`;
const Check = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(${(props) => props.num}, 1fr);
  font-size: 1.2em;
  font-size: 1.2rem;
`;
const CheckIn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.2em;
  font-size: 1.2rem;
  border: 0.5px solid;
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
  text-align: center;
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

const PrintListContents = ({ printRef, selectedStudent }) => {
  const [printType, setPrintType] = useState("table");
  const [num, setNum] = useState(1);
  const title = localStorage.getItem("listName").slice(1, -1);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const onClickPrint = () => {
    handlePrint();
  };

  const onClickPrintType = (type) => {
    setPrintType(type);
  };
  const onClickListUp = () => {
    setNum(num + 1);
  };
  const onClickListDown = () => {
    setNum(num - 1);
  };
  const checklistMap = [...Array(num)].map(function () {
    return <CheckIn />;
  });
  return (
    <PopupPrintContainer printRef={printRef}>
      <PrintTopContents>
        <PrintType>
          <PrintTypeItem onClick={() => onClickPrintType("table")}>
            {printType === "table" ? (
              <RiCheckboxLine />
            ) : (
              <RiCheckboxBlankLine />
            )}
            <div>명단 출력</div>
          </PrintTypeItem>
          <PrintTypeItem onClick={() => onClickPrintType("checklist")}>
            {printType === "checklist" ? (
              <RiCheckboxLine />
            ) : (
              <RiCheckboxBlankLine />
            )}
            <div>체크리스트</div>
            <div>
              {num > 1 && (
                <BsFillCaretDownSquareFill onClick={onClickListDown} />
              )}
              [{num}]
              {num < 20 && <BsFillCaretUpSquareFill onClick={onClickListUp} />}
            </div>
          </PrintTypeItem>
        </PrintType>
        <PrintIcon onClick={onClickPrint}>
          <div>인쇄하기</div>
          <IcPrint />
        </PrintIcon>
      </PrintTopContents>
      <PrintContainer ref={printRef}>
        <PageTitle>명렬표</PageTitle>
        <Title>{title}</Title>
        {printType === "checklist" && (
          <List>
            <Item>
              <Number className="print_table_row_name">번호</Number>
              <Name className="print_table_row_name">이름</Name>
            </Item>
            <Check num={num}>{checklistMap}</Check>
            <Item>
              <Number>1</Number>
              <Name>이름</Name>
            </Item>
            <Check num={num}>{checklistMap}</Check>
          </List>
        )}
        {printType === "table" && (
          <List>
            <Number className="print_table_row_name">번호</Number>
            <Name className="print_table_row_name">이름</Name>
            <Number>1</Number>
            <Name>이름</Name>
          </List>
        )}
      </PrintContainer>
    </PopupPrintContainer>
  );
};

export default PrintListContents;
