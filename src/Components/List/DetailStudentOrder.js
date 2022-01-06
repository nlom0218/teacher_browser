import React from 'react';
import { DetailStudentLayout } from "./styled/DetailStudent"

const DetailStudentOrder = ({ studentInfo }) => {
  return (<DetailStudentLayout>
    <div>번호</div>
    <div>{studentInfo?.studentOrder}</div>
  </DetailStudentLayout>);
}

export default DetailStudentOrder;