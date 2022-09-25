import styled from "styled-components";
import AttendCalendar from "./AttendCalendar";
import AttendRegister from "./AttendRegister";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const MainBottom = () => {
  return (
    <Layout>
      <AttendCalendar />
      <AttendRegister />
    </Layout>
  );
};

export default MainBottom;
