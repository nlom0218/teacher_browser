import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import IcPrint from '../../icons/Print/IcPrint';

const Container = styled.div`
  justify-self: flex-end;
`

const PrintIcon = styled.div`
  cursor: pointer;
  svg {
    font-size: 2.25em;
    font-size: 2.25rem;
    display: flex;
  }
`

const PrintOrder = () => {

  const onClickPrint = () => {
    inPopup("print")
  }

  return (<Container>
    <PrintIcon onClick={onClickPrint}><IcPrint /></PrintIcon>
  </Container>);
}

export default PrintOrder;