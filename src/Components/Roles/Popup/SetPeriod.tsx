import { useState } from "react";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import PopupContainer from "../../Shared/PopupContainer";
import { PopupDate } from "../../TodoList/Popup/PopupLayout";

const Layout = styled.div`
  padding: 30px 10px;
  padding: 1.875rem 0.625rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const SaveBtn = styled.div`
  background-color: ${(props) => props.theme.green};
  color: white;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
`;

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const SetPeriod = ({ setErrMsg }: IProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onClickSaveBtn = () => {
    if (!startDate || !endDate) return setErrMsg("기간을 입력해주세요.📆");
    const roleDetails = JSON.parse(localStorage.getItem("roleDetails") || "{}");
    localStorage.setItem("roleDetails", JSON.stringify({ startDate, endDate, ...roleDetails }));
    outPopup();
  };
  return (
    <PopupContainer>
      <Layout>
        <div>1인 1역을 수행할 기간을 입력해주세요.</div>
        <PopupDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <SaveBtn onClick={onClickSaveBtn}>저장</SaveBtn>
      </Layout>
    </PopupContainer>
  );
};

export default SetPeriod;
