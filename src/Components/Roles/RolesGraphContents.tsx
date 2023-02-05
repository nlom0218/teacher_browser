import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";
import styled from "styled-components";
import { inPopup } from "../../apollo";

interface IContainer {
  isAddStudent?: boolean;
}

const Container = styled.div<IContainer>`
  display: grid;
  grid-template-columns: ${(props) => (props.isAddStudent ? "1fr 3fr 1.5fr" : "1fr 3fr")};
  column-gap: 2px;
  column-gap: 0.126rem;
  input,
  .selected-box {
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
    ::placeholder {
      opacity: 0.8;
    }
  }

  .left-contents {
    display: grid;
    grid-template-columns: 1fr auto;
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
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

const SelecteStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
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
  id?: number;
  idx: number;
  students?: string[];
  isAddStudent?: boolean;
  savedRole?: string;
  savedWork?: string;
  register: UseFormRegister<FieldValues>;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
  setUpdateWork?: React.Dispatch<React.SetStateAction<null | { type: string; id?: number }>>;
}

const RolesGraphContents = ({
  role,
  work,
  id,
  idx,
  register,
  isAddStudent = false,
  students = [],
  setMsg,
  savedRole,
  savedWork,
  setUpdateWork,
}: IProps) => {
  const onClickUpdateBtn = (type: string) => {
    if (!setUpdateWork) return;
    setUpdateWork({ type, id });
  };

  // const [thisStudents, setThisStudents] = useState(students);
  // const onClickSeleteStudent = () => {
  //   if (thisStudents?.length !== 0) return;
  //   inPopup("rolesSeleteStudent");
  //   if (role) localStorage.setItem("selectedRole", role);
  // };

  // const onClickReset = () => {
  //   if (!students) return;
  //   const roleDetails = JSON.parse(localStorage.getItem("roleDetails") || "{}");
  //   const newRoleDetails = {
  //     ...roleDetails,
  //     roles: roleDetails.roles.map((item: IRoles) => {
  //       if (item.role !== role) return item;
  //       return { ...item, students: [] };
  //     }),
  //   };
  //   setThisStudents([]);
  //   if (setMsg) setMsg("학생이 제거되었습니다.😁");
  //   localStorage.setItem("roleDetails", JSON.stringify(newRoleDetails));
  // };

  // useEffect(() => {
  //   setThisStudents(students);
  // }, [students]);

  return (
    <Container isAddStudent={isAddStudent}>
      {!isAddStudent && (
        <React.Fragment>
          <input
            type="text"
            {...register(`role${id}`, { required: true })}
            placeholder={role || "역할을 입력하세요."}
            autoComplete="off"
            defaultValue={role && role}
          />
          <div className="left-contents">
            <input
              type="text"
              {...register(`work${id}`, { required: true })}
              placeholder={work || "하는 일을 입력하세요."}
              autoComplete="off"
              defaultValue={work && work}
            />
            <BtnLayout>
              <AiOutlinePlusCircle onClick={() => onClickUpdateBtn("add")} />
              <AiOutlineMinusCircle onClick={() => onClickUpdateBtn("remove")} />
            </BtnLayout>
          </div>
        </React.Fragment>
      )}
      {/* {isAddStudent && (
        <React.Fragment>
          <input value={role} readOnly />
          <input value={work} readOnly />
          <SelecteBox
            hasStudents={thisStudents?.length !== 0}
            onClick={onClickSeleteStudent}
            className="selected-box"
            {...register(`student${idx}`, { required: true })}
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
        </React.Fragment>
      )} */}
    </Container>
  );
};

export default RolesGraphContents;
