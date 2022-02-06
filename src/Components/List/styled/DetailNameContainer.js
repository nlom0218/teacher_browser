import styled from "styled-components";
import { customMedia } from "../../../styles";

const DetailNameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
  row-gap: 0.3125rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr;
    margin-top: 20px;
    margin-top: 1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
    margin-top: 0;
  `}
    form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 5px;
    column-gap: 0.3125rem;
    row-gap: 10px;
    row-gap: 0.625rem;
    ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
    column-gap: 10px;
    column-gap: 0.625rem;
  `}
  }
`

export default DetailNameContainer