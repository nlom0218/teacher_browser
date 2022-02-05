import styled from "styled-components";
import { useState } from "react/cjs/react.development";
import { useReactiveVar } from "@apollo/client";
import { movePageLinkFolder, pageLinkFolderVar, removePageLinkFolder } from "../../apollo";
import { linkPickFolderVar } from "../../apollo";
import { removeLinkPickFolder } from "../../apollo";
import { moveLinkPickFolder } from "../../apollo";


const Container = styled.div`
  position: absolute;
  padding: 20px;
  padding: 1.25rem;
  width: 24%;
  left: ${props=> !props.right && "4%"};
  top : 4%;
  right: ${props=>props.right && "4%"};
  min-height: 92%;
  max-height: 92%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: 1fr auto;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius : 5px;
  border-radius: 0.3125rem;
  .LinkPush{
  color:${props=>props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  text-align: center;
  background-color: ${props=>props.theme.btnBgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
}
`
const SFolderList = styled.div`
  display: grid;
  grid-template-rows: repeat(6,auto) 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar{
      display: none;
  }
`

  const Folder = styled.div`
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    :hover{
      background-color: ${props => props.theme.hoverColor};
    }
    background-color: ${props=>props.selected && props.theme.hoverColor};
    transition: background-color 1s ease;

`


const FolderList = ({right}) =>{

    const pageLinkFolder = useReactiveVar(pageLinkFolderVar)
    const linkPickFolder = useReactiveVar(linkPickFolderVar)

    const onClickPickFolder = (item) =>{
      //right => pageLink
      if (right){
        if(item==="전체보기"){
          removePageLinkFolder()
        }else{
          movePageLinkFolder(item)
        }
      }else{
        if (item==="전체보기"){
          removeLinkPickFolder()
        }else{
          moveLinkPickFolder(item)
        }
      }
      }
      const onClickLinkPush = () =>{}
      const pageLinkFolderName = ["전체보기","교육청","영어","미술","과학","연수원"]

const processSelected=(item)=>{
  if (right) {
    //pageLink
    if(item==="전체보기"){
      if(pageLinkFolder){
        return false
      } else{
        return true
      }
    }else{
      if (pageLinkFolder ===item){
        return true
      } else{
        return false
      }
    }
  } else {
    //pageLink
    if(item==="전체보기"){
      if(linkPickFolder){
        return false
      } else{
        return true
      }
    }else{
      if (linkPickFolder ===item){
        return true
      } else{
        return false
      }
}}}

    return(
        <Container right={right}>
   <SFolderList>
   {pageLinkFolderName.map((item,index)=>{
      return(<Folder
        selected={processSelected(item)}
        key={index}
      onClick={()=>onClickPickFolder(item)}>{item}</Folder>)})}
   </SFolderList>
   <div className='LinkPush' onClick={onClickLinkPush}>페이지 추천</div>

   </Container>
)}



export default FolderList;