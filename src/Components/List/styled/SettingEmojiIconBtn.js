import styled from "styled-components";
import { FadeIn } from "../../../Animations/Fade";

const SettingEmojiIconBtn = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  font-size: 0.875em;
  font-size: 0.875rem;
  animation: ${FadeIn} 0.2s ease forwards;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  div {
    padding: 5px;
    padding: 0.3125rem;
    :hover {
      background-color: ${(props) => props.theme.blurColor};
      transition: background-color 0.6s ease;
      cursor: pointer;
      border-radius: 5px;
      border-radius: 0.3125rem;
    }
  }
`;

export default SettingEmojiIconBtn;
