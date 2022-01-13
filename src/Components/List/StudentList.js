import { useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import styled from 'styled-components';
import { disableSeeStudent, inPopup, isPopupVar, isSeeStudentVar, enableSeeStudent } from '../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../Graphql/Student/query';
import { DivideRightContents, SeeRightContentsBtn } from '../Shared/styled/DivideContents';
import CreateStudent from './Popup/CreateStudent';
import SortTagBtn from './SortTagBtn';
import StudentItem from './StudentItem';

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

const StudentList = ({ setSomeDragging, studentId, meTag, selectedTag, seeNum, selectedSort, setDragType }) => {
  // 초기 로드 시 에니메이션 작동 안하게 하기
  const [initLoad, setInitLoad] = useState(true)

  const isSeeList = useReactiveVar(isSeeStudentVar)
  const [isSeedisplay, isSeeSetDisplay] = useState(isSeeList)

  const isPopup = useReactiveVar(isPopupVar)

  // studentArray => 복수생성할 때 이미 존재하는 학생들의 이름과 새롭게 생성하는 학생들의 이름을 비교하기 위한 배열
  // 중복생성을 막기 위함
  const [existStudentArray, setExistStudentArray] = useState(undefined)

  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag }),
      ...(selectedSort && { sort: selectedSort }),
      trash: false
    }
  })

  // 학생 생성을 위한 팝업창
  const onClickAddBtn = () => inPopup("createStudent")

  const onClickSeeBtn = () => {
    if (initLoad) {
      setInitLoad(false)
    }
    if (isSeeList) {
      disableSeeStudent()
      setTimeout(() => {
        isSeeSetDisplay(false)
      }, 1000)
    } else {
      enableSeeStudent()
      isSeeSetDisplay(true)
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
    <SeeRightContentsBtn onClick={onClickSeeBtn} isSeeList={isSeeList} initLoad={initLoad}>
      {isSeeList ? <FcNext /> : <FcPrevious />}
    </SeeRightContentsBtn>
    <DivideRightContents isSeeList={isSeeList} initLoad={initLoad} isSeedisplay={isSeedisplay}>
      <SortTagBtn meTag={meTag} />
      <SStudentList>
        {data?.seeAllStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          data?.seeAllStudent?.map((item, index) => {
            return <StudentItem key={index} item={item} setSomeDragging={setSomeDragging} studentId={studentId} seeNum={seeNum} setDragType={setDragType} />

          })}
      </SStudentList>
      <AddStudentBtn onClick={onClickAddBtn}>학생 생성하기</AddStudentBtn>
      {isPopup === "createStudent" &&
        <CreateStudent
          existStudentArray={existStudentArray}
          selectedTag={selectedTag}
          selectedSort={selectedSort}
        />}
    </DivideRightContents>
  </React.Fragment>
  );
}

export default StudentList;