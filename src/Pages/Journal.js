// 리액트
import React from "react";

// 컴포넌트
import BasicContainer from "../Components/Shared/BasicContainer";
import TitleArea from "../Components/Journal/TitleArea";
import MainArea from "../Components/Journal/MainArea";
//

const Journal = () => {
  return (
    <BasicContainer menuItem={true}>
      <TitleArea />
      <MainArea />
    </BasicContainer>
  );
};

export default Journal;
