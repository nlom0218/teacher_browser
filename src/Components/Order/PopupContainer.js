import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { color, customMedia } from "../../styles";

const SRegisterContainer = styled.div`
  position: absolute;
  top: 20px;
  top: 1.25rem;
  left: 50%;
  width: 90%;
  max-height: 90%;
  overflow: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  transform: translate(-50%, 0%);
  box-shadow: ${color.boxShadow};
  ${customMedia.greaterThan("tablet")`
    width: 80%
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%
  `}
`;

const CloseBtn = styled.div`
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  text-align: end;
  margin-right: 10px;
  margin-right: 0.625rem;
  cursor: pointer;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const RegisterPage = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 10px;
  border-radius: 0.625rem;
  display: grid;
  align-items: flex-start;
  row-gap: 10px;
  row-gap: 1.25rem;
`;

const RegisterContainer = ({ children, setPopup }) => {
  const onClickCloseBtn = () => {
    setPopup(undefined);
  };
  return (
    <SRegisterContainer>
      <CloseBtn onClick={onClickCloseBtn}>
        <FaTimes />
      </CloseBtn>
      <RegisterPage>{children}</RegisterPage>
    </SRegisterContainer>
  );
};

export default RegisterContainer;
