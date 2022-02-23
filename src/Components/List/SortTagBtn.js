import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { FcSettings } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';

const Container = styled.div`
  justify-self: flex-end;
  grid-column: 1 / -1;
  svg {
    font-size: 1.5em;
    font-size: 1.5rem;
    display: flex;
    cursor: pointer;
  }
`

const SortTagBtn = ({ me }) => {

  const onClickStudentSetting = () => {
    if (me) {
      inPopup("seeStudentSetting")
    } else {
      inPopup("needLogin")
    }
  }

  return (<Container>
    <FcSettings onClick={onClickStudentSetting} />
  </Container>);
}

export default SortTagBtn;