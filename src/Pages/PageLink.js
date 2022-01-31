import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import React, { useState } from 'react';
import { pageLinkSectionVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import PageLinkSection from '../Components/PageLink/PageLinkSection';
import LinkPickSection from '../Components/PageLink/LinkPickSection';
import useMe from '../Hooks/useMe';

//폴더 추가 기능(새폴더+date정보)
//정보 DB map
//사이트 이름에 링크 달기
//수정버튼 누르면 팝업창 나오기 
//추천사이트 목록 정리하기 
//사이트 추천을 어떻게 받나?
// hr 길이 조절 어떻게?
// 각각 누르는 걸로 수정
// 폴더 선택에서 새폴더 추가 기능 넣을까말까
//폴더 선택하면 옆에 폴더 이름 나오는 걸로 수정
// 메모 작성 화면에 배경색 다르게 





const Container = styled.div`
`
const pageLinkFolderName = [["교육청",["교육청","설명/메모"],["사이트이름/","메모"]],["미술",["설명/","메모"]],["영어",["사이트이름/","메모"]],["과학",["사이트이름/","메모"]],["연수원",["사이트이름/","메모"]]]


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