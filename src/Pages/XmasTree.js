import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import AlertMessage from "../Components/Shared/AlertMessage";

const Container = styled.div``;

const XmasTree = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");

  useEffect(() => {}, []);
  return (
    <BasicContainer menuItem={true}>
      <Container></Container>
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
    </BasicContainer>
  );
};

export default XmasTree;
