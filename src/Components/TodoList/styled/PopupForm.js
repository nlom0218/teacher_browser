import styled from "styled-components";

const PopupForm = styled.form`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-rows: ${(props) =>
    !props.create ? "auto auto auto 1fr auto auto auto auto" : "auto auto 1fr auto auto auto"};
  grid-template-rows: ${(props) => props.type === "complete" && "auto auto auto 1fr auto auto auto"};
  row-gap: 20px;
  row-gap: 1.25rem;
  min-height: 100%;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${(props) => props.theme.originBgColor};
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.8;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

export default PopupForm;
