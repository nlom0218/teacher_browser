import Container from "../../Shared/pageInfo/Container";
import Notion from "../../Shared/pageInfo/Notion";
import PageInfoBtn from "../../Shared/pageInfo/PageInfoBtn";
import Text from "../../Shared/pageInfo/Text";
import PopupContainer from "../../Shared/PopupContainer";

interface IProps {
  isWindowPopup: boolean;
}

const PageInfo = ({ isWindowPopup }: IProps) => {
  return (
    <PopupContainer>
      <Container>
        <Text>
          <div className="page_info_icon">🔗</div>
          <div>
            수업에 필요한 <span>QR코드</span>를 만들어보세요!
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">📀</div>
          <div>
            QR코드를 내 컴퓨터에 <span>저장, 인쇄</span>도 할 수 있습니다.
          </div>
        </Text>
        <Text>
          <div className="page_info_icon">🤔</div>
          <div>만약 다음에도 같은 QR코드가 필요하면?</div>
        </Text>
        <Text>
          <div className="page_info_icon">🧑‍💻</div>
          <div>
            간편하게 <span>회원가입/로그인</span>하여 <span>QR코드 저장소</span>를 이용하세요!
          </div>
        </Text>
        <Notion
          url="https://sparkly-corleggy-3e4.notion.site/QR-dddce13db05b4000a61568bdf90bee70"
          contents="QR코드 페이지 사용하는 방법"
        />

        <PageInfoBtn isWindowPopup={isWindowPopup} />
      </Container>
    </PopupContainer>
  );
};

export default PageInfo;
