import React, { useEffect, useRef, useState } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import styled from 'styled-components';
import { customMedia } from '../styles';
import { inputLine } from '../Animations/InputLine';
import { useForm } from 'react-hook-form';
import { BtnFadeIn } from '../Animations/Fade';
import IcNameTableClick from '../icons/NameTable/IcNameTableClick';
import IcNameTable from '../icons/NameTable/IcNameTable';
import { inPopup, isPopupVar } from '../apollo';
import { useQuery, useReactiveVar } from '@apollo/client';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../Graphql/StudentList/query';
import { useParams } from 'react-router-dom';
import StudentOrder from '../Components/Swap/StudentOrder';
import Shuffling from "../Components/Swap/Popup/Shuffling";
import StudentNumber from '../Components/Swap/Popup/StudentNumber';
import FontSizeBtn from '../Components/Swap/FontSizeBtn';
import useTitle from '../Hooks/useTitle';
import StudentList from '../Components/Shared/popup/StudentList';
import Loading from '../Components/Shared/Loading';
import AlertMessage from '../Components/Shared/AlertMessage';
import PrintOrder from '../Components/Order/PrintOrder';
import useMedia from '../Hooks/useMedia';
import PrintSwapContents from '../Components/Swap/Popup/PrintSwapContents';
import useMe from '../Hooks/useMe';
import NeedLoginPopupContainer from '../Components/Shared/NeedLoginPopupContainer';
import NoStudentMsg from '../Components/Shared/styled/NoStudentMsg';

const Container = styled.div`
  display : grid;
  grid-template-rows : auto auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const TopContents = styled.div`
  display : grid;  
  grid-template-columns : 1fr;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : center;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns : 1fr auto;
  column-gap : 20px;
  column-gap : 1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
  grid-template-columns : 1fr;
  column-gap: 60px;
  column-gap: 3.75rem;
  `}
`

const Title = styled.form`
  grid-row : 2 / 3;
  display : grid;
  grid-template-columns : 1fr auto;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
  ${customMedia.greaterThan("tablet")`
  grid-row: 1 / 2;
  `}
`

const Input = styled.input`
  width : 100%;
  font-size : 1.5em;
  font-size : 1.5rem;
  padding : 10px 0px;
  padding : 0.625rem 0rem;
`

const InputLayout = styled.div`
`

const LineBox = styled.div`
  position : relative;
`

const Line = styled.div`
  position : absolute;
  height : 2px;
  top : 0px;
  left : 50%;
  transform : translateX(-50%);
  background : ${props => props.theme.fontColor};
  opacity : 0.6;
  transition : background 1s ease, opacity 1s ease;
  animation : ${inputLine} 0.6s ease forwards;
`

const SubmitInput = styled.input`
  cursor : pointer;
  padding : 10px 30px ;
  padding : 0.625rem 1.875rem;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  border-radius : 5px;
  border-radius : 0.3125rem;
  animation : ${BtnFadeIn} 0.6s ease;
`
const ListName = styled.div`
`

const ListIcon = styled.div`
  grid-row : 1 / 2;
  justify-self : flex-end;
  display : grid;
  grid-template-columns : auto auto;
  column-gap : 10px;
  column-gap : 0.625rem;
  align-items : center;
  svg {
    display : flex;
    font-size : 2.5em;
    font-size : 2.5rem;
    cursor : pointer;
  }
`

const OptionContents = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns : auto auto 1fr auto;
   column-gap:20px;
   column-gap:1.25rem;
  `}
`;

const OptionBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const Swap = () => {
  const titleUpdataer = useTitle("티처캔 | 자리바꾸기")

  const { id } = useParams()
  const media = useMedia()

  const isPopup = useReactiveVar(isPopupVar);

  const me = useMe()

  const componentRef = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("자리바꾸기 제목");
  const [studentListName, setStudentListName] = useState(null);
  const [IconsLIstisHover, setIconListIsHover] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isShuffle, setIsShuffle] = useState("init");
  const [pickNum, setPickNum] = useState(6);
  const [fontSizeAll, setFontSizeAll] = useState(1.5);
  const [errMsg, setErrMsg] = useState(undefined)

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id
    },
    skip: !id
  });


  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "자리바꾸기 제목" },
  });

  const onClickInput = () => {
    setIsEdit(true)
  }

  const onSubmit = (data) => {
    const { title } = data
    setTitle(title)
    setIsEdit(false)
  }

  const onBlurForm = () => {
    const title = getValues("title")
    onSubmit({ title })
  };


  const onClickShuffleBtn = (type) => {
    setIsShuffle(type);
  };

  const onClickListIcon = () => {
    if (me) {
      inPopup("seeStudentList")
    } else {
      inPopup("needLogin")
    }
  }

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0]?.listName);
      //휴지통에 있는 학생은 filter로 거르기 
      setSelectedStudent(data?.seeStudentList[0]?.students.filter(item => !item.trash).map((item) => item.studentName));
    }
  }, [data]);

  return (<BasicContainer menuItem={true} screen="small">
    <Container pickNum={pickNum}>
      <TopContents>
        <Title onBlur={onBlurForm} onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <Input
              {...register("title", {
                required: true,
                onChange: () => setIsEdit(true)
              })}
              type="text"
              placeholder="제목을 입력하세요."
              autocomplete="off"
              onClick={onClickInput}
            />
            {isEdit && <LineBox>
              <Line></Line>
            </LineBox>}
          </InputLayout>
          {isEdit && <SubmitInput
            type="submit"
            value="저장"
          />}
        </Title>
        <ListIcon>
          <ListName>{studentListName ? studentListName : "선택된 명렬표가 없습니다."}</ListName>
          <div onClick={onClickListIcon} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
            {IconsLIstisHover ? <IcNameTableClick /> : <IcNameTable />}
          </div>
        </ListIcon>
      </TopContents>
      {loading ? <Loading page="subPage" /> :
        id && (selectedStudent.length === 0 ? <NoStudentMsg>명렬표에 학생이 없습니다. 😅 <br />명렬표에서 학생을 추가하세요!</NoStudentMsg> : (
          <React.Fragment>
            <OptionContents>
              <OptionBtn onClick={() => onClickShuffleBtn("pickNum")}> 자리 설정 </OptionBtn>
              {isShuffle === "init" && <OptionBtn onClick={() => onClickShuffleBtn("ing")}>순서 섞기</OptionBtn>}
              {isShuffle === "pickNum" && <OptionBtn onClick={() => onClickShuffleBtn("ing")}>순서 섞기</OptionBtn>}
              {isShuffle === "ing" && (
                <OptionBtn onClick={() => onClickShuffleBtn("finish")} isShuffling={true}>
                  섞는 중
                </OptionBtn>
              )}
              {isShuffle === "finish" && (
                <OptionBtn onClick={() => onClickShuffleBtn("ing")}>
                  다시 섞기
                </OptionBtn>
              )}
              {media === "Desktop" && <PrintOrder />}
              <FontSizeBtn
                setFontSizeAll={setFontSizeAll}
                fontSizeAll={fontSizeAll}
              />
            </OptionContents>
            <StudentOrder
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              isShuffle={isShuffle}
              setFontSizeAll={setFontSizeAll}
              fontSizeAll={fontSizeAll}
              pickNum={pickNum}
              setPickNum={setPickNum}
              studentNum={selectedStudent.length}
            />
          </React.Fragment>)
        )}
    </Container>
    {isPopup === "seeStudentList" && <StudentList page="swap" setIsShuffle={setIsShuffle} />}
    {isPopup === "print" && <PrintSwapContents printRef={componentRef} title={title} selectedStudent={selectedStudent} pickNum={pickNum} />}
    {isPopup === "needLogin" && <NeedLoginPopupContainer />}
    {isShuffle === "pickNum" && <StudentNumber
      pickNum={pickNum}
      setPickNum={setPickNum}
      onClickShuffleBtn={onClickShuffleBtn}
      setErrMsg={setErrMsg}
    />}
    {isShuffle === "ing" && <Shuffling onClickShuffleBtn={onClickShuffleBtn} />}
    {errMsg && <AlertMessage msg={errMsg} type="error" setMsg={setErrMsg} time={3000} />}
  </BasicContainer>);
};

export default Swap;