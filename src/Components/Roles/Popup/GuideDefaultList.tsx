import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import routes from "../../../routes";

const Layout = styled.div`
  max-height: 100%;
  padding: 30px 10px;
  padding: 1.875rem 0.625rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  line-height: 20px;
  line-height: 1.25rem;
`;

const Button = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const GuideDefaultList = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    outPopup();
    navigate(routes.list);
  };

  return (
    <Layout>
      <div>1인 1역의 학생 등록은 대표 명렬표의 학생들을 기준으로 합니다.</div>
      <div>현재 대표 명렬표가 없습니다. 아래의 버튼을 클릭하여 대표 명렬표를 등록해주세요.</div>
      <div>
        대표 명렬표 등록은 대표 명렬표로 등록하고자 하는 명렬표의 세부 페이지로 이동하여 상단에 위치한 별표를 클릭하면
        됩니다.
      </div>
      <Button onClick={onClickButton}>대표 명렬표 만들기</Button>
    </Layout>
  );
};

export default GuideDefaultList;
