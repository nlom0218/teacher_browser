import { useReactiveVar } from "@apollo/client";
import React, {useState} from "react";
import { FcNext,FcPrevious } from "react-icons/fc";
import { disableSeeStudentList,enableSeeStudentList,isSeeStudentListVar } from "../../apollo";
import {DivideRightContents, SeeRightContentsBtn} from "../Shared/styled/DivideContents";
import { useQuery } from "@apollo/client";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import routes from "../../routes";


const ListContents = styled.div`
display:grid;
align-self:flex-start;
max-height:100%;
overflow:scroll;
-ms-overflow-style:none;
scrollbar-width:none;
::-webkit-scrollbar{
    display: none;;
}
row-gap:5px;
row-gap:0.3125rem;
a{
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;

    :hover{
        background-color: ${(props)=>props.theme.hoverColor};
        transition: background-color 1s ease;
    }}
`

const MoveToList = styled.div`
justify-self:center;
padding:10px 20px;
padding: 0.625ren 1.25rem;
background-color:${(props)=>props.theme.btnBgColor};
color:${(props)=>props.theme.bgColor};
border-radius:5px;
border-radius:0.3125rem;
cursor:pointer;
transition: background-color 1s ease, color 1s ease;`

const AllStudentList=()=>{
    const isSeeList=useReactiveVar(isSeeStudentListVar);
    const navigate=useNavigate();
    const [initLoad, setInitLoad] = useState(true);
    const [isSeedisplay, setSeeDisplay] = useState(isSeeList);
    const {data, loading} = useQuery(SEE_ALL_STUDENT_LIST_QUERY);
    
    const onClickSeeBtn = () =>{
        if (initLoad){
            setInitLoad(false);
        }
        if (isSeeList){
            disableSeeStudentList();
            setTimeout(()=>{
                setSeeDisplay(false);
            }, 1000);
        }else {
            enableSeeStudentList();
            setSeeDisplay(true);
        }
    };
    const onClickMoveToList=()=>{
        navigate(routes.list);
    };
    return (
        <React.Fragment>
<SeeRightContentsBtn onClick={onClickSeeBtn} isSeeList={isSeeList} initLoad={initLoad}>{isSeeList ? <FcNext/> : <FcPrevious/>}
</SeeRightContentsBtn>
<DivideRightContents isSeeList={isSeeList} initLoad={initLoad} isSeedisplay={isSeedisplay}> 
<ListContents>
    {data?.seeStudentList.map((item,index)=>{
        return(
            <Link key={index} to={`${routes.order}/${item.listId}`}>
                {item.listName}
            </Link>
        )
    })}
</ListContents>
<MoveToList onClick={onClickMoveToList}>명렬표로 이동하기</MoveToList>
</DivideRightContents>


        </React.Fragment>
    )

}
export default AllStudentList;