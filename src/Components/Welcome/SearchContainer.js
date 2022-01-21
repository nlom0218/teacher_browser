import React from 'react';
import styled from 'styled-components';

const SSearchContainer = styled.div`
  top: 0;
  left: 0;
  width: 40%;
  padding: 20px;
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  grid-template-rows: 1fr;
`

const SearchBox = styled.div`
  background-color: ${props => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  min-height: 100%;
  max-height: 100%;
`

const SearchContainer = () => {
  return (<SSearchContainer>
    <SearchBox>
      검색입니담
    </SearchBox>
  </SSearchContainer>);
}

export default SearchContainer;