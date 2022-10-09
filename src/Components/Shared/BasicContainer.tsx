import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Theme from "./Theme";
import { customMedia } from "../../styles";
import PreviousPageBtn from "./PreviousPageBtn";
import { useReactiveVar } from "@apollo/client";
import { fullScreenMode, isFullScreenModeVar } from "../../apollo";

interface IStyled {
  isFullScreenMode: boolean;
  notScroll?: boolean;
  page?: string;
}

const Container = styled.div<IStyled>`
  display: grid;
  grid-template-rows: ${(props) => (!props.isFullScreenMode ? "auto 1fr 60px" : "40px 1fr 40px")};
  grid-template-rows: ${(props) => (!props.isFullScreenMode ? "auto 1fr 3.75rem" : "2.5rem 1fr 2.5rem")};
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
  position: relative;
`;

const ContentLayout = styled.div<IStyled>`
  margin: 0 auto;
  max-width: ${(props) => (!props.isFullScreenMode ? "1200px" : "96vw")};
  max-width: ${(props) => (!props.isFullScreenMode ? "75rem" : "96vw")};
  width: 96%;
  border-radius: 10px;
  border-radius: 0.625rem;
  background: ${(props) => props.theme.blurColor};
  background: ${(props) => props.isFullScreenMode && props.page === "timer" && "none"};
  transition: background 1s ease;
  position: relative;
  overflow: ${(props) => (props.notScroll ? "scroll" : "scroll")};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
`;

interface IProps {
  children: ReactNode;
  menuItem?: boolean;
  notScroll?: boolean;
  page?: string;
  isWindowPopup?: boolean;
}

const BasicContainer = ({ children, menuItem, notScroll, page, isWindowPopup }: IProps) => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);
  const [seeSideMenu, setSeeSideMenu] = useState(false);
  const onClickBackground = () => {
    if (seeSideMenu) {
      setSeeSideMenu(false);
    }
  };
  useEffect(() => {
    if (isWindowPopup) {
      fullScreenMode();
    }
  }, []);
  return (
    <Container onClick={onClickBackground} isFullScreenMode={isFullScreenMode}>
      <Theme isWindowPopup={isWindowPopup} />
      <Header
        seeSideMenu={seeSideMenu}
        setSeeSideMenu={setSeeSideMenu}
        isFullScreenMode={isFullScreenMode}
        isWindowPopup={isWindowPopup}
      />
      <ContentLayout notScroll={notScroll} isFullScreenMode={isFullScreenMode} page={page}>
        {!isWindowPopup && menuItem && <PreviousPageBtn />}
        {children}
      </ContentLayout>
    </Container>
  );
};

export default BasicContainer;
