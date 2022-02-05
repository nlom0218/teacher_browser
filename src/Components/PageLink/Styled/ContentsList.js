import styled from "styled-components";





const ContentsList = styled.div`
  position: absolute;
  top: 4%;
  right: ${props=>!props.right && "4%"};
  left : ${props=>props.right && "4%"};
  min-width: 65%;
  max-width: 65%;
  max-height: 92%;
  min-height: 92%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;

`






export default ContentsList