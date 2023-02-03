import React, { useEffect, useState } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styled from "styled-components";

interface ILayout {
  isInclude: boolean;
}

const Layout = styled.div<ILayout>`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.isInclude && props.theme.originBgColor};
  transition: background-color 0.3s ease;
`;

interface IProps {
  studentName: string;
  _id: string;
  selectedStudent: string[];
  setSelectedStudent: React.Dispatch<React.SetStateAction<string[]>>;
}

const StudentItem = ({ studentName, _id, selectedStudent, setSelectedStudent }: IProps) => {
  const [isInclude, setIsInclude] = useState(selectedStudent.includes(_id));

  const onClickStudent = () => {
    if (isInclude) return setSelectedStudent((prev) => prev.filter((id) => id !== _id));
    return setSelectedStudent((prev) => [...prev, _id]);
  };

  useEffect(() => {
    setIsInclude(selectedStudent.includes(_id));
  }, [selectedStudent]);

  return (
    <Layout onClick={onClickStudent} isInclude={isInclude}>
      <div>{isInclude ? <IoCheckboxOutline /> : <IoSquareOutline />}</div>
      <div>{studentName}</div>
    </Layout>
  );
};

export default StudentItem;
