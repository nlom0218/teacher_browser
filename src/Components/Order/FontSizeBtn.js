import React from 'react';
import styled from 'styled-components';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';


const Container = styled.div`
justify-self: flex-end;
align-self: flex-end;
display: grid;
grid-template-columns: auto auto auto;
align-items: center;
column-gap: 10px;
column-gap: 0.625rem;
svg{
cursor: pointer;
font-size: 2em;
font-size: 2rem;
}
`


const FontSizeBtn = ({ setFontSizeAll, fontSizeAll, setFontSizeOne, fontSizeOne, seeResultType }) => {
    //최소 1em, 최대  em, 간격 0.0625

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
            if (type === "minus" && fontSizeOne > 5) {
                setFontSizeOne(prev => prev - (0.0625 * 4))
            }
        }
    }
    return (<Container>
        <div> 글씨크기조절</div>
        <AiFillMinusSquare onClick={() => onClickSizeBtn("minus")} />
        <AiFillPlusSquare onClick={() => onClickSizeBtn("plus")} />
    </Container>);
}

export default FontSizeBtn;
