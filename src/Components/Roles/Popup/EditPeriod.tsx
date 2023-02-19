import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import routes from "../../../routes";
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
  editStartDate: number;
  editEndDate: number;
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setEditStartDate: React.Dispatch<React.SetStateAction<number>>;
  setEditEndDate: React.Dispatch<React.SetStateAction<number>>;
}

const EditPeriod = ({ setErrMsg, editEndDate, editStartDate, setEditStartDate, setEditEndDate }: IProps) => {
  const onClickSaveBtn = () => {
    if (!editStartDate || !editEndDate) return setErrMsg("기간을 입력해주세요.📆");
    outPopup();
  };
  return (
    <PopupContainer>
      <Layout>
        <div>1인 1역을 수행할 기간을 입력해주세요.</div>
        <PopupDate
          startDate={new Date(editStartDate)}
          setStartDate={setEditStartDate}
          endDate={new Date(editEndDate)}
          setEndDate={setEditEndDate}
        />
        <SaveBtn onClick={onClickSaveBtn}>확인</SaveBtn>
      </Layout>
    </PopupContainer>
  );
};

export default EditPeriod;
