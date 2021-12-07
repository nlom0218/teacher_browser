import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';

const Draw = () => {
  return (<BasicContainer menuItem={true}>
    랜덤뽑기
  </BasicContainer>);
}


export default Draw;


let lotto = [];

for(let i=0; i<6; i++){
    let num = Math.floor(Math.random() * 44) + 1;

    for(let j in lotto){
        if(num == lotto[j]){
            num = Math.floor(Math.random() * 44) +1;
        }
    }
    lotto.push(num);
}

lotto.sort(function(a,b){
    return a - b;
});

document.write('번호 뽑기 결과 : ' + lotto);


