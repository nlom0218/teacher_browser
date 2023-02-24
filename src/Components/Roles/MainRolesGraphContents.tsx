import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import MainRolesGraphContentStudents from "./MainRolesGraphContentStudents";
import { IRoleHistory, TRolesDate } from "./RolesMain";

interface IContainer {
  isAddStudent?: boolean;
  isHover?: boolean;
}

const Container = styled.div<IContainer>`
  display: grid;
  grid-template-columns: ${(props) => (props.isAddStudent ? "1fr 3fr 1.5fr" : "1fr 3fr")};
  column-gap: 2px;
  column-gap: 0.126rem;
  input,
  .selected-box {
    background-color: ${(props) => (props.isHover ? props.theme.blurColor : props.theme.originBgColor)};
    transition: ${(props) => (props.isHover ? "background-color 0.1s ease" : "background-color 1s ease")};
    padding: 14px;
    padding: 0.875rem;
    ::placeholder {
      opacity: 0.8;
    }
  }

  .left-contents {
    display: grid;
    grid-template-columns: 1fr auto;
    background-color: ${(props) => (props.isHover ? props.theme.blurColor : props.theme.originBgColor)};
    transition: ${(props) => (props.isHover ? "background-color 0.1s ease" : "background-color 1s ease")};
  }
`;

interface ISelecteBox {
  hasStudents: boolean;
}

const SelecteBox = styled.div<ISelecteBox>`
  cursor: ${(props) => !props.hasStudents && "pointer"};
`;

const SelecteStudentList = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

interface IProps {
  role?: string;
  work?: string;
  id?: number | string;
  students?: string[];
  isAddStudent?: boolean;
  savedStudents?: { studentName: string; _id: string }[];
  setUpdateWork?: React.Dispatch<React.SetStateAction<null | { type: string; id?: number }>>;

  roleHistories?: IRoleHistory[];
  setRoleHistories?: React.Dispatch<React.SetStateAction<IRoleHistory[] | undefined>>;
  doneRoleStudents?: undefined | string[];
  setDoneRoleStudents?: React.Dispatch<React.SetStateAction<undefined | string[]>>;
  recentDate?: undefined | TRolesDate;
}

const MainRolesGraphContents = ({
  role,
  work,
  id,
  savedStudents,
  roleHistories,
  setRoleHistories,
  doneRoleStudents,
  setDoneRoleStudents,
  recentDate,
}: IProps) => {
  return savedStudents ? (
    <Container isAddStudent={true}>
      <React.Fragment>
        <input value={role} readOnly />
        <input value={work} readOnly />
        <SelecteBox className="selected-box" hasStudents={true}>
          <div className="left-contents">
            <SelecteStudentList>
              <div>
                {savedStudents?.map(({ studentName, _id }) => {
                  return (
                    <MainRolesGraphContentStudents
                      key={_id}
                      studentName={studentName}
                      studentId={_id}
                      roleHistories={roleHistories}
                      setRoleHistories={setRoleHistories}
                      doneRoleStudents={doneRoleStudents}
                      setDoneRoleStudents={setDoneRoleStudents}
                      recentDate={recentDate}
                    />
                  );
                })}
              </div>
            </SelecteStudentList>
          </div>
        </SelecteBox>
      </React.Fragment>
    </Container>
  ) : (
    <div></div>
  );
};

export default MainRolesGraphContents;
