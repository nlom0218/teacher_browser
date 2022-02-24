import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import DetailStartTime from "./DetailStartTime";

const ClassTimeSet = ({ userEmail }) => {
  return (
    <PopupContainer>
      <DetailStartTime userEmail={userEmail} />
    </PopupContainer>
  );
};

export default ClassTimeSet;
