import styled from "styled-components";
import AttendCalendar from "./AttendCalendar";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const MainBottom = () => {
  return (
    <Layout>
      <AttendCalendar />
    </Layout>
  );
};

export default MainBottom;
