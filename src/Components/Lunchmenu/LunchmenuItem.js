import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import AllergyItem from './AllergyItem';

const SLunchmenu = styled.div`
  display: grid;
  ${customMedia.greaterThan("tablet")`
    row-gap: ${props => props.summary ? "5px" : "10px"};
    row-gap: ${props => props.summary ? "0.3125rem" : "0.625rem"};
  `}
`;

const Food = styled.div`
  font-size: ${props => props.summary ? "1em" : "1.25em"};
  font-size: ${props => props.summary ? "1rem" : "1.25rem"};
`

const Allergy = styled.div`
  display: flex;
  font-size: ${props => props.summary ? "0.875em" : "1em"};
  font-size: ${props => props.summary ? "0.875rem" : "1rem"};
`

const LunchmenuItem = ({ item, me, summary }) => {
  return (<SLunchmenu summary={summary}>
    <Food summary={summary}>{item.food}</Food>
    <Allergy summary={summary}>{item.allergy.map((item, index) => {
      return <AllergyItem key={index} item={item} me={me} />
    })}</Allergy>
  </SLunchmenu>);
}

export default LunchmenuItem;