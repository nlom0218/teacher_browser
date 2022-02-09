import BasicContainer from '../Components/Shared/BasicContainer';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { inPopup, isPopupVar, isSeeStudentListVar } from '../apollo';
import { useQuery, useReactiveVar } from '@apollo/client';
import StudentList from '../Components/Draw/Popup/StudentList';
import { FcContacts } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import useMedia from '../Hooks/useMedia';
import { customMedia } from '../styles';
import { inputLine } from '../Animations/InputLine';
import { BtnFadeIn } from '../Animations/Fade';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../Graphql/StudentList/query';
import StudentOrder from '../Components/Draw/StudentOrder';
import FontSizeBtn from '../Components/Draw/FontSizeBtn';
import Shuffling from '../Components/Draw/Popup/Shuffling';
import IcNameTableClick from '../icons/NameTable/IcNameTableClick';
import IcNameTable from '../icons/NameTable/IcNameTable';

const Container = styled.div`
  min-height : ${props => props.seeResultType === "ONE" && "100%"};
  min-height : ${props => props.isShuffle === "finish" && (props.pickNum < 4 && "100%")};
  display : grid;
  grid-template-rows : auto auto 1fr;
  padding: 40px;
  padding: 2.5rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : flex-start;
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

const OptionContents = styled.div`
  width : 100%;
  display : grid;
  row-gap : 20px;
  row-gap : 1.25 rem;
  text-align : center;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns : auto 1fr;
    column-gap : 20px;
    column-gap : 1.25rem;
  `}
`
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

const ListName = styled.div`
`



const Draw = () => {
  const { id } = useParams()
  const media = useMedia()
  const isPopup = useReactiveVar(isPopupVar);
  const isSeeList = useReactiveVar(isSeeStudentListVar);

  const [IconsLIstisHover, setIconListIsHover] = useState(false)
  const [studentListName, setStudentListName] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [seeResultType, setSeeResultType] = useState("ALL");
  const [fontSizeAll, setFontSizeAll] = useState(1.5);
  const [fontSizeOne, setFontSizeOne] = useState(2);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(undefined);
  const [isShuffle, setIsShuffle] = useState("init");

  // 뽑을 때 필요한 state 값
  const [pickNum, setPickNum] = useState(1);
  const [pickType, setPickType] = useState("see");


  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id
    },
    skip: !id
  });

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "랜덤뽑기 제목" },
  });

  const onClickListIcon = () => inPopup("seeStudentList")
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
  }

  const onClickShuffleBtn = (type) => {
    setIsShuffle(type);
  }

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0]?.listName);
      setSelectedStudent(data?.seeStudentList[0]?.students
        .filter(item => !item.trash)
        .map((item) => item.studentName));
    }
  }, [data])

  return (
    <BasicContainer menuItem={true} screen="small">
      <Container isShuffle={isShuffle} seeResultType={seeResultType} pickNum={pickNum}>
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
        {id && (
          <React.Fragment>
            <OptionContents>
              {isShuffle === "init" &&
                <OptionBtn onClick={() => onClickShuffleBtn("ing")}>뽑기</OptionBtn>}
              {isShuffle === "ing" &&
                <OptionBtn onClick={() => onClickShuffleBtn("finish")}>뽑는 중</OptionBtn>}
              {isShuffle === "finish" &&
                <OptionBtn onClick={() => onClickShuffleBtn("ing")}>다시 뽑기 </OptionBtn>}
              {/* <SeeResultType seeResultType={seeResultType} setSeeResultType={setSeeResultType} /> */}
              <FontSizeBtn
                setFontSizeAll={setFontSizeAll}
                fontSizeAll={fontSizeAll}
                setFontSizeOne={setFontSizeOne}
                fontSizeOne={fontSizeOne}
                seeResultType={seeResultType}
              />
            </OptionContents>
            <StudentOrder
              isShuffle={isShuffle}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              seeResultType={seeResultType}
              fontSizeAll={fontSizeAll}
              fontSizeOne={fontSizeOne}
              pickNum={pickNum}
              pickType={pickType} />
          </React.Fragment>
        )}
      </Container>
      {isPopup === "seeStudentList" && <StudentList />}
      {isShuffle === "ing" &&
        <Shuffling
          pickNum={pickNum}
          setPickNum={setPickNum}
          pickType={pickType}
          setPickType={setPickType}
          studentNum={selectedStudent.length}
          setIsShuffle={setIsShuffle}
        />
      }
    </BasicContainer>
  );
};

export default Draw;

{/* <div style={style}>
      <input
        type="text"
        name="name"
        placeholder="이름입력"
        style={{width: "500px"}}
        onChange={onDataChange}
        value={name}
      />
      &nbsp;&nbsp;
      <button onClick={onCreate}>추가</button>
    </div> */}