import styled from "styled-components";
import { customMedia } from "../../../styles";

const DetailEomjiIcon = styled.div`
  display: flex;
  align-self: center;
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  transform: background-color 0.6s ease;
  justify-self: flex-start;
  :hover {
    background-color: ${(props) => props.theme.blurColor};
    transition: background-color 0.6s ease;
  }
  ${customMedia.greaterThan("tablet")`
    font-size: 2.5em;
    font-size: 2.5rem;
    grid-column: 1 / -1;
  `}
  .student_detail_studentIcon {
    font-size: 3em;
    font-size: 3rem;
    svg {
      display: flex;
    }
  }
`;

export default DetailEomjiIcon;
