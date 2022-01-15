import { useQuery, useReactiveVar } from '@apollo/client';
import React from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { useState } from 'react/cjs/react.development';
import { disableSeeStudentList, enableSeeStudentList, isSeeStudentListVar } from '../../apollo';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../../Graphql/StudentList/query';
import { DivideRightContents, SeeRightContentsBtn } from '../Shared/styled/DivideContents';
import styled from 'styled-components';
import routes from '../../routes';
import { Link, Route, useNavigate } from 'react-router-dom';

const ListContents = styled.div`
    max-height: 100%;
    align-self: flex-start;
    overflow: scroll;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
        display: none; // Chrome, Safari, Opera
    }
    display: grid;
    row-gap: 5px;
    row-gap: 0.3125rem;
    a {
        padding : 10px, 20px;
        padding : 0.625rem;
        border-radius : 5px;
        border-radius : 0.3125rem;
        :hover {
            background-color : ${props=>props.theme.hoverColor};
            transition : background-color 1 ease;
        }
    }
`

const MoveToList = styled.div`
    justify-self : center;
    padding : 10px 20px;
    padding : 0.625rem 1.25rem;
    background-color : ${props=> props.theme.btnBgColor};
    color : ${props => props.theme.bgColor};
    border-radius : 5px;
    border-radius : 0.125rem;
    cursor : pointer;
    transition : background-color 1s ease, color 1s ease;
`

const AllStudentList = () => {
    const isSeeList = useReactiveVar(isSeeStudentListVar)

    const navigate = useNavigate()
    
    const [initLoad, setInitLoad] = useState(true)
    const [isSeedisplay, setSeeDisplay] = useState(isSeeList)

    const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);



    const onClickSeeBtn = () => {
        if(initLoad) {
            setInitLoad(false)
        }
        if(isSeeList) {
            disableSeeStudentList()
            setSeeDisplay(false)
            setTimeout(() => {
                setSeeDisplay(false)
            }, 1000)
        } else {
            enableSeeStudentList()
            setSeeDisplay(true)
        }
    }

    const onClickMoveToList = () => {
        navigate(routes.list)
    }
    return ( <React.Fragment>
        <SeeRightContentsBtn onClick={onClickSeeBtn} isSeeList={isSeeList} initLoad={initLoad}>
            {isSeeList ? <FcNext/> : <FcPrevious />}
        </SeeRightContentsBtn>
        <DivideRightContents isSeeList={isSeeList} initLoad={initLoad} isSeedisplay={isSeedisplay}>
            <ListContents>
            {data?.seeStudentList.map((item, index) => {
                return <Link key={index} to={`${routes.draw}/${item.listId}`}>{item.listName}</Link>
            })}
            </ListContents>
            <MoveToList onClick={onClickMoveToList}>명렬표로 이동하기</MoveToList>
        </DivideRightContents>
    </React.Fragment>)
}

export default AllStudentList;