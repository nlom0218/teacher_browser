import { useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import styled from "styled-components";
import { SEE_ALL_STUDENT_QUERY } from "../../Graphql/Student/query";
import { Icon } from "../Calendar/Popup/PopupLayout";
import StudentListItem from "./StudentListItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const SStudentList = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.originBgColor};
  padding: 10px;
  padding: 0.625rem;
  padding-bottom: 5px;
  padding-bottom: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: flex;
  flex-wrap: wrap;
  transition: background-color 1s ease;
`;

interface IData {
  seeAllStudent: IStudentData[];
}

interface IStudentData {
  studentName: string;
  index: number;
  _id: string;
}

interface IProps {
  setSeletedStudent: Dispatch<SetStateAction<string[]>>;
  seletedStudent: string[];
}

const StudentList = ({ setSeletedStudent, seletedStudent }: IProps) => {
  const { data, loading } = useQuery<IData>(SEE_ALL_STUDENT_QUERY, {
    variables: { sort: "name", trash: false },
  });
  return (
    <Container>
      <Icon>
        <BsFillPersonFill />
      </Icon>
      <SStudentList>
        {data?.seeAllStudent.map((item, index) => {
          return (
            <StudentListItem
              key={index}
              {...item}
              setSeletedStudent={setSeletedStudent}
              seletedStudent={seletedStudent}
            />
          );
        })}
      </SStudentList>
    </Container>
  );
};

export default StudentList;
