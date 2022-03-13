import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const Layout = styled.div`
  display: grid;
  row-gap: 10px;
`

const GroupTypeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  column-gap: 1.25rem;
`

const GroupTypeItem = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${props => props.selected && props.theme.btnBgColor};
  color: ${props => props.selected && props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const KeepDistanceGroup = ({ keepDistanceGroup, setKeepDistanceGroup, setErrMsg }) => {

  const onClickGroupType = (type) => {
    if (type === "none") {
      const newKeepDistanceGroup = { type, gender: "random" }
      setKeepDistanceGroup(newKeepDistanceGroup)
    } else {
      const newKeepDistanceGroup = { ...keepDistanceGroup, type }
      setKeepDistanceGroup(newKeepDistanceGroup)
    }
  }

  const onClickGroupGender = (gender) => {
    const newKeepDistanceGroup = { ...keepDistanceGroup, gender }
    setKeepDistanceGroup(newKeepDistanceGroup)
  }

  return (<Container>
    <Layout>
      <div>모둠 형태</div>
      <GroupTypeList>
        <GroupTypeItem selected={keepDistanceGroup.type === "none"} onClick={() => onClickGroupType("none")}>없음</GroupTypeItem>
        <GroupTypeItem selected={keepDistanceGroup.type === "horizontal"} onClick={() => onClickGroupType("horizontal")}>가로</GroupTypeItem>
        <GroupTypeItem selected={keepDistanceGroup.type === "vertical"} onClick={() => onClickGroupType("vertical")}>세로</GroupTypeItem>
      </GroupTypeList>
    </Layout>
    { keepDistanceGroup.type !== "none" && <Layout>
      <div>모둠 구성원(성별)</div>
      <GroupTypeList>
        <GroupTypeItem selected={keepDistanceGroup.gender === "random"} onClick={() => onClickGroupGender("random")}>랜덤</GroupTypeItem>
        <GroupTypeItem selected={keepDistanceGroup.gender === "same"} onClick={() => onClickGroupGender("same")}>같은 성별</GroupTypeItem>
        <GroupTypeItem selected={keepDistanceGroup.gender === "helf"} onClick={() => onClickGroupGender("helf")}>반반 성별</GroupTypeItem>
      </GroupTypeList>
    </Layout>}
  </Container >);
}

export default KeepDistanceGroup;