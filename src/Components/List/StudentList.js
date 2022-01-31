import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import styled from 'styled-components';
import { disableSeeStudent, inPopup, isSeeStudentVar, enableSeeStudent } from '../../apollo';
import { DivideRightContents, SeeRightContentsBtn } from '../Shared/styled/DivideContents';
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

const StudentList = ({ setSomeDragging, studentId, meTag, seeNum, setDragType, allStudent, seeStudentIcon }) => {
  // 초기 로드 시 에니메이션 작동 안하게 하기
  const [initLoad, setInitLoad] = useState(true)

  const isSeeList = useReactiveVar(isSeeStudentVar)
  const [isSeedisplay, isSeeSetDisplay] = useState(isSeeList)

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

  return (<React.Fragment>
    <SeeRightContentsBtn onClick={onClickSeeBtn} isSeeList={isSeeList} initLoad={initLoad}>
      {isSeeList ? <FcNext /> : <FcPrevious />}
    </SeeRightContentsBtn>
    <DivideRightContents isSeeList={isSeeList} initLoad={initLoad} isSeedisplay={isSeedisplay}>
      <SStudentList>
        <SortTagBtn />
        {allStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          allStudent?.map((item, index) => {
            return <StudentItem key={index} item={item} setSomeDragging={setSomeDragging} studentId={studentId} seeNum={seeNum} setDragType={setDragType} seeStudentIcon={seeStudentIcon} />

          })}
      </SStudentList>
      <AddStudentBtn onClick={onClickAddBtn}>학생 생성하기</AddStudentBtn>
    </DivideRightContents>
  </React.Fragment>
  );
}

export default StudentList;