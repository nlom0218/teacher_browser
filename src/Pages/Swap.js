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
import { compare } from "../shared"
import { FcSettings } from 'react-icons/fc';
import SwapDetailSetting from '../Components/Swap/Popup/SwapDetailSetting';

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
   grid-template-columns: auto 1fr auto;
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

const SettingBtn = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
`

const DetailSetting = styled.div`
  svg {
    display: flex;
    font-size: 1.75em;
    font-size: 1.75rem;
    cursor: pointer;
  }
`

const Swap = () => {
  const titleUpdataer = useTitle("????????? | ???????????????")

  const { id } = useParams()
  const media = useMedia()

  const isPopup = useReactiveVar(isPopupVar);

  const me = useMe()

  const componentRef = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("??????????????? ??????");
  const [studentListName, setStudentListName] = useState(null);
  const [IconsLIstisHover, setIconListIsHover] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isShuffle, setIsShuffle] = useState("init");
  const [fontSizeAll, setFontSizeAll] = useState(1.5);
  const [errMsg, setErrMsg] = useState(undefined)
  const [sort, setSort] = useState(undefined)
  const [hasNum, setHasNum] = useState(false)

  const [pickNum, setPickNum] = useState(6); // ??? ??? ?????? ?????? ?????? ???
  const [seatType, setSeatType] = useState(1) // 1: ????????????, 2: ??????. 3: ??????(2*2), 4: ??????(3*3)
  const [mateGender, setMateGender] = useState("random") // random, same, other

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id
    },
    skip: !id
  });


  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "??????????????? ??????" },
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

  const onClickDetailSetting = () => {
    inPopup("detailSetting")
  }

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0]?.listName);
      //???????????? ?????? ????????? filter??? ????????? 
      const newSelectedStudent = data?.seeStudentList[0]?.students
        .filter(item => !item.trash)
        .map((item) => {
          return { name: item.studentName, gender: item.studentGender, id: item._id }
        })
      setSelectedStudent(newSelectedStudent);

      const studentNum = data?.seeStudentList[0]?.students.filter(item => !item.trash).map((item) => item.studentNumber)
      if (studentNum.includes(null)) {
        setHasNum(false)
      } else {
        setHasNum(true)
      }
    }
  }, [data]);

  useEffect(() => {
    if (sort) {
      const newSelectedStudent = data?.seeStudentList[0]?.students
        .filter(item => !item.trash)
        .sort(compare(sort))
        .map((item) => {
          return { name: item.studentName, gender: item.studentGender, id: item._id }
        })
      setSelectedStudent(newSelectedStudent);
    }
  }, [sort])

  return (<BasicContainer menuItem={true}>
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
              placeholder="????????? ???????????????."
              autocomplete="off"
              onClick={onClickInput}
            />
            {isEdit && <LineBox>
              <Line></Line>
            </LineBox>}
          </InputLayout>
          {isEdit && <SubmitInput
            type="submit"
            value="??????"
          />}
        </Title>
        <ListIcon>
          <ListName>{studentListName ? studentListName : "????????? ???????????? ????????????."}</ListName>
          <div onClick={onClickListIcon} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
            {IconsLIstisHover ? <IcNameTableClick /> : <IcNameTable />}
          </div>
        </ListIcon>
      </TopContents>
      {loading ? <Loading page="subPage" /> :
        id && (selectedStudent.length === 0 ? <NoStudentMsg>???????????? ????????? ????????????. ???? <br />??????????????? ????????? ???????????????!</NoStudentMsg> : (
          <React.Fragment>
            <OptionContents>
              {/* <OptionBtn onClick={() => onClickShuffleBtn("pickNum")}>??? ??? ??????</OptionBtn> */}
              {isShuffle === "init" && <OptionBtn onClick={() => {
                onClickShuffleBtn("ing")
                setSort(undefined)
              }}>?????? ??????</OptionBtn>}
              {isShuffle === "pickNum" && <OptionBtn onClick={() => onClickShuffleBtn("ing")}>?????? ??????</OptionBtn>}
              {isShuffle === "ing" && (
                <OptionBtn onClick={() => onClickShuffleBtn("finish")} isShuffling={true}>
                  ?????? ???
                </OptionBtn>
              )}
              {isShuffle === "finish" && <OptionBtn onClick={() => {
                onClickShuffleBtn("ing")
                setSort(undefined)
              }}>?????? ??????</OptionBtn>}
              {media === "Desktop" && <PrintOrder />}
              <SettingBtn>
                <DetailSetting onClick={onClickDetailSetting}><FcSettings /></DetailSetting>
                <FontSizeBtn
                  setFontSizeAll={setFontSizeAll}
                  fontSizeAll={fontSizeAll}
                />
              </SettingBtn>
            </OptionContents>
            <StudentOrder
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              isShuffle={isShuffle}
              fontSizeAll={fontSizeAll}
              pickNum={pickNum}
              seatType={seatType}
              mateGender={mateGender}
            />
          </React.Fragment>)
        )}
    </Container>
    {isPopup === "seeStudentList" && <StudentList page="swap" setIsShuffle={setIsShuffle} />}
    {isPopup === "print" && <PrintSwapContents
      printRef={componentRef}
      title={title}
      selectedStudent={selectedStudent}
      pickNum={pickNum}
      seatType={seatType}
    />}
    {isPopup === "needLogin" && <NeedLoginPopupContainer />}
    {isPopup === "detailSetting" && <SwapDetailSetting
      setErrMsg={setErrMsg}
      pickNum={pickNum}
      setPickNum={setPickNum}
      seatType={seatType}
      setSeatType={setSeatType}
      mateGender={mateGender}
      setMateGender={setMateGender}
    />}
    {isShuffle === "pickNum" && <StudentNumber
      pickNum={pickNum}
      setPickNum={setPickNum}
      onClickShuffleBtn={onClickShuffleBtn}
      setErrMsg={setErrMsg}
    />}
    {isShuffle === "ing" && <Shuffling
      onClickShuffleBtn={onClickShuffleBtn}
      sort={sort}
      setSort={setSort}
      hasNum={hasNum}
      setErrMsg={setErrMsg} />}
    {errMsg && <AlertMessage msg={errMsg} type="error" setMsg={setErrMsg} time={3000} />}
  </BasicContainer>);
};

export default Swap;