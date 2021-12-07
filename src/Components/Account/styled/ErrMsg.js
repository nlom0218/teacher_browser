import styled from "styled-components"

const ErrMsg = styled.div`
text-align: center;
color: ${props => props.theme.redColor};
transition: color 1s ease;
font-weight: 600;
`

export default ErrMsg