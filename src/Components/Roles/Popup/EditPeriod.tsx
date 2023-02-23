import { useEffect, useState } from "react";
import styled from "styled-components";
import { outPopup } from "../../../apollo";

import PopupContainer from "../../Shared/PopupContainer";
import { PopupDate } from "../../TodoList/Popup/PopupLayout";
import { TRolesDate } from "../RolesMain";

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
  recentDate: TRolesDate;
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setRecentDate: React.Dispatch<React.SetStateAction<undefined | TRolesDate>>;
}

const EditPeriod = ({ setErrMsg, recentDate, setRecentDate }: IProps) => {
  const [startDate, setStartDate] = useState(recentDate.startDate);
  const [endDate, setEndDate] = useState(recentDate.endDate);
  const onClickSaveBtn = () => {
    if (!startDate || !endDate) return setErrMsg("기간을 입력해주세요.📆");
    outPopup();
  };

  useEffect(() => {
    setRecentDate(() => {
      return {
        order: recentDate.order,
        startDate,
        endDate,
      };
    });
  }, [startDate, endDate]);

  return (
    <PopupContainer>
      <Layout>
        <div>1인 1역을 수행할 기간을 입력해주세요.</div>
        <PopupDate
          startDate={new Date(startDate)}
          setStartDate={setStartDate}
          endDate={new Date(endDate)}
          setEndDate={setEndDate}
        />
        <SaveBtn onClick={onClickSaveBtn}>확인</SaveBtn>
      </Layout>
    </PopupContainer>
  );
};

export default EditPeriod;
