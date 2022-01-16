import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import AllergyItem from './AllergyItem';

const SLunchmenu = styled.div`
  display: grid;
  ${customMedia.greaterThan("tablet")`
    row-gap: 10px;
    row-gap: 0.625rem;
  `}
`;

const Food = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
`

const Allergy = styled.div`
  display: flex;
`

const LunchmenuItem = ({ item, me }) => {
  return (<SLunchmenu>
    <Food>{item.food}</Food>
    <Allergy>{item.allergy.map((item, index) => {
      return <AllergyItem key={index} item={item} me={me} />
    })}</Allergy>
  </SLunchmenu>);
}

export default LunchmenuItem;