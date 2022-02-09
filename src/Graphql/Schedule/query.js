import gql from "graphql-tag";

export const SEE_SCHEDULE_QUERY = gql`
  query Query($scheduleId: String, $date: String) {
    seeSchedule(scheduleId: $scheduleId, date: $date) {
      _id
      schedule
      userEmail
      contents
      startDate
      endDate
      color
      term
      allDate
      sort
    }
  }
`