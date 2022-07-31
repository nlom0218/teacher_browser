import styled from "styled-components";
import { customMedia } from "../../../styles";

const ContentsList = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 20px;
  ${customMedia.greaterThan("desktop")`
  position: absolute;
  top: 4%;
  right: ${(props) => !props.right && "4%"};
  left : ${(props) => props.right && "4%"};
  min-width: 65%;
  max-width: 65%;
  max-height: 92%;
  min-height: 92%;
  grid-template-rows: auto auto 1fr;
  padding: 0;
  `}
`;

export default ContentsList;
