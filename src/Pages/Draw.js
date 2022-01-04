import BasicContainer from '../Components/Shared/BasicContainer';
import React from "react";
import styled from 'styled-components';

// const Container = styled.div`
// high: 100%
// display: grid;
// align-items: center;
// color: ${props=>props.theme.bgColor};
// `

// const LayOut = styled.div`
// width: 100%;
// max-width: 400px;
// margin: auto;
// margin-top : 150px;
// padding: 30px;
// display: flex;
// flex-direction: column;
// background: rgba(4, 4, 43, 0.7);
// high: 100%
// `

// const RandomNum = styled.div`
// background: #181831;
// padding: 20px;
// p{
//   color: #9cff9c;
//   font-weight: 600;
// }
// `

// const NumContainer = styled.div`
// display: flex;
// justify-content : space-between;
// padding : 60px 0;
// width : 100%;
// div{
//   width : 100%;
//   max-width: 42%;
// }
// input{
//   padding: 8px;
//   border: none;
//   outline: none;
//   width : 100%;
//   background : #181831;
//   color : #9cff9c;
// }
// `

// const Button = styled.div`
// align-self: flex-end;
// border: none;
// outline : none;
// background : #292977;
// color: #fff;
// padding : 14px;
// width : 100%;
// font-size : 22px;
// cursor : pointer; 
// `



// export default function Draw() {
//   const [minVal, setMinVal] = useState(0);
//   const [maxVal, setMaxVal] = useState(10);
//   const [randomNum, setRandomNum] = useState(5);

//   const handleRandomNum = () => {
//     if (minVal > maxVal) {
//       window.alert("시작값이 끝값보다 큽니다.")
//     return
//     }
//     setRandomNum(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));
//   };

//   return (
//     <BasicContainer>
//       <Container>
//       <LayOut>
//         <RandomNum>
//           <p>
//             숫자 뽑기 <span>{randomNum}</span>
//           </p>
//         </RandomNum>
//         <NumContainer>
//           <div>
//           <p>시작:</p>
//           <input 
//             type="number" 
//             value={minVal} 
//             onChange={e => setMinVal(+e.target.value)} 
//            />
//           </div>
//           <div>
//           <p>끝:</p>
//           <input 
//             type="number" 
//             value={maxVal} 
//             onChange={e => setMaxVal(+e.target.value)}
//            />
//           </div>
//         </NumContainer>
//         <Button onClick ={handleRandomNum}>결과값</Button>
//       </LayOut>
//     </Container> 
//     </BasicContainer>
   
//   );
// }

function CreateStudent({ name, onDataChange, onCreate }) {
  const style = {
    width: "600px",
    margin: "20px",
    padding: "10px",
    border: "3px solid black"
  };

  return (
    <BasicContainer>
    <div style={style}>
      <input
        type="text"
        name="name"
        placeholder="이름입력"
        style={{width: "500px"}}
        onChange={onDataChange}
        value={name}
      />
      &nbsp;&nbsp;
      <button onClick={onCreate}>추가</button>
    </div>
    </BasicContainer>
  );
}

export default CreateStudent;