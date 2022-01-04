import React, { useState, useRef } from "react";
import Student from "../Pages/Draw";
import CreateStudent from "./CreateStudent";


function StudentList() {
  const [students, setStudents] = useState([
    {
    }
  ]);

  const nextId = useRef();

 
  const [inputs, setInputs] = useState({
    name: "",
  });


  const { name } = inputs;


  const onDataChange = (e) => {
   
    const { name, value } = e.target;


    setInputs({
      ...inputs, 
      [name]: value 
    });
  };

  const onCreate = () => {
   
    const student = {
      id: "st00" + nextId.current,
      name,
    };
    setStudents([...students, student]);

    setInputs({
      name: "",
    });
    nextId.current += 1;
  };

  return (
    <div>
      <CreateStudent
        name={name}
        onDataChange={onDataChange}
        onCreate={onCreate}
      />
      {students.map((student) => (
        <Student student={student} key={student.id} />
      ))}
    </div>
  );
}

export default StudentList;