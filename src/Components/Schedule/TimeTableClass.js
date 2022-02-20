import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TIMETABLE_DATA_QUERY } from "../../Graphql/TimeTable/query";

const TimeTableClass = () => {
  const { data, loading, error } = useQuery(GET_TIMETABLE_DATA_QUERY);

  return;
  // (
  //  classMon.map((name, index) => {
  //       return (
  //         <TableInItem
  //           key={index}
  //           item={name.subjectname}
  //           color={name.color}
  //           tag={name.tag}
  //           fontSize={fontSize}
  //           setFontSize={setFontSize}
  //         />
  //       );
  //     })
};

export default TimeTableClass;
