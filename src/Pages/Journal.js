// 리액트
import React from "react";

// 컴포넌트
import BasicContainer from "../Components/Shared/BasicContainer";
import TitleArea from "../Components/Journal/TitleArea";
import MainArea from "../Components/Journal/MainArea";

// 팝업
import { isPopupVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import Pop_WriteJournal from "../Components/Journal/Popup/Pop_WriteJournal";

//
const Journal = ({ me }) => {
  const isPopup = useReactiveVar(isPopupVar);
  return (
    <BasicContainer menuItem={true}>
      <TitleArea />
      <MainArea me={me} />
      {isPopup === "writeJournal" && <Pop_WriteJournal me={me} />}
    </BasicContainer>
  );
};

export default Journal;
