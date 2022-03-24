import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../../../styles";
import PopupPrintContainer from "../../Shared/PopupPrintContainer";
import IcPrint from "../../../icons/Print/IcPrint";
import { useReactToPrint } from "react-to-print";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
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
  grid-template-columns: auto auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const PrintTypeItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: ${color.black} 2px solid;
  column-gap: 1px;
  column-gap: 0.0625rem;
  row-gap: 1px;
  row-gap: 0.0625rem;
  background-color: ${color.black};
  color: ${color.black};
  .print_table_row_name {
    text-align: center;
    font-weight: 600;
    background-color: ${color.white};
  }
`;
const Number = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${color.white};
  text-align: center;
  font-weight: 600;
  border-right: ${color.black} 1px solid;
`;
const Name = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  background-color: white;
  text-align: center;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: 1em;
  font-size: 1rem;
  background-color: #ffffff;
`;

const Check = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.num}, 1fr);
  font-size: 1em;
  font-size: 1rem;
  column-gap: 1px;
  column-gap: 0.0625rem;
  row-gap: 1px;
  row-gap: 0.0625rem;
  background-color: ${color.black};
`;
const CheckIn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1em;
  font-size: 1rem;
  background-color: #ffffff;
`;

const PrintListContents = ({ printRef, studentList }) => {
  const [printType, setPrintType] = useState("table");
  const [num, setNum] = useState(1);
  const title = localStorage.getItem("listName").slice(1, -1);
  const onClickPrintType = (type) => {
    setPrintType(type);
  };
  const onClickListUp = () => {
    setNum(num + 1);
  };
  const onClickListDown = () => {
    setNum(num - 1);
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const onClickPrint = () => {
    handlePrint();
  };
  const studentNum = 30;
  console.log("학생수:", studentList?.length);

  const tableCount = [...Array(studentNum)].map(function (a, index) {
    return (
      <React.Fragment>
        <Number>{index + 1}</Number>
        <Name>이름</Name>
      </React.Fragment>
    );
  });
  const checklistMap = [...Array(num)].map(function () {
    return <CheckIn />;
  });
  const checkCount = [...Array(studentNum)].map(function (a, index) {
    return (
      <React.Fragment>
        <Item>
          <Number>{index + 1}</Number>
          <Name>이름</Name>
        </Item>
        <Check num={num}>{checklistMap}</Check>
      </React.Fragment>
    );
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
            </div>
            <div>{num}</div>
            <div>
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

        {printType === "table" && (
          <List>
            <Number>번호</Number>
            <Name className="print_table_row_name">이름</Name>
            {tableCount}
          </List>
        )}
        {printType === "checklist" && (
          <List>
            <Item>
              <Number>번호</Number>
              <Name className="print_table_row_name">이름</Name>
            </Item>
            <Check num={num}>{checklistMap}</Check>
            {checkCount}
          </List>
        )}
      </PrintContainer>
    </PopupPrintContainer>
  );
};
export default PrintListContents;
