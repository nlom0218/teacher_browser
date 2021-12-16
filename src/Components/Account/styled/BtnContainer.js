import styled from "styled-components"
import { customMedia } from "../../../styles"

const BtnContainer = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  div {
    text-align: center;
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

export default BtnContainer