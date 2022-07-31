import React from "react";
import styled from "styled-components";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const SFolderItem = styled.div`
  font-size: 1.2em;
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
`;

const BoxIcon = styled.div`
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1em;
    font-size: 1rem;
  }
`;

const FolderItem = ({ item, setSubmitFolder, submitFolder }) => {
  const onClickIcon = () => {
    if (submitFolder.length === 0) {
      setSubmitFolder([item]);
    } else {
      if (submitFolder.includes(item)) {
        const newSubmitFolder = submitFolder.filter((folder) => folder !== item);
        setSubmitFolder(newSubmitFolder);
      } else {
        const newSubmitFolder = [...submitFolder, item];
        setSubmitFolder(newSubmitFolder);
      }
    }
  };

  return (
    <SFolderItem>
      <BoxIcon onClick={onClickIcon}>
        {submitFolder.length === 0 ? (
          <GrCheckbox />
        ) : submitFolder.includes(item) ? (
          <GrCheckboxSelected />
        ) : (
          <GrCheckbox />
        )}
      </BoxIcon>
      <div>{item}</div>
    </SFolderItem>
  );
};

export default FolderItem;
