import { SiNotion } from "react-icons/si";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  svg {
    font-size: 1.5625em;
    font-size: 1.5625rem;
  }
  div {
    cursor: pointer;
    :hover {
      text-decoration: underline;
      font-weight: 600;
    }
  }
`;

interface IProps {
  url: string;
  contents: string;
}

const Notion = ({ url, contents }: IProps) => {
  return (
    <Container>
      <SiNotion />
      <div onClick={() => window.open(url)}>{contents}</div>
    </Container>
  );
};

export default Notion;
