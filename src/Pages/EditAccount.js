import React, { useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';

const EditAccount = () => {
  useEffect(() => {
    fetch("https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=10&SCHUL_NM=다목초")
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])
  return (<BasicContainer>
    회원정보 변경
  </BasicContainer>);
}

export default EditAccount;