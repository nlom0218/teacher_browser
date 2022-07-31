import styled from "styled-components";

const PageLinkTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  justify-self: ${(props) => (!props.left ? "flex-end" : "flex-start")};
  font-size: 1.5em;
  font-size: 1.5rem;
`;

export default PageLinkTitle;
