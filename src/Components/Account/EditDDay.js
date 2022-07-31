import React from "react";
import styled from "styled-components";
import EditDDayItem from "./EditDDayItem";
import CreateDDay from "./CreateDDay";

const Container = styled.div``;

const DDayList = styled.div``;

const EditDDay = ({ dDay, setErrMsg, userEmail }) => {
  return (
    <Container>
      <DDayList>
        {dDay.length !== 0 &&
          dDay.map((item, index) => {
            return <EditDDayItem key={index} {...item} />;
          })}
        {dDay.length !== 5 && <CreateDDay setErrMsg={setErrMsg} userEmail={userEmail} />}
      </DDayList>
    </Container>
  );
};

export default EditDDay;
