import styled from "styled-components";

interface ITitle {
  isMain?: boolean;
}

export default styled.div<ITitle>`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-end;
  font-size: 1.5em;
  font-size: 1.5rem;
  .main-date {
    font-size: ${(props) => props.isMain && "1em"};
    font-size: ${(props) => props.isMain && "1rem"};
  }
`;
