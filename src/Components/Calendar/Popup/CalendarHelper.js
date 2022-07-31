import React, { useState } from "react";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import HelperBtnContainer from "../../Shared/Helper/HelperBtnContainer";
import HelperImg from "../../Shared/Helper/HelperImg";
import CalendarHelper1 from "../../../Helper/CalendarHelper1.jpg";
import CalendarHelper2 from "../../../Helper/CalendarHelper2.jpg";

const CalendarHelper = () => {
  const [helperImg, setHelperImg] = useState(1);

  const onClickNum = (num) => {
    setHelperImg(num);
  };

  const processImg = () => {
    if (helperImg === 1) {
      return CalendarHelper1;
    } else {
      return CalendarHelper2;
    }
  };

  return (
    <BtnPopupContainer>
      <HelperBtnContainer imgArr={[1, 2]} onClickNum={onClickNum} />
      <HelperImg src={processImg()} />
    </BtnPopupContainer>
  );
};

export default CalendarHelper;
