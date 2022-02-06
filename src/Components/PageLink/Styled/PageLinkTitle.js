import styled from "styled-components";

const PageLinkTitle = styled.div`
  justify-self: ${(props) => !props.left && "flex-end"};
  font-size: 1.5em;
  font-size: 1.5rem;
`;

export default PageLinkTitle;
