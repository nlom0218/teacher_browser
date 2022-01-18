import styled from 'styled-components';

export const BtnContainer = styled.div`
  width: 300px;
  height: 80px;
  border: 1px solid white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  padding: 10px;
`;

export const BtnSpan = styled.span`
  font-size: 20px;
  :hover {
    font-size: 25px;
  };
`;

export const Btn = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 100px;
  height: 50px;
  border: 1px solid yellow;
  background-color: ${props => props.bgColor};
  color: white;
  cursor: pointer;
  :hover {
    background-color: red;
  };
  :hover span {
    font-size: 25px;
  };
`;