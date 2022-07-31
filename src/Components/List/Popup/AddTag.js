import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import styled from "styled-components";
import PopupContainer from "../../Shared/PopupContainer";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const StudentTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  .no_student_tag {
    padding-top: 15px;
    padding-top: 0.9375rem;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  padding: 5px 10px;
  padding: 0.3215rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.purple};
  transition: background-color 1s ease;
  svg {
    display: flex;
    cursor: pointer;
    margin-left: 5px;
    margin-left: 0.3125rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const CreateTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const TagBox = styled.div`
  padding: 20px;
  padding: 1.25rem;
  padding-top: 10px;
  padding-top: 0.625rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  background-color: ${(props) => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  display: flex;
  flex-wrap: wrap;
  .no_tag_div {
    padding-top: 10px;
    padding-top: 0.625rem;
  }
`;

const Tag = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 16px;
  margin-right: 1rem;
  text-decoration: underline;
`;

const AddTag = ({ studentTatArr, onClickDelTag, onClickCreateTag, tagArr, onClickAddTag }) => {
  return (
    <PopupContainer>
      <Container>
        <StudentTag>
          {studentTatArr?.length === 0 ? (
            <div className="no_student_tag">등록된 태그가 없습니다.</div>
          ) : (
            studentTatArr?.map((item, index) => {
              return (
                <TagItem key={index}>
                  <div>{item}</div>
                  <IoIosRemoveCircleOutline onClick={() => onClickDelTag(item)} />
                </TagItem>
              );
            })
          )}
        </StudentTag>
        <TagBox>
          {tagArr.length === 0 ? (
            <div className="no_tag_div">생성된 태그가 없습니다.</div>
          ) : (
            tagArr.map((item, index) => {
              return (
                <Tag key={index}>
                  <div onClick={() => onClickAddTag(item)}>{item}</div>
                </Tag>
              );
            })
          )}
        </TagBox>
        <CreateTagBtn onClick={onClickCreateTag}>태그 관리하기</CreateTagBtn>
      </Container>
    </PopupContainer>
  );
};

export default AddTag;
