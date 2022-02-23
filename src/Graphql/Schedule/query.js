import gql from "graphql-tag";

export const SEE_SCHEDULE_QUERY = gql`
  query Query($userEmail: String!, $scheduleId: String, $month: Int, $date: Float) {
    seeSchedule(userEmail: $userEmail, scheduleId: $scheduleId, month: $month, date: $date) {
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
      months
    }
  }
`

export const ENABLE_SORT_NUM_QUERY = gql`
  query Query($scheduleId: String!, $userEmail: String!) {
    enableSortNum(scheduleId: $scheduleId, userEmail: $userEmail)
  }
`