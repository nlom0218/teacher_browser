import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { keepDistanceGroupHorizontalSame } from "./sharedFn/keepDistanceGroup";

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
    grid-template-rows: ${props => props.groupType === "vertical" ? `auto repeat(${props.rowLength}, 1fr)` : `repeat(${props.rowLength}, 1fr)`};
    grid-template-columns: ${props => props.groupType === "horizontal" ? `auto repeat(${props.pickNum}, 1fr)` : `repeat(${props.pickNum}, 1fr)`};
    padding : 20px 0px;
    padding : 1.25rem 0rem;
    row-gap : 10px;
    row-gap : 0.625rem;
    column-gap : 10px;
    column-gap : 0.625rem;
    column-gap: ${props => props.seatType === 2 && "0px"};
    column-gap: ${props => props.seatType === 2 && "0rem"};
`;

const Item = styled.div`
    min-height : 120px;
    min-height : 7.5rem;
    padding: 20px 10px;
    padding: 1.25rem 0.625rem;
    transition: border 1s ease;
    border-radius : 5px;
    border-radius : 0.3125rem;
    display: grid;
    justify-items : center;
    align-items : center;
    row-gap : 10px;
    position: relative;
    border: 1px solid ${props => props.theme.cardBorder};
    background-color: ${props => props.theme.cardBg};
    transition: border 1s ease, background-color 1s ease;
    :nth-child(2n) {
    margin-right: ${props => props.seatType === 2 && "10px"};
    margin-right: ${props => props.seatType === 2 && "0.625rem"};
    }
    :nth-child(${props => props.pickNum}n) {
    margin-right: ${props => props.seatType === 2 && "0px"};
    margin-right: ${props => props.seatType === 2 && "0rem"};
    }
`

const Name = styled.div`
    width: 100%;
    /* overflow : hidden;
    text-overflow : clip;
    white-space : nowrap; */
    text-align : center;
    font-size : ${props => props.fontSize}em;
    font-size : ${props => props.fontSize}rem;
`

const GroupName = styled.div`
    grid-column: ${props => props.groupType === "vertical" && "1 / -1"};
    grid-row: ${props => props.groupType === "horizontal" && "1 / -1"};
    display: grid;
    grid-template-columns: ${props => props.groupType === "vertical" && `repeat(${props.pickNum}, 1fr)`};
    grid-template-rows: ${props => props.groupType === "horizontal" && `repeat(${props.rowLength}, 1fr)`};
    justify-items: center;
    align-items: center;
    font-weight: 600;
`


const StudentOrder = ({ selectedStudent, setSelectedStudent, fontSizeAll, isShuffle, pickNum, seatType }) => {
    useEffect(() => {
        if (isShuffle === "ing") {
            const shuffledStudent = () => {
                const newSelectedStudent = selectedStudent
                    .map((value) => ({ ...value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
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
        }
    }, [isShuffle]);

    return (
        <RealContainer>
            <Table>칠판</Table>
            <Container
                pickNum={pickNum}
                seatType={seatType}
                rowLength={Math.ceil(selectedStudent.length / pickNum)}
            >
                {selectedStudent.map((item, index) => {
                    return (
                        <Item key={index} seatType={seatType} pickNum={pickNum}>
                            <Name fontSize={fontSizeAll}>{item.name}</Name>
                        </Item>
                    );
                })
                }
            </Container>
        </RealContainer>
    );
};

export default StudentOrder;
