import React from 'react';
import styled from 'styled-components';
import PopupContainer from '../../Shared/PopupContainer';
import TagItem from '../TagItem';

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const SettingLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  .no_tag {
    opacity: 0.6;
    margin-bottom: 5px;
    margin-bottom: 0.3125rem;
  }
`

const Title = styled.div``

const SelectedTag = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MeTag = styled.div`
  padding: 10px;
  padding-top: 0px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.fontColor};
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  margin: 10px 10px 0px 0px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const CreateTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const StudentSortTag = ({ meTag, selectedTag, setSeletedTag }) => {
  const onClickAddTag = (tag) => {
    const exist = selectedTag.includes(tag)
    if (exist) {
      return
    }
    const newSeletedTag = [...selectedTag, tag]
    setSeletedTag(newSeletedTag)
    localStorage.setItem("selectedTag", JSON.stringify(newSeletedTag))
  }
  const onClickRemoveTag = (tag) => {
    const newSeletedTag = selectedTag.filter(item => item !== tag)
    setSeletedTag(newSeletedTag)
    localStorage.setItem("selectedTag", JSON.stringify(newSeletedTag))
  }

  return (<PopupContainer>
    <Container>
      <SettingLayout>
        <Title>✲ 태그</Title>
        <SelectedTag>
          {selectedTag?.length === 0 ?
            <div className="no_tag">선택된 태그가 없습니다. 아래에서 태그를 선택하세요.</div>
            :
            selectedTag?.map((item, index) => {
              return <TagItem key={index} item={item} onClickDelTag={onClickRemoveTag} />
            })}
        </SelectedTag>
        {meTag?.length !== 0 ? <MeTag>
          {meTag?.map((item, index) => {
            return <Tag key={index}>
              <div onClick={() => onClickAddTag(item)}>{item}</div>
            </Tag>
          })}
        </MeTag> : <React.Fragment>
          <div className="no_tag">생성된 태그가 없습니다.</div>
        </React.Fragment>}
      </SettingLayout>
      {/* <SettingLayout>
        <Title>✲ 정렬</Title>
        <SelectedTag></SelectedTag>
        <MeTag>
          {meTag?.map((item, index) => {
            return <div key={index}>{item}</div>
          })}</MeTag>
      </SettingLayout> */}
    </Container>
  </PopupContainer>);
}

export default StudentSortTag;