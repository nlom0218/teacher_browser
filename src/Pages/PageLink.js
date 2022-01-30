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


const PageLink = () => {
  const me = useMe()
  const pageLinkSection = useReactiveVar(pageLinkSectionVar)
  
  const [init, setInit] = useState(true)



  return (<BasicContainer >
    <Container>
<PageLinkSection
   init={init}
   setInit={setInit}
   pageLinkSection={pageLinkSection}/>
<LinkPickSection
  init={init}
  setInit={setInit}
  pageLinkSection={pageLinkSection}
  userEmail={me?.email}
  // favoriteNews={me?.favoriteNews}
/>

    </Container>

  </BasicContainer>);
}

export default PageLink;