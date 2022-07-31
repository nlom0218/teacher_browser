import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BtnFadeIn } from "../../Animations/Fade";
import { inPopup, isPopupVar } from "../../apollo";
import { EDIT_STUDENT_MUTATION } from "../../Graphql/Student/mutation";
import { SEE_ALL_STUDENT_QUERY, SEE_ONE_STUDENT_QUERY } from "../../Graphql/Student/query";
import useMedia from "../../Hooks/useMedia";
import IcJournal from "../../icons/Journal/IcJournal";
import IcNameTable from "../../icons/NameTable/IcNameTable";
import routes from "../../routes";
import { processStudentIcon } from "../../shared";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import DetailStudentAllergy from "./DetailStudentAllergy";
import DetailStudentMemo from "./DetailStudentMemo";
import DetailStudentNumber from "./DetailStudentNumber";
import DetailStudentTag from "./DetailStudentTag";
import InputUnderLine from "./InputUnderLine";
import DeleteStudent from "./Popup/DeleteStudent";
import StudentIcon from "./Popup/StudentIcon";
import { DelBtn } from "./styled/DelBtn";
import DetailEomjiIcon from "./styled/DetailEomjiIcon";
import DetailNameContainer from "./styled/DetailNameContainer";
import SettingEmojiIconBtn from "./styled/SettingEmojiIconBtn";

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  a {
    justify-self: flex-start;
  }
`;

const LinkContainer = styled.div`
  justify-self: flex-start;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: auto auto;
  `}
`;

const ListIcon = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-end;
  column-gap: 5px;
  column-gap: 0.3125rem;
  div {
    opacity: 0.6;
    :hover {
      opacity: 1;
      font-weight: 600;
      transition: opacity 0.6s ease;
    }
  }
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
`;

const Name = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
    font-size: 1.75em;
    font-size: 1.75rem;
  `}
`;

const SubmitInput = styled.input`
  grid-column: 1 / -1;
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  animation: ${BtnFadeIn} 0.6s ease forwards;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
    grid-column: -2 / -1;
    margin-left: 30px;
    margin-left: 1.875rem;
  `}
`;

const ErrMsg = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  text-align: center;
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
`;

const DetailStudent = ({ studentId, selectedSort, selectedTag, setSuccessMsg, setErrorMsg }) => {
  const isPopup = useReactiveVar(isPopupVar);
  const media = useMedia();

  const [studentInfo, setStudentInfo] = useState(undefined);
  const [errMsg, setErrMsg] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  const [studentIcon, setStudentIcon] = useState(null);

  const [seeSettingBtn, setSeeSettingBtn] = useState(false);

  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const { data, loading } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId,
    },
  });

  const onMouseEnterName = () => setSeeSettingBtn(true);
  const onMouseLeaveName = () => setSeeSettingBtn(false);

  const onCompleted = (result) => {
    const {
      editStudent: { ok, error },
    } = result;
    if (error) {
      setErrorMsg(error);
      setIsEdit(false);
      setValue("newStudentName", data?.seeAllStudent[0]?.studentName);
      return;
    }
    if (ok) {
      setSuccessMsg("학생의 이름 또는 아이콘이 수정되었습니다. 😀");
      setIsEdit(false);
    }
  };
  const [editStudent, { loading: editLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: SEE_ALL_STUDENT_QUERY,
        variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false,
        },
      },
    ],
  });

  const onClickStudentIconBtn = () => {
    inPopup("studentIcon");
  };
  const onClickDelStudentIconBtn = () => {
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId,
        studentIcon: "delete",
      },
    });
    setStudentIcon(null);
  };

  const onSubmit = (data) => {
    const { newStudentName } = data;
    if (newStudentName === studentInfo.studentName) {
      setIsEdit(false);
      return;
    }
    if (editLoading) {
      return;
    }
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId,
        studentName: newStudentName,
      },
    });
  };

  // form 영역 밖을 클릭 했을 때도 listName이 바뀌게 설정
  const onBlurForm = () => {
    const newStudentName = getValues("newStudentName");
    onSubmit({ newStudentName });
  };

  const onClickName = () => {
    setIsEdit(true);
  };

  const onClicketeBtn = () => inPopup("deleteStudent");

  useEffect(() => {
    if (data) {
      setValue("newStudentName", data?.seeAllStudent[0]?.studentName);
      setStudentInfo(data?.seeAllStudent[0]);
      setStudentIcon(data?.seeAllStudent[0].icon);
    }
  }, [data]);

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <Container>
      <LinkContainer>
        <Link to={routes.list}>
          <ListIcon>
            <IcNameTable />
            <div>명렬표로 이동</div>
          </ListIcon>
        </Link>
        <Link to={`${routes.journal}/student/${studentId}`}>
          <ListIcon>
            <IcJournal />
            <div>학급일지로 이동</div>
          </ListIcon>
        </Link>
      </LinkContainer>
      <DetailNameContainer onMouseEnter={onMouseEnterName} onMouseLeave={onMouseLeaveName}>
        <form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
          {studentIcon && (
            <DetailEomjiIcon onClick={onClickStudentIconBtn}>
              <div className="student_detail_studentIcon">{processStudentIcon(studentIcon)}</div>
            </DetailEomjiIcon>
          )}
          <InputUnderLine isEdit={isEdit}>
            <Name
              {...register("newStudentName", {
                required: true,
                onChange: () => {
                  setErrMsg(undefined);
                  setIsEdit(true);
                },
              })}
              type="text"
              autoComplete="off"
              placeholder="학생 이름을 입력하세요."
              maxLength="12"
              onClick={onClickName}
            />
          </InputUnderLine>
          {isEdit && <SubmitInput type="submit" value="수정" />}
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </form>
        {seeSettingBtn && media === "Desktop" && (
          <SettingEmojiIconBtn>
            {studentIcon ? (
              <div onClick={onClickDelStudentIconBtn}>아이콘 삭제</div>
            ) : (
              <div onClick={onClickStudentIconBtn}>아이콘 추가</div>
            )}
          </SettingEmojiIconBtn>
        )}
        {media !== "Desktop" && (
          <SettingEmojiIconBtn>
            {studentIcon ? (
              <div onClick={onClickDelStudentIconBtn}>아이콘 삭제</div>
            ) : (
              <div onClick={onClickStudentIconBtn}>아이콘 추가</div>
            )}
          </SettingEmojiIconBtn>
        )}
      </DetailNameContainer>
      <DetailStudentNumber
        studentInfo={studentInfo}
        selectedTag={selectedTag}
        selectedSort={selectedSort}
        setSuccessMsg={setSuccessMsg}
      />
      <DetailStudentTag
        studentInfo={studentInfo}
        selectedSort={selectedSort}
        selectedTag={selectedTag}
        setSuccessMsg={setSuccessMsg}
      />
      <DetailStudentAllergy studentInfo={studentInfo} setSuccessMsg={setSuccessMsg} />
      <DetailStudentMemo
        studentMemo={studentInfo?.memo}
        studentId={studentInfo?._id}
        teacherEmail={studentInfo?.teacherEmail}
        setSuccessMsg={setSuccessMsg}
      />
      <DelBtn onClick={onClicketeBtn}>휴지통으로 이동</DelBtn>
      {isPopup === "studentIcon" && (
        <StudentIcon
          editStudent={editStudent}
          studentId={studentId}
          teacherEmail={studentInfo?.teacherEmail}
          setStudentIcon={setStudentIcon}
        />
      )}
      {isPopup === "deleteStudent" && (
        <DeleteStudent selectedTag={selectedTag} selectedSort={selectedSort} studentId={studentId} />
      )}
      {loading && <Loading page="center" />}
    </Container>
  );
};

export default DetailStudent;
