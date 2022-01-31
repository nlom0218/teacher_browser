import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import React, { useState } from 'react';
import { pageLinkSectionVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import PageLinkSection from '../Components/PageLink/PageLinkSection';
import LinkPickSection from '../Components/PageLink/LinkPickSection';
import useMe from '../Hooks/useMe';

const Container = styled.div`
`
const pageLinkFolderName = [["교육청",["경기도교육청","메모"],["사이트이름/","메모"]],["미술",["사이트이름/","메모"]],["영어",["사이트이름/","메모"]],["과학",["사이트이름/","메모"]],["연수원",["사이트이름/","메모"]]]


const PageLink = () => {
  const me = useMe()
  const pageLinkSection = useReactiveVar(pageLinkSectionVar)
  
  const [init, setInit] = useState(true)



  return (<BasicContainer >
    <Container>
<PageLinkSection
   init={init}
   setInit={setInit}
   pageLinkSection={pageLinkSection}
   pageLinkFolderName={pageLinkFolderName}/>
<LinkPickSection
  init={init}
  setInit={setInit}
  pageLinkSection={pageLinkSection}
  userEmail={me?.email}
  pageLinkFolderName={pageLinkFolderName}
  // favoriteNews={me?.favoriteNews}
/>

    </Container>

  </BasicContainer>);
}

export default PageLink;