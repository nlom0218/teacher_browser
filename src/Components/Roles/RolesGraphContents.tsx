import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2px;
  column-gap: 0.126rem;
  input {
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
    ::placeholder {
      opacity: 0.8;
    }
  }
`;

interface IProps {
  role: string;
  work: string;
}

const RolesGraphContents = ({ role, work }: IProps) => {
  return (
    <Container>
      <input placeholder={role} />
      <input placeholder={work} />
    </Container>
  );
};

export default RolesGraphContents;
