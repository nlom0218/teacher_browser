import PopupContainer from "../../Shared/PopupContainer";
import Container from "../pageInfoStyled/Container";
import Notion from "../pageInfoStyled/Notion";
import PageInfoBtn from "../pageInfoStyled/PageInfoBtn";
import Text from "../pageInfoStyled/Text";

interface IProps {
  isWindowPopup: boolean;
  redirectURL?: string;
}

const OrderPageInfo = ({ isWindowPopup, redirectURL }: IProps) => {
  return (
    <PopupContainer>
      <Container>
        <Text>
          <div className="page_info_icon">👦</div>
          <div>
            <span>학생을 생성</span>하고 싶은가요?
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">📝</div>
          <div>학생을 생성하면 학생 번호가 아닌 학생 이름으로 해당 기능을 사용할 수 있습니다.</div>
        </Text>
        <Text>
          <div className="page_info_icon">👩‍💻</div>
          <div>
            간편하게 <span>회원가입/로그인</span>하여 학생을 생성해 보세요!
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">🥒</div>
          <div>
            <span>명렬표를 생성하여</span>학생을 등록해 보세요! 자세한 내용은 아래의
            <span>"명렬표 및 학생 생성 방법"</span>을 참고해주세요.
          </div>
        </Text>
        <Notion
          url="https://sparkly-corleggy-3e4.notion.site/7e928ce29fc24149a9d69d8c058716bf"
          contents="명렬표 및 학생 생성 방법"
        />
        <PageInfoBtn isWindowPopup={isWindowPopup} redirectURL={redirectURL} />
      </Container>
    </PopupContainer>
  );
};

export default OrderPageInfo;
