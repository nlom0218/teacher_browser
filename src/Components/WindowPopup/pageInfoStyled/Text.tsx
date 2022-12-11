import styled from "styled-components";

const Text = styled.div`
  line-height: 160%;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  span {
    font-weight: 600;
  }
  .page_info_icon {
    font-size: 1.5625em;
    font-size: 1.5625rem;
  }
`;

export default Text;
