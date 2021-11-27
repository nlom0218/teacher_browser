import styled from "styled-components";

const LoginNavigation = styled.div`
  width: 100%;
  display: grid;
  row-gap: 10px;
  justify-items: center;
  div {
    font-weight: 600;
  }
  span {
    color: ${props => props.theme.btnBgColor};
    transition: color 1s ease;
    font-weight: 900;
    cursor: pointer;
  }
  .findNavigation {
    font-size: 14px;
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
`

export default LoginNavigation