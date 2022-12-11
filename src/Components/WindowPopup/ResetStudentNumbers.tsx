import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeLocalNumbers } from "../../apollo";
import routes from "../../routes";

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  bottom: 1.25rem;
  left: 20px;
  left: 1.25rem;
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
  z-index: 15;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  box-shadow: 0px 2px 1px 0.5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0.125rem 0.0625rem 0.03125rem rgba(0, 0, 0, 0.2);
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
`;

interface IProps {
  page: string;
}

const ResetStudentNumbers = ({ page }: IProps) => {
  const navigate = useNavigate();

  const onClickReset = () => {
    removeLocalNumbers();
    navigate(`${page}?popup=popup`);
  };

  return <Container onClick={onClickReset}>학생 수 초기화</Container>;
};

export default ResetStudentNumbers;
