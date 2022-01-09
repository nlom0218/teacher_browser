import { useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import styled from 'styled-components';
import { FadeInBtn, FadeInList, FadeOutBtn, FadeOutList } from '../../Animations/StudentListAni';
import { disableSeeStudentList, inPopup, isPopupVar, isSeeStudentListVar, enableSeeStudentList } from '../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../Graphql/Student/query';
import { color } from '../../styles';
import CreateStudent from './Popup/CreateStudent';
import StudentSortTag from './Popup/StudentSortTag';
import SortTagBtn from './SortTagBtn';
import StudentItem from './StudentItem';

const SeeBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: ${props => props.isSeeStudentList ? "26%" : "1%"};
  animation: 1s ease forwards ${props => !props.initLoad && (props.isSeeStudentList ? FadeInBtn : FadeOutBtn)};
  padding: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  svg {
    display: flex; 
  }
`

const StudentContainer = styled.div`
  position: absolute;
  right: ${props => props.isSeeStudentList ? "1%" : "-24%"};
  animation: 1s ease forwards ${props => !props.initLoad && (props.isSeeStudentList ? FadeInList : FadeOutList)};
  top: 2%;
  width: 24%;
  height: 96%;
  min-height: 96%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
`

const SStudentList = styled.div`
  max-height: 100%;
  align-self: flex-start;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  row-gap: 5px;
  row-gap: 0.3125rem;
  .noStudnet {
    text-align: center;
    color: ${props => props.theme.redColor};
    transition: color 1s ease;
  }
`

const AddStudentBtn = styled.div`
  justify-self: center;
  cursor: pointer;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  transition: background-color 1s ease, color 1s ease;
`

const StudentList = ({ setSomeDragging, studentId, meTag, selectedTag }) => {
  // 초기 로드 시 에니메이션 작동 안하게 하기
  const [initLoad, setInitLoad] = useState(true)

  const isSeeStudentList = useReactiveVar(isSeeStudentListVar)

  const isPopup = useReactiveVar(isPopupVar)

  // studentArray => 복수생성할 때 이미 존재하는 학생들의 이름과 새롭게 생성하는 학생들의 이름을 비교하기 위한 배열
  // 중복생성을 막기 위함
  const [existStudentArray, setExistStudentArray] = useState(undefined)

  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag })
    }
  })

  // 학생 생성을 위한 팝업창
  const onClickAddBtn = () => inPopup("createStudent")

  const onClickSeeBtn = () => {
    if (initLoad) {
      setInitLoad(false)
    }
    if (isSeeStudentList) {
      disableSeeStudentList()
    } else {
      enableSeeStudentList()
    }
  }

  // 학생 정보가 불러와지면 existStudentArray 값 생성
  useEffect(() => {
    if (data) {
      const newExistStudentArray = data?.seeAllStudent.map((item) => item.studentName)
      setExistStudentArray(newExistStudentArray)
    }
  }, [data])

  return (<React.Fragment>
    <SeeBtn onClick={onClickSeeBtn} isSeeStudentList={isSeeStudentList} initLoad={initLoad}>
      {isSeeStudentList ? <FcNext /> : <FcPrevious />}
    </SeeBtn>
    <StudentContainer isSeeStudentList={isSeeStudentList} initLoad={initLoad}>
      <SortTagBtn meTag={meTag} />
      <SStudentList>
        {data?.seeAllStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          data?.seeAllStudent?.map((item, index) => {
            return <StudentItem key={index} item={item} setSomeDragging={setSomeDragging} studentId={studentId} />

          })}
      </SStudentList>
      <AddStudentBtn onClick={onClickAddBtn}>학생 생성하기</AddStudentBtn>
      {isPopup === "createStudent" && <CreateStudent existStudentArray={existStudentArray} />}
    </StudentContainer>
  </React.Fragment>
  );
}

export default StudentList;