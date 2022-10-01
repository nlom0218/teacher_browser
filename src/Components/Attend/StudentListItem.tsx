import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IStudent {
  isSeleted: boolean;
}

const Student = styled.div<IStudent>`
  font-size: 0.875em;
  font-size: 0.875rem;
  padding: 5px;
  padding: 0.3125rem;
  margin-right: 5px;
  margin-right: 0.3125rem;
  margin-bottom: 5px;
  margin-bottom: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.isSeleted && props.theme.green};
  color: ${(props) => props.isSeleted && props.theme.originBgColor};
  transition: background-color 1s ease;
  cursor: pointer;
  :hover {
    background-color: ${(props) => (props.isSeleted ? props.theme.green : props.theme.bgColor)};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

interface IProps {
  studentName: string;
  setSeletedStudent: Dispatch<SetStateAction<string[]>>;
  seletedStudent: string[];
}

const StudentListItem = ({ studentName, setSeletedStudent, seletedStudent }: IProps) => {
  const onClickStudent = () => {
    setSeletedStudent((prev) => {
      if (seletedStudent.includes(studentName)) {
        return prev.filter((item) => item !== studentName);
      } else {
        return [...prev, studentName];
      }
    });
  };
  return (
    <Student isSeleted={seletedStudent.includes(studentName)} onClick={onClickStudent}>
      {studentName}
    </Student>
  );
};

export default StudentListItem;
