import { addMonths, format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { customMedia } from "../../styles";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
  padding-bottom: 0px;
  padding-bottom: 0rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  align-self: flex-start;
  ${customMedia.greaterThan("tablet")`
    font-size: 2em;
    font-size: 2rem;
  `}
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  ${customMedia.greaterThan("tablet")`
    grid-row: 1 / 2;
  `}
  .calendar_btn {
    cursor: pointer;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: color 1s ease, background-color 1s ease;
  }
  .calendar_btn_option {
    font-size: 0.875rem;
    font-size: 0.875em;
    padding: 5px 20px;
    padding: 0.313rem 1.25rem;
    transition: color 1s ease, background-color 1s ease;
    border: none;
    border-radius: 5px;
    border-radius: 0.3125rem;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
  }
`;

const TodayBtn = styled.div`
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
`;

const MoveBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

interface IPros {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  attendType: string[];
  nameType: string[];
  seletedType: string;
  seletedName: string;
  setSeletedType: Dispatch<SetStateAction<string>>;
  setSletedName: Dispatch<SetStateAction<string>>;
}

const MainTop = ({
  date,
  setDate,
  attendType,
  nameType,
  seletedType,
  seletedName,
  setSeletedType,
  setSletedName,
}: IPros) => {
  const { register, getValues } = useForm({
    mode: "onChange",
  });
  const onClickBtn = (type: string) => {
    if (type === "cur") setDate(new Date());
    else if (type === "before") setDate((prev) => addMonths(prev, -1));
    else if (type === "next") setDate((prev) => addMonths(prev, 1));
    setSeletedType("전체보기");
    setSletedName("전체보기");
  };
  const onChangeType = () => {
    const newAttendType = getValues("attendType");
    const newNameType = getValues("nameType");
    setSeletedType(newAttendType);
    setSletedName(newNameType);
  };
  const onClickSeeListBtn = () => {
    inPopup("gettingReady");
  };
  return (
    <Layout>
      <Title>{format(date, "yyyy년 MM월")}</Title>
      <BtnContainer>
        <TodayBtn className="calendar_btn" onClick={() => onClickBtn("cur")}>
          TODAY
        </TodayBtn>
        <MoveBtn className="calendar_btn" onClick={() => onClickBtn("before")}>
          <IoIosArrowBack />
        </MoveBtn>
        <MoveBtn className="calendar_btn" onClick={() => onClickBtn("next")}>
          <IoIosArrowForward />
        </MoveBtn>
        <Form>
          <select
            className="calendar_btn calendar_btn_option"
            value={seletedType}
            {...register("attendType", { onChange: onChangeType })}
          >
            <option value="전체보기">전체보기(출결)</option>
            {attendType.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            className="calendar_btn calendar_btn_option"
            value={seletedName}
            {...register("nameType", { onChange: onChangeType })}
          >
            <option value="전체보기">전체보기(학생)</option>
            {nameType.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Form>
        <div className="calendar_btn calendar_btn_option" onClick={onClickSeeListBtn}>
          명렬표로 보기
        </div>
      </BtnContainer>
    </Layout>
  );
};

export default MainTop;
