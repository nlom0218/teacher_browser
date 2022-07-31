import React, { useEffect, useState } from "react";
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

const Table = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  transition: border 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  font-size: 25px;
  font-size: 1.563rem;
  position: relative;
  border: 1px solid ${color.black};
  color: ${color.black};
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.pickNum}, 1fr)`};
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${color.black};
  column-gap: ${(props) => props.seatType === 2 && "0px"};
  column-gap: ${(props) => props.seatType === 2 && "0rem"};
`;

const GridItem = styled.div`
  display: grid;
  text-align: center;
  padding: 20px 5px;
  padding: 1.25rem 0.3125rem;
  border: 1px solid ${color.black};
  border-radius: 5px;
  border-radius: 0.3125rem;
  line-height: 160%;
  :nth-child(2n) {
    margin-right: ${(props) => props.seatType === 2 && "10px"};
    margin-right: ${(props) => props.seatType === 2 && "0.625rem"};
  }
  :nth-child(${(props) => props.pickNum}n) {
    margin-right: ${(props) => props.seatType === 2 && "0px"};
    margin-right: ${(props) => props.seatType === 2 && "0rem"};
  }
`;

const EmptyItem = styled.div`
  opacity: 0;
`;

const PrintSwapContents = ({ printRef, title, selectedStudent, pickNum, seatType }) => {
  const [emptyArr, setEmptyArr] = useState(undefined);

  const [printType, setPrintType] = useState("student");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = () => {
    handlePrint();
  };

  const onClickPrintType = (type) => {
    setPrintType(type);
  };

  console.log(selectedStudent);

  useEffect(() => {
    const emtpyNum = pickNum - (selectedStudent.length % pickNum);
    if (emtpyNum !== 0) {
      const newEmptyArr = [];
      for (let i = 0; i < emtpyNum; i++) {
        newEmptyArr.push(undefined);
      }
      setEmptyArr(newEmptyArr);
    }
  }, [selectedStudent]);

  return (
    <PopupPrintContainer printRef={printRef}>
      <PrintTopContents>
        <PrintType>
          <PrintTypeItem onClick={() => onClickPrintType("student")}>
            {printType === "student" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>학생 방향</div>
          </PrintTypeItem>
          <PrintTypeItem onClick={() => onClickPrintType("teacher")}>
            {printType === "teacher" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>선생님 방향</div>
          </PrintTypeItem>
        </PrintType>
        <PrintIcon onClick={onClickPrint}>
          <div>인쇄하기</div>
          <IcPrint />
        </PrintIcon>
      </PrintTopContents>
      <PrintContainer ref={printRef}>
        <PageTitle>자리바꾸기</PageTitle>
        <Title>{title}</Title>
        {printType === "student" && (
          <React.Fragment>
            <Table>칠판</Table>
            <GridList pickNum={pickNum} seatType={seatType}>
              {selectedStudent?.map((item, index) => {
                return (
                  <GridItem key={index} seatType={seatType} pickNum={pickNum}>
                    <div>{item.name}</div>
                  </GridItem>
                );
              })}
            </GridList>
          </React.Fragment>
        )}
        {printType === "teacher" && (
          <React.Fragment>
            <GridList pickNum={pickNum} seatType={seatType}>
              {emptyArr?.map((item, index) => {
                return (
                  <GridItem key={index} seatType={seatType} pickNum={pickNum}>
                    <EmptyItem>-</EmptyItem>
                  </GridItem>
                );
              })}
              {[...selectedStudent]?.reverse().map((item, index) => {
                return (
                  <GridItem key={index} seatType={seatType} pickNum={pickNum}>
                    <div>{item.name}</div>
                  </GridItem>
                );
              })}
            </GridList>
            <Table>칠판</Table>
          </React.Fragment>
        )}
      </PrintContainer>
    </PopupPrintContainer>
  );
};

export default PrintSwapContents;
