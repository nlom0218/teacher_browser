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
    transition: border 1s ease, background - color 1s ease;
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


const StudentOrder = ({ selectedStudent, setSelectedStudent, fontSizeAll, isShuffle, pickNum, seatType, keepDistanceGroup }) => {

    console.log(selectedStudent);
    const [groupArr, setGroupArr] = useState([])

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
        if (isShuffle === "finish") {
            if (seatType === 1 && keepDistanceGroup.gender === "same" && keepDistanceGroup.type === "horizontal") {
                // 모둥미 가로 형태이고 같은 성별끼리 같은 모둠
                console.log("거리두기 대형, 가로 모둠, 같은 성별");
                keepDistanceGroupHorizontalSame(selectedStudent, pickNum)
            }
            if (seatType === 1 && keepDistanceGroup.gender === "helf" && keepDistanceGroup.type === "horizontal") {
                // 모둥미 가로 형태이고 성별이 섞인 모둠
                console.log("거리두기 대형, 가로 모둠, 다른 성별");
            }
            if (seatType === 1 && keepDistanceGroup.gender === "same" && keepDistanceGroup.type === "vertical") {
                // 모둥미 세로 형태이고 같은 성별끼리 같은 모둠
                console.log("거리두기 대형, 세로 모둠, 같은 성별");
            }
            if (seatType === 1 && keepDistanceGroup.gender === "helf" && keepDistanceGroup.type === "vertical") {
                // 모둥미 세로 형태이고 같은 성별이 섞인 모둠
                console.log("거리두기 대형, 세로 모둠, 다른 성별");
            }
        }

    }, [isShuffle]);


    useEffect(() => {
        if (keepDistanceGroup.type === "vertical") {
            let newGroupArr = []
            for (let i = 0; i < pickNum; i++) {
                newGroupArr.push(i + 1)
            }
            setGroupArr(newGroupArr)
        } else if (keepDistanceGroup.type === "horizontal") {
            let newGroupArr = []
            for (let i = 0; i < Math.ceil(selectedStudent.length / pickNum); i++) {
                newGroupArr.push(i + 1)
            }
            setGroupArr(newGroupArr)
        }
    }, [keepDistanceGroup, pickNum])


    return (
        <RealContainer>
            <Table>칠판</Table>
            <Container
                pickNum={pickNum}
                seatType={seatType}
                groupType={keepDistanceGroup.type}
                rowLength={Math.ceil(selectedStudent.length / pickNum)}
            >
                {keepDistanceGroup.type !== "none" &&
                    <GroupName
                        groupType={keepDistanceGroup.type}
                        pickNum={pickNum}
                        rowLength={Math.ceil(selectedStudent.length / pickNum)}
                    >
                        {groupArr.map((item, index) => {
                            return <div key={index}>{item}모둠</div>
                        })}
                    </GroupName>}
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
