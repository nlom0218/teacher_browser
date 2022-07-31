import React, { useState } from "react";
import styled from "styled-components";
import IcPrint from "../../../icons/Print/IcPrint";
import PopupPrintContainer from "../../Shared/PopupPrintContainer";
import { useReactToPrint } from "react-to-print";
import { color } from "../../../styles";

const PrintTopContents = styled.div`
  display: grid;
  grid-template-columns: auto;
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
  align-self: center;
`;

const UPDOWN = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const RIGHTLEFT = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
`;

const GridTime = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const GridDay = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const GridList = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 4px;
  row-gap: 0.25rem;
  column-gap: 4px;
  column-gap: 0.25rem;
  color: ${color.black};
`;

const TableItem = styled.div`
  display: grid;
  height: 100%;
  border: 1px solid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  grid-template-rows: 1fr;
  text-align: center;
  align-items: center;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  background-color: ${(props) => props.theme.color};
`;

const TableOutItem = styled.div`
  background-color: #ceecf5;
  height: 100%;
  border: 1px solid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  text-align: center;
  align-items: center;
  position: relative;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
`;

const TimeUp = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
  padding: 5px;
  padding: 0.3125rem;
  font-size: 0.6rem;
  font-size: 0.6em;
  opacity: 0.6;
`;
const TimeDown = styled.div`
  position: absolute;
  right: 5%;
  top: 5%;
  padding: 5px;
  padding: 0.3125rem;
  font-size: 0.6rem;
  font-size: 0.6em;
  opacity: 0.6;
`;

const PrintScheduleContents = ({ printRef, title, viewTime, timeResult, tableData }) => {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = () => {
    handlePrint();
  };

  const dayList = ["", "월", "화", "수", "목", "금"];
  const timeList = ["1", "2", "3", "4", "5", "6"];

  return (
    <PopupPrintContainer printRef={printRef}>
      <PrintTopContents>
        <PrintIcon onClick={onClickPrint}>
          <div>인쇄하기</div>
          <IcPrint />
        </PrintIcon>
      </PrintTopContents>
      <PrintContainer ref={printRef}>
        <PageTitle>시간표</PageTitle>
        <Title>{title}</Title>
        <UPDOWN>
          <GridList>
            {dayList.map((item, index) => {
              return <TableOutItem key={index}>{item}</TableOutItem>;
            })}
          </GridList>
          <RIGHTLEFT>
            {viewTime === true ? (
              <GridTime>
                <TableOutItem>
                  1<TimeUp>{timeResult[0]}</TimeUp>
                  <TimeDown>{timeResult[1]}</TimeDown>
                </TableOutItem>
                <TableOutItem>
                  2<TimeUp>{timeResult[2]}</TimeUp>
                  <TimeDown>{timeResult[3]}</TimeDown>
                </TableOutItem>
                <TableOutItem>
                  3<TimeUp>{timeResult[4]}</TimeUp>
                  <TimeDown>{timeResult[5]}</TimeDown>
                </TableOutItem>
                <TableOutItem>
                  4<TimeUp>{timeResult[6]}</TimeUp>
                  <TimeDown>{timeResult[7]}</TimeDown>
                </TableOutItem>
                <TableOutItem>
                  5<TimeUp>{timeResult[8]}</TimeUp>
                  <TimeDown>{timeResult[9]}</TimeDown>
                </TableOutItem>
                <TableOutItem>
                  6<TimeUp>{timeResult[10]}</TimeUp>
                  <TimeDown>{timeResult[11]}</TimeDown>
                </TableOutItem>
              </GridTime>
            ) : (
              <GridTime>
                {timeList.map((item, index) => {
                  return <TableOutItem key={index}>{item}</TableOutItem>;
                })}
              </GridTime>
            )}
            <GridDay>
              {tableData?.getTimetableData.map((item, index) => {
                return (
                  <TableItem key={index} color={item.color}>
                    {item.subName}
                  </TableItem>
                );
              })}
            </GridDay>
          </RIGHTLEFT>
        </UPDOWN>
      </PrintContainer>
    </PopupPrintContainer>
  );
};

export default PrintScheduleContents;
