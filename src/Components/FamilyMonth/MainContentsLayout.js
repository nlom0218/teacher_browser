import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { isFullScreenModeVar } from "../../apollo";
import useMedia from "../../Hooks/useMedia";

const SMainContentsLayout = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  width: calc(${(props) => props.multiply} * 16vw);
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const MainContentsLayout = ({ children }) => {
  const [multiply, setMultiply] = useState();
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);
  const media = useMedia();
  useEffect(() => {
    if (media !== "Desktop") {
      setMultiply(3.5);
      return;
    }
    if (isFullScreenMode) {
      setMultiply(3.5);
      return;
    }
    setMultiply(2.5);
  }, [media, isFullScreenMode]);
  return (
    <SMainContentsLayout multiply={multiply}>{children}</SMainContentsLayout>
  );
};

export default MainContentsLayout;
