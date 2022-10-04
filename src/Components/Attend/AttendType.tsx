import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { Icon } from "../Calendar/Popup/PopupLayout";
import AlertMessage from "../Shared/AlertMessage";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const SAttendType = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  padding: 0.625rem;
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-items: flex-start;
  transition: background-color 1s ease;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(4, 1fr);
  `};
`;

interface ITypeStyled {
  selected: boolean;
}

const Type = styled.div<ITypeStyled>`
  font-size: 0.875em;
  font-size: 0.875rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${(props) => props.selected && props.theme.green};
  color: ${(props) => props.selected && props.theme.originBgColor};
  transition: background-color 1s ease, color 1s eaes;
  cursor: pointer;
  :hover {
    background-color: ${(props) => (props.selected ? props.theme.green : props.theme.bgColor)};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

interface IProps {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  seletedStudent: string[];
}

const AttendType = ({ type, setType, seletedStudent }: IProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const types = ["인정 결석", "질병 결석", "미인정 결석", "기타 결석", "지각", "조퇴", "결과"];
  const onClickType = (type: string) => {
    if (seletedStudent.length === 0) setError("학생을 선택하세요.");
    else setType(type);
  };
  useEffect(() => {
    if (seletedStudent.length === 0) setType("");
  }, [seletedStudent]);
  return (
    <Container>
      <Icon>
        <BsFillPersonCheckFill />
      </Icon>
      <SAttendType>
        {types.map((item, index) => (
          <Type key={index} selected={type === item} onClick={() => onClickType(item)}>
            {item}
          </Type>
        ))}
      </SAttendType>
      {error && <AlertMessage msg={error} setMsg={setError} type="error" time={3000} />}
    </Container>
  );
};

export default AttendType;
