import gql from "graphql-tag";

export const SEE_SCHEDULE_QUERY = gql`
  query Query($seeScheduleId: String, $date: String) {
    seeSchedule(id: $seeScheduleId, date: $date) {
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