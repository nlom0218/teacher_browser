import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import SetEmoji from "./Popup/SetEmoji";
import StudentInList from "./StudentInList";
import { BtnFadeIn } from "../../Animations/Fade";
import { customMedia } from "../../styles";
import AddStudentBox from "./AddStudentBox";
import InputUnderLine from "./InputUnderLine";
import {
  SEE_ALL_STUDENT_LIST_QUERY,
  SEE_ONE_STUDENT_LIST_QUERY,
} from "../../Graphql/StudentList/query";
import { EDIT_STUDENT_LIST } from "../../Graphql/StudentList/mutation";
import useMedia from "../../Hooks/useMedia";
import DeleteList from "./Popup/DeleteList";
import { DelBtn } from "./styled/DelBtn";
import DetailNameContainer from "./styled/DetailNameContainer";
import DetailEomjiIcon from "./styled/DetailEomjiIcon";
import SettingEmojiIconBtn from "./styled/SettingEmojiIconBtn";
import Loading from "../Shared/Loading";
import PrintList from "./PrintList";
import PrintListContents from "./Popup/PrintListContents";
import { useSetRecoilState } from "recoil";
import { existStudentsInListAtom } from "../../atom";

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`;

const ListName = styled.input`
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
const DetailList = ({ listId, setSuccessMsg, setErrorMsg, someDragging }) => {
  const setExistStudentsInList = useSetRecoilState(existStudentsInListAtom);

  const isPopup = useReactiveVar(isPopupVar);
  const [teacherEmail, setTeacherEmail] = useState(undefined);
  const [listName, setListName] = useState(undefined);
  const [isEditName, setIsEditName] = useState(false);
  const [placeholder, setPlaceholder] = useState(undefined);
  const [errMsg, setErrMsg] = useState(undefined);
  const [sort, setSort] = useState("num");

  const media = useMedia();

  const [seeSettingBtn, setSeeSettingBtn] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  // ????????? ????????? ???????????? ??????
  const { data, loading, refetch } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId,
      sort,
    },
  });

  const onCompleted = (result) => {
    const {
      editStudentList: { ok, error },
    } = result;
    if (!ok) {
      setErrMsg(error);
    } else {
      setIsEditName(false);
      setErrMsg(undefined);
    }
  };

  // ????????? ?????????, ?????? ????????? ??????
  const [editStudentList, { loading: editLoading }] = useMutation(
    EDIT_STUDENT_LIST,
    {
      onCompleted,
      refetchQueries: [
        { query: SEE_ONE_STUDENT_LIST_QUERY, variables: { listId } },
        { query: SEE_ALL_STUDENT_LIST_QUERY },
      ],
    }
  );

  const { register, setValue, handleSubmit, setFocus, getValues } = useForm({
    mode: "onChange",
  });

  const onClickEmojiBtn = () => inPopup("emoji");
  const onClickEmojiDelBtn = () => {
    setChosenEmoji(null);
    if (editLoading) {
      return;
    }
    editStudentList({
      variables: {
        teacherEmail,
        listId,
        listIcon: "delete",
      },
    });
  };
  const onClickListName = () => {
    setIsEditName(true);
    setFocus("name");
  };

  const onMouseEnterName = () => setSeeSettingBtn(true);
  const onMouseLeaveName = () => setSeeSettingBtn(false);

  const onSubmit = (data) => {
    const { name } = data;
    if (name === listName) {
      setIsEditName(false);
      return;
    }
    if (name.length < 2 || name.length > 11) {
      setErrMsg("???????????? ????????? 2~10??? ????????? ???????????????.");
      return;
    }
    if (editLoading) {
      return;
    }
    editStudentList({
      variables: {
        teacherEmail,
        listId,
        listName: name,
      },
    });
  };

  // form ?????? ?????? ?????? ?????? ?????? listName??? ????????? ??????
  const onBlurName = () => {
    const name = getValues("name");
    onSubmit({ name });
  };

  const onClickDeleteListBtn = () => {
    inPopup("deleteList");
  };
  const componentRef = useRef(null);

  // ????????? ????????? ????????? ??? ???????????? ?????? ??? ????????????
  useEffect(() => {
    if (data) {
      setChosenEmoji(data?.seeStudentList[0].listIcon);
      setTeacherEmail(data?.seeStudentList[0].teacherEmail);
      setListName(data?.seeStudentList[0].listName);
      setValue("name", data?.seeStudentList[0].listName);
      setPlaceholder("????????? ????????? ???????????????.");
      setExistStudentsInList(data?.seeStudentList[0]?.students);
      // setExistStudentsInList(data?.seeStudentList[0]?.students);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <Loading page="subPage" />;
  }
  localStorage.setItem("listName", JSON.stringify(listName));

  return (
    <Container>
      <DetailNameContainer
        onMouseEnter={onMouseEnterName}
        onMouseLeave={onMouseLeaveName}
      >
        <form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurName}>
          {chosenEmoji && (
            <DetailEomjiIcon onClick={onClickEmojiBtn}>
              {chosenEmoji}
            </DetailEomjiIcon>
          )}
          <InputUnderLine isEdit={isEditName}>
            <ListName
              {...register("name", {
                required: true,
                onChange: () => {
                  setErrMsg(undefined);
                  setIsEditName(true);
                },
              })}
              placeholder={placeholder}
              autoComplete="off"
              maxLength="10"
              onClick={onClickListName}
            />{" "}
          </InputUnderLine>
          {!isEditName && media === "Desktop" && <PrintList />}

          {isEditName && <SubmitInput type="submit" value="??????" />}
        </form>

        {seeSettingBtn && media === "Desktop" && (
          <SettingEmojiIconBtn>
            {chosenEmoji ? (
              <div onClick={onClickEmojiDelBtn}>????????? ??????</div>
            ) : (
              <div onClick={onClickEmojiBtn}>????????? ??????</div>
            )}
          </SettingEmojiIconBtn>
        )}
        {media !== "Desktop" && (
          <SettingEmojiIconBtn>
            {chosenEmoji ? (
              <div onClick={onClickEmojiDelBtn}>????????? ??????</div>
            ) : (
              <div onClick={onClickEmojiBtn}>????????? ??????</div>
            )}
          </SettingEmojiIconBtn>
        )}
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      </DetailNameContainer>
      {data?.seeStudentList[0]?.students && (
        <StudentInList
          students={data?.seeStudentList[0]?.students.filter(
            (item) => !item.trash
          )}
          listId={listId}
          setSort={setSort}
          sort={sort}
          setSuccessMsg={setSuccessMsg}
          listName={listName}
        />
      )}
      {!loading && (
        <AddStudentBox
          listId={listId}
          listName={listName}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
          someDragging={someDragging}
          inStudent={data?.seeStudentList[0]?.students}
        />
      )}
      {!loading && (
        <DelBtn onClick={onClickDeleteListBtn}>????????? ????????????</DelBtn>
      )}
      {isPopup === "emoji" && (
        <SetEmoji
          setChosenEmoji={setChosenEmoji}
          teacherEmail={data?.seeStudentList[0].teacherEmail}
          listId={data?.seeStudentList[0].listId}
          editStudentList={editStudentList}
          loading={editLoading}
        />
      )}
      {isPopup === "deleteList" && <DeleteList listId={listId} />}
      {isPopup === "printList" && (
        <PrintListContents
          printRef={componentRef}
          studentList={data?.seeStudentList[0]?.students.filter(
            (item) => !item.trash
          )}
        />
      )}
    </Container>
  );
};

export default DetailList;
