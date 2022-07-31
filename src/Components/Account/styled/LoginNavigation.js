import styled from "styled-components";

const LoginNavigation = styled.div`
  width: 100%;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
  div {
    font-weight: 600;
  }
  a {
    color: ${(props) => props.theme.btnBgColor};
    transition: color 1s ease;
    font-weight: 900;
    cursor: pointer;
  }
  .findNavigation {
    font-size: 14px;
    font-size: 0.875rem;
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default LoginNavigation;
