import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillMinusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
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
  position: relative;
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

const RemoveBtn = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  left: 10px;
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  cursor: pointer;
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

  const onClickRemoveBtn = () => {
    setRecentRole((prev) => {
      if (!prev) return prev;
      return prev.filter((item) => item._id !== id);
    });

    onClickReset(true);
  };

  const onClickReset = (isRemoveRole: boolean) => {
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

    if (isRemoveRole) {
      if (setMsg) setMsg(`${role} 역할이 제거되었습니다.😁`);
    } else {
      if (setMsg) setMsg("학생이 제거되었습니다.😁");
    }
  };

  useEffect(() => {
    setThisStudents(students);
  }, [students]);

  return (
    <Container>
      <RemoveBtn>
        <AiFillMinusCircle onClick={onClickRemoveBtn} />
      </RemoveBtn>
      {register && String(id).match(/new/) ? (
        <React.Fragment>
          <input
            onChange={(event) => {
              setRecentRole((prev) => {
                if (!prev) return;
                return prev.map((recentRole) => {
                  if (recentRole._id === id) {
                    return {
                      ...recentRole,
                      title: event.target.value,
                    };
                  }
                  return recentRole;
                });
              });
            }}
            placeholder={"역할을 입력하세요."}
            required={true}
          />
          <input
            onChange={(event) => {
              setRecentRole((prev) => {
                if (!prev) return;
                return prev.map((recentRole) => {
                  if (recentRole._id === id) {
                    return {
                      ...recentRole,
                      detail: event.target.value,
                    };
                  }
                  return recentRole;
                });
              });
            }}
            placeholder={"하는 일을 입력하세요."}
            required={true}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <input value={role} readOnly />
          <input value={work} readOnly />
        </React.Fragment>
      )}
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
                <ResetIcon
                  onClick={() => {
                    onClickReset(false);
                  }}
                >
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
