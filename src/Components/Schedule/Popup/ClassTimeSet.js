import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import DetailStartTime from "./DetailStartTime";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../../../Hooks/useMe";
import { SET_TIMETABLE_TIME_MUTATION } from "../../../Graphql/TimeTable/mutation";
import { GET_TIMETABLE_TIME_QUERY } from "../../../Graphql/TimeTable/query";
import Loading from "../../Shared/Loading";
import { outPopup } from "../../../apollo";

const ClassTimeSet = ({ userEmail }) => {
  const onCompleted = (result) => {
    const {
      setTimetableTime: { ok },
    } = result;
    if (ok) {
      outPopup();
    }
  };

  const [setTimetableTime, { loading }] = useMutation(
    SET_TIMETABLE_TIME_MUTATION,
    {
      onCompleted,
      refetchQueries: [
        { query: ME_QUERY },
        { query: GET_TIMETABLE_TIME_QUERY, variables: { userEmail } },
      ],
    }
  );

  if (loading) {
    return <Loading page="popupPage" />
  }

  return (
    <PopupContainer>
      <DetailStartTime userEmail={userEmail} setTimetableTime={setTimetableTime} />
    </PopupContainer>
  );
};

export default ClassTimeSet;
