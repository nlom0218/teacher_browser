import React from "react";
import styled from "styled-components";
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';

const Container = styled.div`
    justify-self : flex-end;
    align-self : flex-end;
    display : grid;
    grid-template-columns : auto auto auto;
    align-items : center;
    column-gap : 10px;
    column-gap : 0.625rem;
    svg {
    font-size : 2em;
    font-size : 2rem;
    cursor : pointer;
    }
`

const FontSizeBtn = ({ setFontSizeAll, fontSizeAll, fontSizeOne, setFontSizeOne, seeResultType }) => {


    const onClickSizeBtn = (type) => {
        if (seeResultType == "ALL") {
            if (type === "plus") {
                setFontSizeAll(prev => prev + (0.0625 * 2))
            }
            if (type === "minus" && fontSizeAll > 1) {
                setFontSizeAll(prev => prev - (0.0625 * 2))
            }
        }

        if (seeResultType === "ONE") {
            if (type === "plus") {
                setFontSizeOne(prev => prev + (0.0625 * 4))
            }
            if (type === "minus" && fontSizeOne > 1) {
                setFontSizeOne(prev => prev - (0.0625 * 4))
            }
        }
    }
    return (<Container>
        <div> 글씨크기 조절 </div>
        <AiFillMinusSquare onClick={() => onClickSizeBtn("minus")} />
        <AiFillPlusSquare onClick={() => onClickSizeBtn("plus")} />
    </Container>);
}

export default FontSizeBtn;