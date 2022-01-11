import styled from 'styled-components';

export const TimerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const TimerOuterFrame = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 420px;
  border: 1px solid red;
  border-radius: 200px;
  background: conic-gradient(red ${props => props.gauge * 6}deg, white ${props => props.gauge}deg);
`;

export const TimerInnerFrame = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 400px;
  height: 400px;
  border: 1px solid red;
  border-radius: 200px;
  background-color: black;
  color: white;
`;
