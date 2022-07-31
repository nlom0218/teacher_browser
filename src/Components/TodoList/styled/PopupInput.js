import styled from "styled-components";

const PopupInput = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.originBgColor};
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`;

export default PopupInput;
