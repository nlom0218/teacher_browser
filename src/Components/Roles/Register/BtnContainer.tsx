import styled from "styled-components";

interface IProps {
  isAddStudent?: boolean;
}

export default styled.div<IProps>`
  display: grid;
  align-items: center;
  column-gap: 20px;
  grid-template-columns: ${(props) => (props.isAddStudent ? "auto auto 1fr" : "auto 1fr")};
  .line-btn {
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
  }
  .save-btn {
    justify-self: flex-end;
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.bgColor};
  }
  .btn {
    transition: background-color 1s ease, color 1s ease;
    padding: 5px 20px;
    padding: 0.3125rem 1.25em;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;
