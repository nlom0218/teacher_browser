import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import { outPopup } from "../../apollo";
import { stopMusicFn } from "../../audio/BackgroundMusic/BackgroundMusic";
import { customMedia } from "../../styles";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.popupBgColor};
  z-index: 20;
`;

interface IStyled {
  maxHeight?: boolean;
  emojiPopup?: boolean;
  bg?: string;
}

const SRegisterContainer = styled.div<IStyled>`
  width: 90%;
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0%);
  max-height: 80%;
  height: ${(props) => props.maxHeight && "100%"};
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 5px;
  row-gap: 0.3125rem;
  ${customMedia.greaterThan("tablet")`
    width: 60%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 40%
  `}
`;

const RegisterPage = styled.div<IStyled>`
  overflow: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  height: ${(props) => props.maxHeight && "100%"};
  padding: 0px 20px;
  padding: 0rem 1.25rem;
  padding: ${(props) => props.emojiPopup && 0};
  display: grid;
  align-items: flex-start;
  row-gap: 10px;
  row-gap: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  background: ${(props) => (props.bg ? `url(${props.bg})}` : props.theme.bgColor)};
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  /* Emoji css 커스튬 */
  .emoji-picker-react {
    padding-top: 20px;
    padding-top: 1.25rem;
  }
  .emoji-categories,
  .active-category-indicator-wrapper {
    display: none;
  }
  ${({ emojiPopup, bg }) => customMedia.greaterThan(`tablet`)`
    padding: 10px 30px;
    padding: 0.625rem 1.875rem;
    padding: ${emojiPopup && 0};
    padding: ${bg && "20px"};
    padding: ${bg && "1.25rem"};
  `}
`;

const AlertPopup = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Msg = styled.div`
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  line-height: 160%;
`;

const Btn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  div {
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.btnBgColor};
  }
`;

const NoBtn = styled.div``;

const YesBtn = styled.div``;

const OutBtn = styled.div`
  justify-self: flex-end;
  color: ${(props) => props.theme.bgColor};
  padding: 1px;
  padding: 0.0625rem;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 50%;
  font-size: 1.25em;
  cursor: pointer;
  svg {
    display: flex;
  }
`;

interface IProps {
  children?: React.ReactNode;
  emojiPopup?: boolean;
  maxHeight?: boolean;
  sound1?: HTMLAudioElement;
  sound2?: HTMLAudioElement;
  needAlert?: boolean;
  bg?: string;
}

const PopupContainer = ({ children, emojiPopup, maxHeight, sound1, sound2, needAlert, bg }: IProps) => {
  const [alertPopup, setAlertPoup] = useState(false);

  const processOutPopup = () => {
    outPopup();
    localStorage.removeItem("attendStudentName");
    localStorage.removeItem("attendStudentId");
    localStorage.removeItem("summaryAttendId");
    localStorage.removeItem("summaryAttendName");
    localStorage.removeItem("seletedStudentType");
    localStorage.removeItem("JournalId");
    localStorage.removeItem("JournalStudentName");
    localStorage.removeItem("addBookmark");
    localStorage.removeItem("AllergyNum");
    localStorage.removeItem("detailToDo");
    localStorage.removeItem("editSchedule");
    localStorage.removeItem("JournalStudentId");
    localStorage.removeItem("JournalStudentName");
    localStorage.removeItem("dDayID");
    localStorage.removeItem("homeLinkID");
    localStorage.removeItem("selectedRole");
    if (sound1) {
      stopMusicFn(sound1);
    }
    if (sound2) {
      stopMusicFn(sound2);
    }
  };
  // 팝업창의 배경을 클릭하게 되면 팝업창에서 벗어나게 된다.
  const onClickBackground = () => {
    if (needAlert) {
      setAlertPoup(true);
      return;
    } else {
      processOutPopup();
    }
  };

  const onClickYesBtn = () => {
    processOutPopup();
  };

  const onClickNoBtn = () => {
    setAlertPoup(false);
  };

  return (
    <Background onClick={onClickBackground}>
      {/* e.stopPropagation 이벤트가 부모로 전달되는 것을 막는다. 즉, outPopup이 실행이 안된다. */}
      {alertPopup ? (
        <AlertPopup onClick={(e) => e.stopPropagation()}>
          <Msg>팝업창을 벗어나면 새롭게 작성한 글은 사라집니다.</Msg>
          <Msg>팝업창을 벗어나시겠습니까?</Msg>
          <Btn>
            <YesBtn onClick={onClickYesBtn}>네</YesBtn>
            <NoBtn onClick={onClickNoBtn}>아니요</NoBtn>
          </Btn>
        </AlertPopup>
      ) : (
        <SRegisterContainer onClick={(e) => e.stopPropagation()} maxHeight={maxHeight}>
          <OutBtn onClick={onClickBackground}>
            <IoCloseOutline />
          </OutBtn>
          <RegisterPage bg={bg} emojiPopup={emojiPopup} maxHeight={maxHeight}>
            {children}
          </RegisterPage>
        </SRegisterContainer>
      )}
    </Background>
  );
};

export default PopupContainer;
