import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import routes from "../../../routes";
import { customMedia } from "../../../styles";

const BtnContainer = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  text-align: center;
  div {
    padding: 10px;
    padding: 0.625rem;
    color: ${(props) => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  .login {
    background-color: ${(props) => props.theme.green};
  }
  .home {
    background-color: ${(props) => props.theme.btnBgColor};
  }
  ${customMedia.greaterThan("tablet")`
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      column-gap: 1.25rem;
  `}
`;

interface IPros {
  isWindowPopup: boolean;
  redirectURL?: string;
}

const PageInfoBtn = ({ isWindowPopup, redirectURL }: IPros) => {
  const navigate = useNavigate();
  const onClickLoginBtn = () => {
    outPopup();
    navigate(routes.login, {
      state: {
        isWindowPopup,
        redirectURL,
      },
    });
  };
  return (
    <BtnContainer>
      <div onClick={onClickLoginBtn} className="login">
        로그인하기
      </div>
      <div onClick={() => window.open("https://teachercan.com")} className="home">
        티처캔으로 이동
      </div>
    </BtnContainer>
  );
};

export default PageInfoBtn;
