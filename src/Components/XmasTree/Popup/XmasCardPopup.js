import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import CardBackground from "./CardBackground";

const Layout = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  justify-items: center;
  background-color: white;
  padding-top: 20px;
  padding-top: 1.25rem;
  opacity: 0.8;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 10px;
  border-radius: 0.625rem;
  .wishCardBox_text {
    opacity: 1;
  }
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    padding: 0px 20px;
    padding: 0rem 1.25rem;
    resize: none;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${(props) => props.theme.originBgColor};
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const XmasCardPopup = () => {
  const { author, text, bg } = JSON.parse(localStorage.getItem("xmasCardPopup"));
  return (
    <PopupContainer bg={CardBackground[bg]}>
      <Layout>
        <TextareaAutosize className="wishCardBox_text" value={text} minRows={5} maxRows={5} readOnly></TextareaAutosize>
        <div className="wishCardBox_text">- {author} -</div>
      </Layout>
    </PopupContainer>
  );
};

export default XmasCardPopup;
