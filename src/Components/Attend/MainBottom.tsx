import styled from "styled-components";
import AttendCalendar from "./AttendCalendar";
import AttendRegister from "./AttendRegister";

const Layout = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: scroll;
  min-height: 100%;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  .main_bottom_layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 20px;
    column-gap: 1.25rem;
    min-height: 100%;
  }
`;

interface IProps {
  date: Date;
}

const MainBottom = ({ date }: IProps) => {
  return (
    <Layout>
      <div className="main_bottom_layout">
        <AttendCalendar date={date} />
        <AttendRegister />
      </div>
    </Layout>
  );
};

export default MainBottom;
