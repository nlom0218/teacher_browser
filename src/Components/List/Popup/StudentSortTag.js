import React from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { inPopup } from '../../../apollo';
import useMedia from '../../../Hooks/useMedia';
import { customMedia } from '../../../styles';
import PopupContainer from '../../Shared/PopupContainer';
import TagItem from '../TagItem';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const BackBtn = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  svg {
    cursor: pointer;
    display: flex;
  }
`

const TopContents = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  .sort_tag_name{
    font-weight: 600;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`

const ResetBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  cursor: pointer;
  ${customMedia.greaterThan("tablet")`
    justify-self: flex-end;
  `}
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

const Title = styled.div`
  font-weight: 600;
`

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
  cursor: pointer;
  margin: 10px 10px 0px 0px;
  :hover {
    text-decoration: underline;
  }
`

const SeeStudentSort = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("tablet")`
  `}
`

const SeeStudentNum = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: flex-start;
  ${customMedia.greaterThan("tablet")`
  `}
`

const SeeStudentBtn = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  cursor: pointer;
  svg {
    display: flex;
    margin-right: 10px;
    margin-right: 0.625rem;
  }
`

const StudentSortTag = ({ meTag, selectedTag, setSelectedTag, setSeeNum, seeNum, setSelectedSort, selectedSort }) => {
  const media = useMedia()
  const onClickAddTag = (tag) => {
    const exist = selectedTag.includes(tag)
    if (exist) {
      return
    }
    const newSeletedTag = [...selectedTag, tag]
    setSelectedTag(newSeletedTag)
    localStorage.setItem("selectedTag", JSON.stringify(newSeletedTag))
  }
  const onClickRemoveTag = (tag) => {
    const newSeletedTag = selectedTag.filter(item => item !== tag)
    setSelectedTag(newSeletedTag)
    localStorage.setItem("selectedTag", JSON.stringify(newSeletedTag))
  }
  const onClickBackAddTagBtn = () => inPopup("students")
  const onClickResetBtn = () => {
    localStorage.removeItem("selectedTag")
    localStorage.removeItem("seeNum")
    localStorage.removeItem("seletedSort")
    setSelectedTag([])
    setSelectedSort(undefined)
    setSeeNum(undefined)
  }

  const onClickSortBtn = (type) => {
    if (type === "defalut") {
      setSelectedSort(undefined)
      localStorage.removeItem("selectedSort")
    } else {
      setSelectedSort(type)
      localStorage.setItem("selectedSort", type)
    }
  }

  const onClickSeeNumBtn = (type) => {
    if (type === "see") {
      setSeeNum(true)
      localStorage.setItem("seeNum", true)
    } else {
      setSeeNum(false)
      localStorage.removeItem("seeNum")
    }
  }

  return (<PopupContainer>
    <Container>
      {media !== "Desktop" && <BackBtn onClick={onClickBackAddTagBtn}><IoArrowBackSharp /></BackBtn>}
      <TopContents>
        <div className="sort_tag_name">학생 보기 설정</div>
        <ResetBtn onClick={onClickResetBtn}>초기화</ResetBtn>
      </TopContents>
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
      <SettingLayout>
        <Title>✲ 정렬 방법</Title>
        <SeeStudentSort>
          {/* RiCheckboxBlankLine, RiCheckboxLine  */}
          <SeeStudentBtn onClick={() => onClickSortBtn("defalut")}>
            <div>{!selectedSort ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
            <div>생성일</div>
          </SeeStudentBtn>
          <SeeStudentBtn onClick={() => onClickSortBtn("name")}>
            <div>{selectedSort === "name" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
            <div>이름</div>
          </SeeStudentBtn>
          <SeeStudentBtn onClick={() => onClickSortBtn("num")}>
            <div>{selectedSort === "num" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
            <div>번호</div>
          </SeeStudentBtn>
        </SeeStudentSort>
      </SettingLayout>
      <SettingLayout>
        <Title>✲ 번호 보이기</Title>
        <SeeStudentNum>
          {/* RiCheckboxBlankLine, RiCheckboxLine  */}
          <SeeStudentBtn onClick={() => onClickSeeNumBtn("hide")}>
            <div>{!seeNum ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
            <div>숨기기</div>
          </SeeStudentBtn>
          <SeeStudentBtn onClick={() => onClickSeeNumBtn("see")}>
            <div>{seeNum ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
            <div>보이기</div>
          </SeeStudentBtn>
        </SeeStudentNum>
      </SettingLayout>
    </Container>
  </PopupContainer>);
}

export default StudentSortTag;