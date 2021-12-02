import React, { useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';

const EditAccount = () => {
  const findSchool = (name) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=10&SCHUL_NM=${name}`)
      .then(res => res.json())
      .then(data => console.log(data.schoolInfo[1].row))
  }
  return (<BasicContainer>
    <div onClick={() => findSchool("원당초")}>다목초등학교</div>
  </BasicContainer>);
}

export default EditAccount;