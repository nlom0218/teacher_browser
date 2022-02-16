import gql from "graphql-tag";

export const SEE_SCHEDULE_QUERY = gql`
  query Query($scheduleId: String, $dateArr: [Float], $date: Float) {
    seeSchedule(scheduleId: $scheduleId, dateArr: $dateArr, date: $date) {
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
      isSort
    }
  }
`