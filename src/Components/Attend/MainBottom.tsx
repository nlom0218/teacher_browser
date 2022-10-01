import styled from "styled-components";
import AttendCalendar from "./AttendCalendar";
import AttendRegister from "./AttendRegister";

const Layout = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
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
