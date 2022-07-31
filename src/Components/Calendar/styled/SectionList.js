import styled from "styled-components";
import { customMedia } from "../../../styles";

const SectionList = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 10px;
  padding: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    padding: 20px;
    padding: 1.25rem;
  `}
`;

export default SectionList;
