import React, { useState, useEffect, useRef } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { useQuery, useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../apollo";
import { useParams } from "react-router-dom";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../Graphql/StudentList/query";
import { customMedia } from "../styles";
import { inputLine } from "../Animations/InputLine";
import { BtnFadeIn } from "../Animations/Fade";
import { useForm } from "react-hook-form";
import Shuffling from "../Components/Order/Popup/Shuffling";
import SeeResultType from "../Components/Order/SeeResultType";
import FontSizeBtn from "../Components/Order/FontSizeBtn";
import StudentOrder from "../Components/Order/StudentOrder";
import PrintOrder from "../Components/Order/PrintOrder";
import PrintOrderContents from "../Components/Order/Popup/PrintOrderContents";
import useMedia from "../Hooks/useMedia";
import IcNameTableClick from "../icons/NameTable/IcNameTableClick";
import IcNameTable from "../icons/NameTable/IcNameTable";
import useTitle from "../Hooks/useTitle";
import StudentList from "../Components/Shared/popup/StudentList";


// 전체 틀
const Container = styled.div`
  min-height: ${props => props.seeResultType === "ONE" && "100%"};
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 40px;
  padding: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
`;
// 상단
const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns: 1fr auto;
   column-gap:20px;
   column-gap:1.25rem;
  `}
   /* padding : 20px 20px 0px 0px;
    padding : 1.25rem 1.25rem 0rem 0rem; */
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-row: 1/-1;
  align-items: center;
`;

//제목
const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
   grid-row : 1/2;
  `}
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`;

const InputLayout = styled.div``;

const LineBox = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease;
`;
//순서섞기, All, One, 글씨크기조절
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

//명단 선택
const OptionBtn = styled.div`
  background-color: ${(props) => (props.isShuffling ? props.theme.redColor : props.theme.btnBgColor)};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
// 조건 선택

//명단 아이콘
const ListIcon = styled.div`
  grid-row: 1/2;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 2.5em;
    font-size: 2.5rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0))
  }
`;

const ListName = styled.div``;
//추가 기능 (프린트)

const Order = () => {
  const titleUpdataer = useTitle("티처캔 | 순서정하기")
  const { id } = useParams();
  const isPopup = useReactiveVar(isPopupVar);
  const media = useMedia()

  const componentRef = useRef(null);

  const [IconsLIstisHover, setIconListIsHover] = useState(false)
  const [studentListName, setStudentListName] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isShuffle, setIsShuffle] = useState("init");
  const [seeResultType, setSeeResultType] = useState("ALL");
  const [fontSizeAll, setFontSizeAll] = useState(1.5)
  const [fontSizeOne, setFontSizeOne] = useState(5)
  const [isEdit, setIsEdit] = useState(false);
  //title : 인쇄할 때 필요한 제목
  const [title, setTitle] = useState("순서 정하기 제목");

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "순서 정하기 제목" },
  });
  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: id },
    skip: !id,
  });

  const onClickListIcon = () => inPopup("seeStudentList");
  const onClickInput = () => {
    setIsEdit(true);
  };

  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit({ title });
  };

  const onClickShuffleBtn = (type) => {
    setIsShuffle(type);
  };

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0]?.listName);
      //휴지통에 있는 학생은 filter로 거르기 
      setSelectedStudent(data?.seeStudentList[0]?.students.filter(item => !item.trash).map((item) => item.studentName));
    }
  }, [data]);
  return (
    <BasicContainer menuItem={true} screen="small">
      <Container seeResultType={seeResultType}>
        <TopContents>
          <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
            <InputLayout>
              <Input
                {...register("title", {
                  required: true,
                  onChange: () => setIsEdit(true),
                })}
                type="text"
                placeholder="제목을 입력하세요."
                autoComplete="off"
                onClick={onClickInput}
              />

              {isEdit && (
                <LineBox>
                  <Line></Line>
                </LineBox>
              )}
            </InputLayout>
            {isEdit && <SubmitInput type="submit" value="저장" />}
          </Title>
          <ListIcon>
            <ListName>{studentListName ? studentListName : "선택된 명렬표가 없습니다"}</ListName>
            <div onClick={onClickListIcon} onMouseEnter={() => setIconListIsHover(true)} onMouseLeave={() => setIconListIsHover(false)}>
              {IconsLIstisHover ? <IcNameTableClick /> : <IcNameTable />}
            </div>
          </ListIcon>
        </TopContents>
        {id && (
          <React.Fragment>
            <OptionContents>
              {isShuffle === "init" && <OptionBtn onClick={() => onClickShuffleBtn("ing")}>순서 섞기</OptionBtn>}

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
              <SeeResultType seeResultType={seeResultType} setSeeResultType={setSeeResultType} />
              {media === "Desktop" && <PrintOrder />}
              <FontSizeBtn seeResultType={seeResultType} setFontSizeAll={setFontSizeAll} fontSizeAll={fontSizeAll} fontSizeOne={fontSizeOne} setFontSizeOne={setFontSizeOne} />
            </OptionContents>
            <StudentOrder fontSizeOne={fontSizeOne} fontSizeAll={fontSizeAll} seeResultType={seeResultType} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} isShuffle={isShuffle} />
          </React.Fragment>
        )}
      </Container>
      { isPopup === "seeStudentList" && <StudentList page="order" setIsShuffle={setIsShuffle} />}
      { isPopup === "print" && <PrintOrderContents printRef={componentRef} title={title} selectedStudent={selectedStudent} />}
      { isShuffle === "ing" && <Shuffling onClickShuffleBtn={onClickShuffleBtn} />}
    </BasicContainer >
  );
};

export default Order;
