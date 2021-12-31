import React from 'react';
import styled from 'styled-components';
import CreateManyStudentInput from './CreateManyStudentInput';

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.875rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
`

const CreateManyStudentFrom = ({ existStudentArray, studentString }) => {
  return (<Form>
    {studentString.map((_, index) => {
      return <CreateManyStudentInput
        key={index}
        index={index}
        existStudentArray={existStudentArray}
      />
    })}
  </Form>);
}

export default CreateManyStudentFrom;