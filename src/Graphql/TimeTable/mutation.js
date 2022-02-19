import gql from "graphql-tag";

export const SET_TIMETABLE_TIME_MUTATION = gql`
  mutation SetTimetableTime(
    $teacherEmail: String!
    $start1: String
    $end1: String
    $start2: String
    $end2: String
    $start3: String
    $end3: String
    $start4: String
    $end4: String
    $start5: String
    $end5: String
    $start6: String
    $end6: String
  ) {
    setTimetableTime(
      teacherEmail: $teacherEmail
      start1: $start1
      end1: $end1
      start2: $start2
      end2: $end2
      start3: $start3
      end3: $end3
      start4: $start4
      end4: $end4
      start5: $start5
      end5: $end5
      start6: $start6
      end6: $end6
    ) {
      ok
      error
    }
  }
`;

export const SET_TIMETABLE_DATA_MUTATION = gql`
  mutation SetTimetableData(
    $teacherEmail: String
    $timetableData: [InputTimetableData]
  ) {
    setTimetableData(
      teacherEmail: $teacherEmail
      timetableData: $timetableData
    ) {
      ok
      error
    }
  }
`;
