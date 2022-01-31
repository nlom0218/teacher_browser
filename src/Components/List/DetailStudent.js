import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_QUERY, SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import useMedia from '../../Hooks/useMedia';
import IcBookMark from '../../icons/Bookmark/IcBookMark';
import IcNameTable from '../../icons/NameTable/IcNameTable';
import IcNameTableClick from '../../icons/NameTable/IcNameTableClick';
import { IcStudent1 } from '../../icons/Students/IcStudents';
import routes from '../../routes';
import { customMedia } from '../../styles';
import DetailStudentAllergy from './DetailStudentAllergy';
import DetailStudentMemo from './DetailStudentMemo';
import DetailStudentNumber from './DetailStudentNumber';
import DetailStudentTag from './DetailStudentTag';
import InputUnderLine from './InputUnderLine';
import DeleteStudent from './Popup/DeleteStudent';
import StudentIcon from './Popup/StudentIcon';
import { DelBtn } from './styled/DelBtn';
import DetailEomjiIcon from './styled/DetailEomjiIcon';
import DetailNameContainer from './styled/DetailNameContainer';
import SettingEmojiIconBtn from './styled/SettingEmojiIconBtn';

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
`

const ListIcon = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-end;
  column-gap: 5px;
  column-gap: 0.3125rem;
  div {
    opacity: 0.6;
  }
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0))
  }
`

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
    column-gap: 10px;
    column-gap: 0.625rem;
    margin-top: 20px;
    margin-top: 1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
    margin-top: 0;
  `}
`

const Name = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
    font-size: 1.75em;
    font-size: 1.75rem;
  `}
`

const SubmitInput = styled.input`
  grid-column: 1 / -1;
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
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
`

const ErrMsg = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  font-weight: 600;
`

const DetailStudent = ({ studentId, selectedSort, selectedTag }) => {
  const isPopup = useReactiveVar(isPopupVar)
  const media = useMedia()

  const [IconsLIstisHover, setIconListIsHover] = useState(false)
  const [studentInfo, setStudentInfo] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)
  const [studentIcon, setStudentIcon] = useState(null)

  const [seeSettingBtn, setSeeSettingBtn] = useState(false)

  const { data, loading } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId
    }
  })

  const onMouseEnterName = () => setSeeSettingBtn(true)
  const onMouseLeaveName = () => setSeeSettingBtn(false)

  const onClickStudentIconBtn = () => {
    inPopup("studentIcon")
  }

  const onCompleted = (result) => {
    const { editStudent: { ok, error } } = result
    if (error) {
      setErrMsg(error)
      return
    }
    if (ok) {
      setIsEdit(false)
    }
  }
  const [editStudent, { loading: editLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{
      query: SEE_ALL_STUDENT_QUERY,
      variables: {
        ...(selectedTag.length !== 0 && { tag: selectedTag }),
        ...(selectedSort && { sort: selectedSort }),
        trash: false
      }
    }]
  })
  const { register, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { newStudentName } = data
    if (newStudentName === studentInfo.studentName) {
      setIsEdit(false)
      return
    }
    if (editLoading) {
      return
    }
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId,
        studentName: newStudentName
      }
    })
  }

  // form 영역 밖을 클릭 했을 때도 listName이 바뀌게 설정
  const onBlurForm = () => {
    const newStudentName = getValues("newStudentName")
    onSubmit({ newStudentName })
  }

  const onClickName = () => {
    setIsEdit(true)
  }

  const onClicketeBtn = () => inPopup("deleteStudent")

  useEffect(() => {
    if (data) {
      setValue("newStudentName", data?.seeAllStudent[0]?.studentName)
      setStudentInfo(data?.seeAllStudent[0])
      setStudentIcon(data?.seeAllStudent[0].studentIcon)
    }
  }, [data])
  return (<Container>
    <Link to={routes.list} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
      <ListIcon>{IconsLIstisHover ? <IcNameTableClick /> : <IcNameTable />}
        <div>명렬표로 이동</div>
      </ListIcon>
    </Link>
    <DetailNameContainer onMouseEnter={onMouseEnterName} onMouseLeave={onMouseLeaveName}>
      <form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
        {studentIcon && <DetailEomjiIcon onClick={onClickStudentIconBtn}>
          <IcStudent1 />
        </DetailEomjiIcon>}
        <InputUnderLine isEdit={isEdit}>
          <Name
            {...register("newStudentName", {
              required: true,
              onChange: () => {
                setErrMsg(undefined)
                setIsEdit(true)
              }
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
      {seeSettingBtn &&
        (media === "Desktop" && <SettingEmojiIconBtn>
          {studentIcon ?
            <div>아이콘 삭제</div>
            :
            <div onClick={onClickStudentIconBtn}>아이콘 추가</div>}
        </SettingEmojiIconBtn>)
      }
      {media !== "Desktop" && <SettingEmojiIconBtn>
        {studentIcon ?
          <div>아이콘 삭제</div>
          :
          <div onClick={onClickStudentIconBtn}>아이콘 추가</div>}
      </SettingEmojiIconBtn>}
    </DetailNameContainer>
    <DetailStudentNumber studentInfo={studentInfo} selectedTag={selectedTag} selectedSort={selectedSort} />
    <DetailStudentTag studentInfo={studentInfo} selectedSort={selectedSort} selectedTag={selectedTag} />
    <DetailStudentAllergy studentInfo={studentInfo} />
    <DetailStudentMemo studentMemo={studentInfo?.memo} studentId={studentInfo?._id} teacherEmail={studentInfo?.teacherEmail} />
    <DelBtn onClick={onClicketeBtn}>휴지통으로 이동</DelBtn>
    {isPopup === "studentIcon" &&
      <StudentIcon />
    }
    {isPopup === "deleteStudent" && <DeleteStudent selectedTag={selectedTag} selectedSort={selectedSort} studentId={studentId} />}
  </Container>);
}

export default DetailStudent;