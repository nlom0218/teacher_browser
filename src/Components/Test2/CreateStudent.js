import React from "react";



function Student({ student }) {
  return (
    <div>
      <h4> 이름 : {student.name}</h4>
      <hr />
    </div>
  );
}

export default Student;