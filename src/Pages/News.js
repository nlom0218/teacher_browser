import React, { useState } from "react";
import styled from "styled-components";
import NewsSection from "../Components/News/NewsSection";
import BasicContainer from "../Components/Shared/BasicContainer";
import useMe from "../Hooks/useMe";
import useTitle from "../Hooks/useTitle";

const Container = styled.div`
  min-height: 100%;
`;

const News = () => {
  const titleUpdataer = useTitle("티처캔 | 뉴스");

  const me = useMe();

  const [init, setInit] = useState(true);

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <NewsSection init={init} setInit={setInit} userEmail={me?.email} favoriteNews={me?.favoriteNews} />
      </Container>
    </BasicContainer>
  );
};

export default News;
