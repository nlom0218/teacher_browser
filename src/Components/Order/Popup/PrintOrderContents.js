import React from 'react';
import styled from 'styled-components';
import IcPrint from '../../../icons/Print/IcPrint';
import PopupPrintContainer from '../../Shared/PopupPrintContainer';
import { useReactToPrint } from 'react-to-print';

const PrintIcon = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-weight: 600;
  color: ${props => props.theme.fontColor};
  cursor: pointer;
  svg {
    font-size: 2.25em;
    font-size: 2.25rem;
    display: flex;
  }
`

const PrintContainer = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  @media print {
    @page {
      size: A4;
      padding: 10mm;
    }
  }
`

const PageTitle = styled.div`

`

const Title = styled.div`
  text-align: center;
  font-size: 2em;
  font-size: 2rem;
`

const List = styled.div`
  border: ${props => props.theme.fontColor} 2px solid;
  background-color: ${props => props.theme.fontColor};
  row-gap: 2px;
  row-gap: 0.125rem;
  column-gap: 2px;
  column-gap: 0.125rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .print_table_row_name {
    text-align: center;
    font-weight: 600;
    background-color: ${props => props.theme.bgColor};
  }
`

const Item = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.2em;
  font-size: 1.2rem;
`

const Number = styled.div`
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  background-color: ${props => props.theme.bgColor};
  text-align: center;
  border-right: ${props => props.theme.fontColor} 2px solid;
  font-weight: 600;
`

const Name = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
`

const PrintOrderContents = ({ printRef, title, selectedStudent }) => {
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onClickPrint = () => {
    handlePrint()
  }

  return (<PopupPrintContainer printRef={printRef}>
    <PrintIcon onClick={onClickPrint}><div>인쇄하기</div><IcPrint /></PrintIcon>
    <PrintContainer ref={printRef}>
      <PageTitle>순서 정하기</PageTitle>
      <Title>{title}</Title>
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
          return <Item key={index}>
            <Number>{index + 1}</Number>
            <Name>{item}</Name>
          </Item>
        })}      {selectedStudent?.map((item, index) => {
          return <Item key={index}>
            <Number>{index + 1}</Number>
            <Name>{item}</Name>
          </Item>
        })}      {selectedStudent?.map((item, index) => {
          return <Item key={index}>
            <Number>{index + 1}</Number>
            <Name>{item}</Name>
          </Item>
        })}
        {selectedStudent?.length % 2 !== 0 && <Item></Item>}
      </List>
    </PrintContainer>
  </PopupPrintContainer >);
}

export default PrintOrderContents;