import React, { useState } from "react";
import styled from "styled-components";
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
