import React, { useEffect } from 'react';
import styled from 'styled-components';
import RegisterSchool from '../Components/Account/RegisterSchool';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from '../Hooks/useMe';

const Changes = styled.div``

const List = styled.div``

const Item = styled.div``

const EditAccount = () => {
  const me = useMe()
  console.log(me);
  const findSchool = (name) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=10&SCHUL_NM=${name}`)
      .then(res => res.json())
      .then(data => console.log(data.schoolInfo[1].row))
  }
  return (<BasicContainer>
    <Changes>
      <List>학교정보 수정</List>
      <Item>
        {me?.school ? me?.school : <RegisterSchool schoolInfo={me?.school} />}
      </Item>
    </Changes>
  </BasicContainer>);
}

export default EditAccount;