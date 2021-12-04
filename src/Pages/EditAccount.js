import React from 'react';
import styled from 'styled-components';
import RegisterSchool from '../Components/Account/RegisterSchool';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from '../Hooks/useMe';

const Changes = styled.div``

const List = styled.div``

const Item = styled.div``

const EditAccount = () => {
  const me = useMe()
  return (<BasicContainer menuItem={true}>
    <Changes>
      <List>학교정보 수정</List>
      <Item>
        <RegisterSchool
          schoolName={me?.schoolName}
          schoolCode={me?.schoolCode}
          areaCode={me?.areaCode} />
      </Item>
    </Changes>
  </BasicContainer>);
}

export default EditAccount;