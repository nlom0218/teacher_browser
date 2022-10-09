import { SiNotion } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import routes from "../../../routes";
import { customMedia } from "../../../styles";
import PopupContainer from "../../Shared/PopupContainer";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Text = styled.div`
  line-height: 160%;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  span {
    font-weight: 600;
  }
`;

const Icon = styled.div`
  font-size: 1.5625em;
  font-size: 1.5625rem;
`;

const Notion = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  svg {
    font-size: 1.5625em;
    font-size: 1.5625rem;
  }
  div {
    cursor: pointer;
    :hover {
      text-decoration: underline;
      font-weight: 600;
    }
  }
`;

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
}

const PageInfo = ({ isWindowPopup }: IPros) => {
  const navigate = useNavigate();
  const onClickLoginBtn = () => {
    outPopup();
    navigate(routes.login, {
      state: {
        isWindowPopup,
      },
    });
  };
  return (
    <PopupContainer>
      <Container>
        <Text>
          <Icon>🏫</Icon>
          <div>
            <span>학교를 등록</span>하고 싶은가요?
          </div>
        </Text>
        <Text>
          <Icon>📝</Icon>
          <div>학교를 등록하면 번거로운 검색을 하지 않아도 됩니다.</div>
        </Text>
        <Text>
          <Icon>🧑‍💻</Icon>
          <div>
            간편하게 <span>회원가입/로그인</span>하여 선생님의 학교를 등록해보세요!
          </div>
        </Text>
        <Text>
          <Icon>🥒</Icon>
          <div>
            <span>학생 알러지</span>를 등록하면 메뉴에서 학생 알러지를 확인할 수 있습니다. 자세한 내용은 아래의{" "}
            <span>"학생 알러지 추가 방법"</span>을 참고해주세요.
          </div>
        </Text>
        <Notion>
          <SiNotion />
          <div onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/acede1a10bbe436dac1e45d6ba759568")}>
            학교 등록방법
          </div>
        </Notion>
        <Notion>
          <SiNotion />
          <div onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/3562152a55784a9fa5f2b50ee50fdc71")}>
            학생 알러지 추가 방법
          </div>
        </Notion>
        <BtnContainer>
          <div onClick={onClickLoginBtn} className="login">
            로그인하기
          </div>
          <div onClick={() => window.open("https://teachercan.com")} className="home">
            티처캔으로 이동
          </div>
        </BtnContainer>
      </Container>
    </PopupContainer>
  );
};

export default PageInfo;
