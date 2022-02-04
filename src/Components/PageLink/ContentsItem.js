

import React from "react";
import styled from "styled-components";
import { IoArrowRedo } from "react-icons/io5";
import { BsBookmarkPlus, BsFillBookFill } from "react-icons/bs";
import { inPopup } from "../../apollo";
import IcBookMark from "../../icons/Bookmark/IcBookMark";
import IcBookMarkClick from "../../icons/Bookmark/IcBookMarkClick";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../../Hooks/useMe";
import { SETTING_LINK_MUTATION } from "../../Graphql/User/mutation";

const Container = styled.div`
    height: 120px;
    height: 10rem;
    border: 1px solid ${props => props.theme.cardBorder};
    background-color: ${props=>props.theme.cardBg};
    transition: border 1s ease, background-color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    display: grid;
    grid-template-rows: 1fr auto;
    padding: 20px;
    padding: 1.25rem;

`
const SiteName = styled.div`
    line-height: 160%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const SiteBtn = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    font-size: 1.5rem;
    font-size: 1.5em;
`
const LinkBtn = styled.div`
    cursor: pointer;
`
const BookMarkBtn = styled.div`
    cursor: pointer;
`
const BookmarkIcon = styled.div`
`

const ContentsItem = ({item,link,userEmail, userLinkTitleArr})=>{

    const [settingLink, {loading}] = useMutation(SETTING_LINK_MUTATION,{
        refetchQueries : [{query : ME_QUERY }]
    })


    const onSubmit = (data) => {
        const{memo} = data
        settingLink({
            variables:{
                userEmail, 
                siteName:item.name,
                memo
            }
        })

    }

    const onClickLinkBtn = ()=>{
        window.open(item.link,"_blank")
    }
    const onClickBookmark=()=>{
      inPopup("addBookmark")
      localStorage.setItem("addBookmark",item.name)
    }
   const onClickDelBookmark = ()=>{
    settingLink({
        variables:{
            userEmail, 
            siteName:item.name
        }})
        }
   

    return(
        <Container>
            <SiteName>{item.name}</SiteName>
            <SiteBtn>
                <LinkBtn onClick={onClickLinkBtn}><IoArrowRedo/></LinkBtn>
                <BookMarkBtn>
                    {userLinkTitleArr.length === 0 && 
                    <BookmarkIcon onClick={onClickBookmark}><BsBookmarkPlus/></BookmarkIcon>}
                    {userLinkTitleArr.length !== 0 &&(
                        userLinkTitleArr?.includes(item.name)
                        ?<BookmarkIcon onClick={onClickDelBookmark}><IcBookMarkClick/></BookmarkIcon>
                        :<BookmarkIcon onClick={onClickBookmark}><BsBookmarkPlus/></BookmarkIcon>
                    )}
                    </BookMarkBtn>
            </SiteBtn>
        </Container>
    )
}

export default ContentsItem;