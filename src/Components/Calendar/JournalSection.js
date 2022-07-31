import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { SEE_JOURNAL_QUERY } from "../../Graphql/Journal/query";
import IcJournal from "../../icons/Journal/IcJournal";
import IcLunchmenuClick from "../../icons/Lunchmenu/IcLunchmenuClick";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import JournalSectionItem from "./JournalSectionItem";
import SectionContainer from "./styled/SectionContainer";
import SectionContents from "./styled/SectionContents";
import SectionNoDateText from "./styled/SectionNoDateText";
import SectionTitle from "./styled/SectionTitle";

const JournalList = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 10px;
  padding: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    padding: 20px;
    padding: 1.25rem;
  `}
`;

const PlusJournalBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const JournalSection = ({ urlDate, refetchQuery }) => {
  const { data, loading, refetch } = useQuery(SEE_JOURNAL_QUERY, {
    variables: {
      date: parseInt(urlDate),
    },
  });

  const onClickPlusBtn = () => {
    inPopup("addJournal");
  };

  useEffect(() => {
    refetch();
  }, [refetchQuery]);

  return (
    <SectionContainer>
      <SectionTitle>
        <div>
          <IcJournal />
        </div>
        <div>학급일지</div>
        <PlusJournalBtn onClick={onClickPlusBtn}>
          <AiOutlinePlus />
        </PlusJournalBtn>
      </SectionTitle>
      <SectionContents>
        {loading ? (
          <Loading page="subPage" />
        ) : data?.seeJournal?.length === 0 ? (
          <SectionNoDateText>생성된 학급일지가 없습니다. 😁</SectionNoDateText>
        ) : (
          <JournalList>
            {data?.seeJournal?.map((item, index) => {
              return <JournalSectionItem key={index} item={item} />;
            })}
          </JournalList>
        )}
      </SectionContents>
    </SectionContainer>
  );
};

export default JournalSection;
