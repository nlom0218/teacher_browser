import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import StudentList from "../Components/Order/Popup/StudentList";
import {
  BsChevronLeft,
  BsPeopleFill,
  BsFillCheckSquareFill,
  BsPrinter,
  BsChevronRight,
} from "react-icons/bs";
import { FcContacts } from "react-icons/fc";
import { useQuery, useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../apollo";
import { useParams } from "react-router-dom";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../Graphql/StudentList/query";
import useMedia from "../Hooks/useMedia";
import { customMedia } from "../styles";
import { useEffect } from "react/cjs/react.development";
import { inputLine } from "../Animations/InputLine";
import { BtnFadeIn } from "../Animations/Fade";
import { useForm } from "react-hook-form";
import StudentOrder from "../Components/Order/StudentOrder";

// 전체 틀
const Container = styled.div`
  display: grid;
  padding: 40px;
  padding: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
`;
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
  ${customMedia.greaterThan("desktop")`
   grid-template-columns: 1fr;
  `}
`;
//상단
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

const OptionContents = styled.div`
  width: 100%;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns : auto auto 1fr;
   column-gap:10px;
   column-gap:0.625rem;
  `}
`;

//명단 선택
const OptionBtn = styled.div`
  background-color: ${(props) =>
    props.isShuffling ? props.theme.redColor : props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
// 옵션 선택

//명단과 옵션 아이콘 버튼 설정
const MenuBtn = styled.div`
  font-size: 2em;
  font-size: 2rem;
  svg {
    cursor: pointer;
  }
`;
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
  }
`;

const ListName = styled.div``;
//조건 아이콘
const ConditionIcon = styled.div``;

//순서 변경 메인 화면, 화면 어떻게 구성할 것인지, 한 줄에 몇명까지, 스크롤바, 15명? 10명? 다단 3으로?
const Border = styled.div`
  width: 102%;
  height: 300px;
  text-align: center;
  border-style: solid;
  border-color: darkcyan;
  border-width: thick;
  border-radius: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
`;

// 명단 리스트 화면
const List = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  font-size: 1.5em;
  font-size: 1.5rem;
  text-align: center;
  list-style-type: decimal;
  align-items: center;
`;

// 아래 롤업 화면
const RollList = styled.div`
  display: grid;
  width: 1000px;
  height: 50px;
  font-size: 1.5em;
  font-size: 1.5rem;
  list-style-type: none;
  align-items: center;
  overflow: hidden;
  padding: 10px 30px 5px 50px;
  grid-template-columns: 0.1fr auto 0.1fr;
  column-gap: 25px;
  margin: 15px auto 0 auto;
  position: relative;
`;
// 화살표 스타일
const LeftRight = styled.div`
  width: 20px;
  height: 100%;
  cursor: pointer;
`;
//롤업리스트아이템
const RollListItems = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 10px;
  padding: 0.15rem;
  align-items: center;
  text-align: center;
  overflow: hidden;
`;

//추가 기능 (프린트, 순서보기)
//프린트 버튼 위치를 상대적으로 변경할 것인지, 모양, 기능 추가
const PrintBtn = styled.div`
  width: 50px;
  height: 35px;
  position: absolute;
  right: 5%;
  bottom: 1%;
  text-align: center;
  align-items: center;
  border-style: solid;
  border-color: darkcyan;
  border-width: thick;
  border-radius: 2px;
  border-radius: 20px;
  cursor: pointer;
`;

// 프린트 기능 추가하기
// function info_print() {
//   let initBody = document.body;
//   let hiddenBtn = document.querySelector('.print-button');
//   window.onbeforeprint = function () {
//     hiddenBtn.style.display = "none";
//     document.body = document.querySelector('.main-container');
//   }
//   window.onafterprint = function () {
//     hiddenBtn.style.display = "block";
//     document.body = initBody;
//   }
//   window.print();
// }

const Order = () => {
  const { id } = useParams();

  const media = useMedia();
  const isPopup = useReactiveVar(isPopupVar);

  const [studentListName, setStudentListName] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isShuffle, setIsShuffle] = useState("init");

  const [isEdit, setIsEdit] = useState(false);
  //title : 인쇄할 때 필요한 제목
  const [title, setTitle] = useState(undefined);

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "순서 정하기 제목" },
  });
  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: id },
    skip: !id,
  });

  const unshuffled = ["하나", "둘", "셋"];
  //목록 내 순서 변경
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const [changeShuffled, setShuffled] = useState(shuffled);
  const onClickShuffled = (changeShuffled) => {
    const newShuffled = { ...changeShuffled };
    setShuffled(newShuffled);
  };
  const shuffledList = shuffled.map((value) => <li>{value}</li>);
  //결과 , 설명글 추가함. 순서 제목 입력->프린트할 때 제목 나오도록, 설명글 추가하니 밑줄 안 사라짐....
  //프린트 버튼이랑 롤업 버튼이랑 위치박스는 그대로하고 나오는 것만 다르게? 하는지 박스 자체도 변경할 것인지 선택
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
      setSelectedStudent(
        data?.seeStudentList[0]?.students.map((item) => item.studentName)
      );
    }
  }, [data]);
  console.log(data);
  return (
    <BasicContainer menuItem={true}>
      <Container>
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
          {media !== "Desktop" && (
            <ListIcon>
              <ListName>
                {studentListName ? studentListName : "선택된 명렬표가 없습니다"}
              </ListName>
              <FcContacts onClick={onClickListIcon} />
            </ListIcon>
          )}
        </TopContents>
        {id && (
          <React.Fragment>
            <OptionContents>
              {isShuffle === "init" && (
                <OptionBtn onClick={() => onClickShuffleBtn("ing")}>
                  순서 섞기
                </OptionBtn>
              )}

              {isShuffle === "ing" && (
                <OptionBtn
                  onClick={() => onClickShuffleBtn("finish")}
                  isShuffling={true}
                >
                  멈추기
                </OptionBtn>
              )}

              {isShuffle === "finish" && (
                <React.Fragment>
                  <OptionBtn onClick={() => onClickShuffleBtn("ing")}>
                    다시하기
                  </OptionBtn>
                  <OptionBtn> 한 명씩 보이기 </OptionBtn>
                </React.Fragment>
              )}
            </OptionContents>
            <StudentOrder
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              isShuffle={isShuffle}
            />
          </React.Fragment>
        )}

        {/*
        <MenuBtn>
          <ListIcon onClick={() => onClickIcon("list")}>
            <BsPeopleFill />{" "}
          </ListIcon>
          <ConditionIcon onClick={() => onClickIcon("condition")}>
            <BsFillCheckSquareFill />
          </ConditionIcon>
        </MenuBtn>
        <br />
        <hr />
        <Border>
          <List>{shuffledList}</List>
          <PrintBtn>
            {" "}
            &nbsp;
            <BsPrinter />
          </PrintBtn>
        </Border>
        <br />
        <RollList>
          <LeftRight>
            <BsChevronLeft />
          </LeftRight>
          <RollListItems>{shuffledList}</RollListItems>

          <LeftRight>
            <BsChevronRight />
          </LeftRight>
        </RollList> */}
      </Container>

      {isPopup === "seeStudentList" && <StudentList />}
    </BasicContainer>
  );
};

export default Order;
