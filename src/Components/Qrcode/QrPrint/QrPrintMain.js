import React, { useContext } from "react";
import styled from "styled-components";
import PopupPrintContainer from "../../Shared/PopupPrintContainer";
import IcPrint from "../../../icons/Print/IcPrint";
import { useReactToPrint } from "react-to-print";
import { BsFillCaretDownSquareFill } from "react-icons/bs";
import { BsFillCaretUpSquareFill } from "react-icons/bs";
import { useState } from "react";
import { QrcodeUrlContext } from "../QrcodeUrlContext";
import QrPrintContext from "./QrPrintContext";

const PrintTopContents = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
const PrintIcon = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-weight: 600;
  padding-right: 10px;
  cursor: pointer;
  svg {
    font-size: 2.25em;
    font-size: 2.25rem;
    display: flex;
  }
`;
const PrintTypeItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
  svg {
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

const QrPrintMain = ({ printRef, imageUrl, picklist }) => {
  const [num, setNum] = useState(1);

  // constructor(props){
  //   super(props)
  //   this.state= {count:1,}
  //   this.increaseCount=this.increaseCount.bind(this)
  // }
  //   increaseCount(){
  //     this.setState(({count})=>({count:count+1}))
  //   }

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
  return (
    <PopupPrintContainer printRef={printRef}>
      <PrintTopContents>
        <PrintTypeItem>
          <div>{num > 1 && <BsFillCaretDownSquareFill onClick={onClickListDown} />}</div>
          <div>{num}</div>
          <BsFillCaretUpSquareFill onClick={onClickListUp} />
        </PrintTypeItem>
        <PrintIcon onClick={onClickPrint}>
          <div>인쇄하기</div>
          <IcPrint />
        </PrintIcon>
      </PrintTopContents>
      <PrintContainer ref={printRef}>
        <QrPrintContext num={num} imageUrl={imageUrl} picklist={picklist} />
      </PrintContainer>
    </PopupPrintContainer>
  );
};

export default QrPrintMain;
