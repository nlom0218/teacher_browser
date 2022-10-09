import Container from "../../Shared/pageInfo/Container";
import Notion from "../../Shared/pageInfo/Notion";
import PageInfoBtn from "../../Shared/pageInfo/PageInfoBtn";
import Text from "../../Shared/pageInfo/Text";
import PopupContainer from "../../Shared/PopupContainer";

interface IPros {
  isWindowPopup: boolean;
  redirectURL?: string;
}

const PageInfo = ({ isWindowPopup, redirectURL }: IPros) => {
  return (
    <PopupContainer>
      <Container>
        <Text>
          <div className="page_info_icon">🏫</div>
          <div>
            <span>학교를 등록</span>하고 싶은가요?
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">📝</div>
          <div>학교를 등록하면 번거로운 검색을 하지 않아도 됩니다.</div>
        </Text>
        <Text>
          <div className="page_info_icon">🧑‍💻</div>
          <div>
            간편하게 <span>회원가입/로그인</span>하여 선생님의 학교를 등록해보세요!
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">🥒</div>
          <div>
            <span>학생 알러지</span>를 등록하면 메뉴에서 학생 알러지를 확인할 수 있습니다. 자세한 내용은 아래의{" "}
            <span>"학생 알러지 추가 방법"</span>을 참고해주세요.
          </div>
        </Text>
        <Notion
          url="https://sparkly-corleggy-3e4.notion.site/acede1a10bbe436dac1e45d6ba759568"
          contents="학교 등록방법"
        />
        <Notion
          url="https://sparkly-corleggy-3e4.notion.site/3562152a55784a9fa5f2b50ee50fdc71"
          contents="학생 알러지 추가 방법"
        />
        <PageInfoBtn isWindowPopup={isWindowPopup} redirectURL={redirectURL} />
      </Container>
    </PopupContainer>
  );
};

export default PageInfo;
