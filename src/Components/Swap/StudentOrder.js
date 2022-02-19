import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";

const RealContainer = styled.div`

`

const Table = styled.div`
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding : 20px 10px;
    padding : 1.25rem 0.625rem;
    transition : border 1s ease;
    border-radius : 5px;
    border-radius : 0.3125rem;
    font-size : 30px;
    font-size : 1.875rem;
    position : relative;
    border: 2px solid ${props => props.theme.cardBorder};
    background-color: ${props => props.theme.cardBg};
    transition: border 1s ease, background-color 1s ease;
`

const Container = styled.div`
    display : grid;
    grid-template-columns: ${props => `repeat(${props.pickNum}, 1fr)`};
    padding : 10px 5px;
    padding : 1.25rem 0.625rem;
    row-gap : 10px;
    row-gap : 0.625rem;
    column-gap : 10px;
    column-gap : 0.625rem;
    ${customMedia.greaterThan("tablet")`
    grid-template-columns : ${props => props.seeResultType === "ALL" && "repeat(6,1fr)"};
    `}
    ${customMedia.greaterThan("desktop")`
    grid-template-columns : ${props => props.seeResultType === "ALL" && "repeat(6,1fr)"};
    `}
`;

const Item = styled.div`
    min-height : 120px;
    min-height : 7.5rem;
    padding : 20px 10px;
    padding : 1.25rem 0.625rem;
    transition : border 1s ease;
    border-radius : 5px;
    border-radius : 0.3125rem;
    display : grid;
    justify-items : center;
    align-items : center;
    row-gap : 10px;
    position : relative;
    border: 1px solid ${props => props.theme.cardBorder};
    background-color: ${props => props.theme.cardBg};
    transition: border 1s ease, background-color 1s ease;
`

const Name = styled.div`
    width : 100%;
    /* overflow : hidden;
    text-overflow : clip;
    white-space : nowrap; */
    text-align : center;
    font-size : ${props => props.fontSize}em;
    font-size : ${props => props.fontSize}rem;
`


const StudentOrder = ({ selectedStudent, setSelectedStudent, seeResultType, fontSizeAll, fontSizeOne, isShuffle, pickNum, pickType }) => {

    useEffect(() => {
        const shuffledStudent = () => {
            const newSelectedStudent = selectedStudent
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setSelectedStudent(newSelectedStudent);
        };
        let shuffling;
        if (isShuffle === "ing") {
            shuffling = setInterval(() => {
                shuffledStudent();
            }, 100);
        } else {
            clearInterval(shuffling);
        }
        return () => clearInterval(shuffling);
    }, [isShuffle]);


    return (
        <RealContainer>
            <Table>칠판</Table>
            <Container pickNum={pickNum}>
                {selectedStudent.map((item, index) => {
                    return (
                        <Item key={item}>
                            <Name fontSize={fontSizeAll}>{item}</Name>
                        </Item>
                    );
                })
                }
            </Container>
        </RealContainer>
    );
};

export default StudentOrder;
