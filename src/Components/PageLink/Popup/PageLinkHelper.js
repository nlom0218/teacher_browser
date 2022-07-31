import React, { useState } from "react";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import HelperBtnContainer from "../../Shared/Helper/HelperBtnContainer";
import PageLinkHelper1 from "../../../Helper/PageLinkHelper1.jpg";
import PageLinkHelper2 from "../../../Helper/PageLinkHelper2.jpg";
import HelperImg from "../../Shared/Helper/HelperImg";

const PageLinkHelper = () => {
  const [helperImg, setHelperImg] = useState(1);

  const onClickNum = (num) => {
    setHelperImg(num);
  };

  const processImg = () => {
    if (helperImg === 1) {
      return PageLinkHelper1;
    } else {
      return PageLinkHelper2;
    }
  };
  return (
    <BtnPopupContainer>
      <HelperBtnContainer imgArr={[1, 2]} onClickNum={onClickNum} />
      <HelperImg src={processImg()} />
    </BtnPopupContainer>
  );
};

export default PageLinkHelper;
