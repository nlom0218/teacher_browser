import styled from "styled-components"

const AccountSubmitInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 10px;
  letter-spacing: 0.625rem;
`

export default AccountSubmitInput