import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { TRecentRole } from "./RolesMain";

interface IContainer {
  isHover?: boolean;
}

const Container = styled.div<IContainer>`
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
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

const BtnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  justify-items: center;
  align-items: center;
  padding: 14px;
  padding: 0.875rem;
  svg {
    cursor: pointer;
  }
`;

interface ISelecteBox {
  hasStudents: boolean;
}

const SelecteBox = styled.div<ISelecteBox>`
  cursor: ${(props) => !props.hasStudents && "pointer"};
`;

interface ISelecteStudentList {
  savedStudents?: boolean;
}

const SelecteStudentList = styled.div<ISelecteStudentList>`
  display: grid;
  grid-template-columns: ${(props) => !props.savedStudents && "1fr auto"};
  column-gap: 10px;
  align-items: center;
  line-height: 140%;
`;

const ResetIcon = styled.div`
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.fontColor};
    transition: color 1s ease;
    display: flex;
  }
`;

const ClickMsg = styled.div`
  color: ${(props) => props.theme.blurFontColor};
  transition: background-color 1s ease, color 1s ease;
  line-height: 140%;
`;

type IRoles = {
  role: string;
  work: string;
  students: string[];
};

interface IProps {
  role?: string;
  work?: string;
  id?: number | string;
  students: string[];
  isAddStudent?: boolean;
  register?: UseFormRegister<FieldValues>;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
  setRecentRole: React.Dispatch<React.SetStateAction<undefined | TRecentRole[]>>;
}

const EditStudents = ({ role, work, id, register, students, setMsg, setRecentRole }: IProps) => {
  const [thisStudents, setThisStudents] = useState(students);
  const onClickSeleteStudent = () => {
    if (thisStudents?.length !== 0) return;
    localStorage.setItem("editRoleId", String(id));
    inPopup("editRoleStudent");
  };

  const onClickReset = () => {
    if (!students) return;
    setRecentRole((prev) => {
      return prev?.map((recentRole) => {
        if (recentRole._id === id) {
          return {
            ...recentRole,
            students: [],
          };
        }
        return recentRole;
      });
    });
    if (setMsg) setMsg("학생이 제거되었습니다.😁");
  };

  useEffect(() => {
    setThisStudents(students);
  }, [students]);

  return (
    <Container>
      <input value={role} readOnly />
      <input value={work} readOnly />
      <div className="left-contents">
        {register && (
          <SelecteBox
            hasStudents={thisStudents?.length !== 0}
            onClick={onClickSeleteStudent}
            className="selected-box"
            {...register(`student${id}`, { required: true })}
            placeholder="클릭하여 학생을 선택하세요."
          >
            {thisStudents?.length !== 0 ? (
              <SelecteStudentList>
                <div>
                  {thisStudents
                    ?.map((item) => {
                      return item.split(" ")[1];
                    })
                    .join(", ")}
                </div>
                <ResetIcon onClick={onClickReset}>
                  <MdOutlineRefresh />
                </ResetIcon>
              </SelecteStudentList>
            ) : (
              <ClickMsg>클릭하여 학생을 선택하세요.</ClickMsg>
            )}
          </SelecteBox>
        )}
      </div>
    </Container>
  );
};

export default EditStudents;
