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


const StudentOrder = ({ selectedStudent, setSelectedStudent, fontSizeAll, isShuffle, pickNum, seatType, mateGender }) => {

    const basicShuffled = () => {
        return selectedStudent
            .map((value) => ({ ...value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
    }

    const shuffledStudent = () => {
        setSelectedStudent(basicShuffled());
    };

    const shuffledStudentSameMateGender = () => {
        console.log("same");
    }

    const shuffledStudentOtherGender = () => {
        const maleStudents = basicShuffled().filter(item => item.gender === "male")
        const femaleStudents = basicShuffled().filter(item => item.gender === "female")
        const moreNumberOfStudents = maleStudents.length === femaleStudents.length ? maleStudents.length
            : maleStudents.length > femaleStudents.length ? maleStudents.length : femaleStudents.length
        const newSelectedStudent = []
        for (let i = 0; i < moreNumberOfStudents; i++) {
            if (maleStudents.length === femaleStudents.length) {
                // 여학생 수와 남학생 수가 같은 경우
                newSelectedStudent.push(maleStudents[i])
                newSelectedStudent.push(femaleStudents[i])
            } else if (maleStudents.length > femaleStudents.length) {
                // 남학생 수가 더 많은 경우
                newSelectedStudent.push(maleStudents[i])
                if (femaleStudents[i]) {
                    newSelectedStudent.push(femaleStudents[i])
                }
            } else {
                // 여학생 수가 더 많은 경우
                if (maleStudents[i]) {
                    newSelectedStudent.push(maleStudents[i])
                }
                newSelectedStudent.push(femaleStudents[i])
            }
        }
        setSelectedStudent(newSelectedStudent)
    }

    useEffect(() => {
        if (isShuffle !== "ing") {
            console.log("is not ing");
            return
        }
        let shuffling;
        if (seatType === 1 || seatType === 2 && mateGender === "random") {
            shuffling = setInterval(() => {
                shuffledStudent();
            }, 100);
        }
        if (seatType === 2 && mateGender === "same") {
            shuffling = setInterval(() => {
                shuffledStudentSameMateGender();
            }, 100);
        }
        if (seatType === 2 && mateGender === "other") {
            shuffling = setInterval(() => {
                shuffledStudentOtherGender();
            }, 100);
        }
        return () => clearInterval(shuffling);
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
                            <Name fontSize={fontSizeAll}>{item.name} {item.gender}</Name>
                        </Item>
                    );
                })
                }
            </Container>
        </RealContainer>
    );
};

export default StudentOrder;
