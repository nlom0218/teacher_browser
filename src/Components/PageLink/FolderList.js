import styled from "styled-components";
import { useState } from "react/cjs/react.development";

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
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease, color 1s ease;
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
  grid-template-rows: repeat(5,auto) 1fr;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar{
      display: none;
  }
  .Folder{
      padding: 10px;
      padding: 0.625rem;
      border-radius: 5px;
      border-radius: 0.3125rem;
      :hover{
          background-color: ${props => props.theme.hoverColor};
          border-radius: 5px;
          border-radius: 0.3125rem;
      }
  }

`


const FolderList = ({right}) =>{
    const [folderPick,setFolderPick] = useState(undefined);
    const onClickPickFolder = (item) =>{
        setFolderPick(item);
      }
      const onClickLinkPush = () =>{}
      const pageLinkFolderName = ["교육청","영어","미술","과학","연수원"]


    return(
        <Container right={right}>
   <SFolderList>
   {pageLinkFolderName.map((item,index)=>{
      return(<div 
        className='Folder'
        key={index}
      onClick={()=>onClickPickFolder(item)}>{item}</div>)})}
   </SFolderList>
   <div className='LinkPush' onClick={onClickLinkPush}>페이지 추천</div>

   </Container>
)}



export default FolderList;