import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import useMedia from "../../Hooks/useMedia";
import IcSchoolYellow from "../../icons/School/IcSchoolYellow";
import { ISearchDate } from "../../Pages/Lunchmenu";
import { customMedia } from "../../styles";
import { SearchDate } from "./SearchDate";

const SSearchContainer = styled.div`
  display: grid;
  align-items: flex-end;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const SchoolDate = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: end;
  ${customMedia.greaterThan("tablet")`
    column-gap: 10px;
    column-gap: 0.625rem;
  `}
`;

const SchoolIcon = styled.div`
  align-self: flex-start;
  font-size: 2em;
  font-size: 2rem;
  display: flex;
  cursor: pointer;
  ${customMedia.greaterThan("tablet")`
    font-size: 2.5em;
    font-size: 2.5rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  `}
`;

interface IProps {
  schoolName?: string;
  date: Date;
  setSearchData: Dispatch<SetStateAction<ISearchDate>>;
}

const SearchContainer = ({ schoolName, date, setSearchData }: IProps) => {
  const media = useMedia();
  const onClickSchoolIcon = () => inPopup("lmSearchSchool");
  return (
    <SSearchContainer>
      <SchoolDate>
        {media !== "Mobile" && <div>{schoolName ? schoolName : "학교검색"}</div>}
        <SchoolIcon onClick={onClickSchoolIcon}>
          <IcSchoolYellow />
        </SchoolIcon>
      </SchoolDate>
      <SearchDate date={date} setSearchData={setSearchData} />
    </SSearchContainer>
  );
};

export default SearchContainer;
