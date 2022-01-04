import React, { Component } from "react";
import { render } from "react-dom/cjs/react-dom.development";
import ReactTable from "react-table";
import BasicContainer from "../Components/Shared/BasicContainer";
import { useTable } from "react-table";

const Schedule = () => {
  return <BasicContainer menuItem={true}>시간표</BasicContainer>;
};

export default Schedule;
