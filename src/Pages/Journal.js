// 리액트
import React from "react";

// 컴포넌트
import BasicContainer from "../Components/Shared/BasicContainer";
import TitleArea from "../Components/Journal/TitleArea";
import MainArea from "../Components/Journal/MainArea";
//

const Journal = ({ me }) => {
  return (
    <BasicContainer menuItem={true}>
      <TitleArea />
      <MainArea me={me} />
    </BasicContainer>
  );
};

export default Journal;
