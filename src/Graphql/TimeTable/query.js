import gql from "graphql-tag";

export const GET_TIMETABLE_TIME_QUERY = gql`
  query GetTimetableTime {
    getTimetableTime {
      _id
      teacherEmail
      start1
      end1
      start2
      end2
      start3
      end3
      start4
      end4
      start5
      end5
      start6
      end6
    }
  }
`;

export const GET_TIMETABLE_DATA_QUERY = gql`
  query GetTimetableData($day: Int) {
    getTimetableData(day: $day) {
      _id
      color
      day
      memo
      subName
      teacherEmail
      time
    }
  }
`;
