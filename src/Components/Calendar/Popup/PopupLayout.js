import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { customMedia } from "../../../styles";
import { BsCheckLg, BsFillPencilFill } from "react-icons/bs"
import { CgNotes } from "react-icons/cg"
import { AiOutlineBgColors } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import bgColorArr from "./ScheduleBgColorArr";

export const CalenderPopupTitle = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
`

export const CalenderPopupFormContainer = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto auto 1fr auto auto auto;
  min-height: 100%;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${props => props.theme.originBgColor};
    line-height: 160%;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
  }
}
`

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Icon = styled.div`
  padding: ${props => props.notPaddingTop ? "0px" : "15px"} 0px;
  padding: ${props => props.notPaddingTop ? "0px" : "0.9375rem"} 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`

const Input = styled.input`
  background-color: ${props => props.theme.originBgColor};
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease, opacity 1s ease;
  }
`

const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 30px 30px 30px;
  grid-template-rows: 1.875rem 1.875rem 1.875rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  column-gap: 5px;
  column-gap: 0.3125rem;
  .delete_color {
    background-color: ${props => props.theme.blurColor};
  }
  ${customMedia.greaterThan("tablet")`
      grid-template-columns: repeat(9, 1fr);
      grid-template-rows: 30px 30px;
      grid-template-rows: 1.875rem 1.875rem;
  `}
`

const ColorItem = styled.div`
  background-color: ${props => props.color};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const DateContainer = styled.div`
    display : grid;
    align-items: center;
    column-gap : 20px;
    column-gap : 1.25rem;
    row-gap : 10px;
    row-gap : 0.625rem;
    text-align: center;
    input {
        width : 100%;
        background-color: ${props => props.theme.originBgColor};
        padding : 20px 10px;
        padding : 1.25rem 0.625rem;
        border-radius : 40px;
        border-radius : 2.5rem;
        cursor : pointer;
        text-align: center;
    }
    ${customMedia.greaterThan("tablet")`
       grid-template-columns : 1fr auto 1fr;
    `}
`

const StartDate = styled.div`
  display : grid;
  align-items : center;
`

const EndDate = styled.div`
  display : grid;
  align-items : center;
`;
const CheckBox = styled.div`
  svg {
    display: flex;
  }
`

export const CalenderPopupInputLayout = ({ register }) => {
  return (<InputLayout>
    <Icon><BsFillPencilFill /></Icon>
    <Input
      {...register("schedule", { required: true })}
      type="text"
      placeholder="제목을 입력하세요."
      autoComplete="off"
    />
  </InputLayout>);
}

export const CalenderPopupTextareaLayout = ({ register }) => {
  return (<InputLayout>
    <Icon><CgNotes /></Icon>
    <TextareaAutosize
      {...register("contents")}
      minRows={5}
      placeholder="세부내용을 입력하세요."
    />
  </InputLayout>);
}

export const CalenderPopupDateLayout = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (<InputLayout>
    <Icon><BsCalendarDate /></Icon>
    <DateContainer>
      <StartDate>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          todayButton="오늘"
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
        />
      </StartDate>
      <div>~</div>
      <EndDate>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale={ko}
          placeholderText="종료일 설정"
        />
      </EndDate>
    </DateContainer>
  </InputLayout>)
}

export const CalenderPopupColorLayout = ({ color, setColor }) => {
  return (<InputLayout>
    <Icon notPaddingTop={true}><AiOutlineBgColors /></Icon>
    <ColorContainer>
      {bgColorArr.map((item, index) => {
        return <ColorItem key={index} color={item} onClick={() => setColor(item)}>
          {color === item && <CheckBox><BsCheckLg /></CheckBox>}
        </ColorItem>
      })}
    </ColorContainer>
  </InputLayout>);
}