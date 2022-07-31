import styled from "styled-components";

const AccountInput = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.contentBgColor};
  color: ${(props) => props.theme.fontColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  :focus {
    box-shadow: 0 0 1px 0.5px ${(props) => props.theme.fontColor};
  }
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`;

export default AccountInput;
