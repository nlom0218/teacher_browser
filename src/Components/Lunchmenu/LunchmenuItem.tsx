import React from "react";
import styled from "styled-components";
import { IMe } from "../../Hooks/useMe";
import { customMedia } from "../../styles";
import AllergyItem from "./AllergyItem";

interface IStyled {
  summary?: string;
}

const SLunchmenu = styled.div<IStyled>`
  display: grid;
  ${({ summary }) => customMedia.greaterThan("tablet")`
    row-gap: ${summary ? "5px" : "10px"};
    row-gap: ${summary ? "0.3125rem" : "0.625rem"};
  `}
`;

const Food = styled.div<IStyled>`
  font-size: ${(props) => (props.summary ? "1em" : "1.25em")};
  font-size: ${(props) => (props.summary ? "1rem" : "1.25rem")};
`;

const Allergy = styled.div<IStyled>`
  display: flex;
  font-size: ${(props) => (props.summary ? "0.875em" : "1em")};
  font-size: ${(props) => (props.summary ? "0.875rem" : "1rem")};
`;

interface IProps extends IMe {
  key: Number;
  summary?: string;
  food: string;
  allergy: string[];
}

const LunchmenuItem = ({ me, food, allergy, summary }: IProps) => {
  return (
    <SLunchmenu summary={summary}>
      <Food summary={summary}>{food}</Food>
      <Allergy summary={summary}>
        {allergy.map((item, index) => {
          return <AllergyItem key={index} item={item} me={me} />;
        })}
      </Allergy>
    </SLunchmenu>
  );
};

export default LunchmenuItem;
