import styled from "styled-components";

const Layout = styled.div`
  max-height: 100%;
  background-color: ${(props) => props.theme.contentBgColor};
  transition: background-color 1s ease;
  display: grid;
  row-gap: 2px;
  row-gap: 0.126rem;
  overflow: scroll;
`;

interface IHead {
  isAddStudent: boolean;
}

const Head = styled.div<IHead>`
  display: grid;
  grid-template-columns: ${(props) => (props.isAddStudent ? "1fr 3fr 1.5fr" : "1fr 3fr")};
  column-gap: 2px;
  column-gap: 0.126rem;
  font-weight: 700;
  input {
    background-color: ${(props) => props.theme.skyblue};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
  }
`;

interface IProps {
  children: React.ReactNode;
  isAddStudent?: boolean;
}

const GraphLayout = ({ children, isAddStudent = false }: IProps) => {
  return (
    <Layout>
      <Head isAddStudent={isAddStudent}>
        <input defaultValue={"역할"} readOnly />
        <input defaultValue={"하는 일"} readOnly />
        {isAddStudent && <input defaultValue={"이름"} readOnly />}
      </Head>
      {children}
    </Layout>
  );
};

export default GraphLayout;
