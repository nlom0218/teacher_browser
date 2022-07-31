import styled from "styled-components";

const SectionContents = styled.div`
  background-color: ${(props) => props.theme.cardBg};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  position: relative;
`;

export default SectionContents;
