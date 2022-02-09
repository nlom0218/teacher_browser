import gql from "graphql-tag";

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation Mutation($schedule: String!, $userEmail: String!, $startDate: String!, $endDate: String!, $contents: String, $color: String!) {
    createSchedule(schedule: $schedule, userEmail: $userEmail, startDate: $startDate, endDate: $endDate, contents: $contents, color: $color) {
      ok
      error
    }
  }
`

export const EDIT_SCHEDULE_MUTATION = gql`
  mutation EditSchedule($scheduleId: ID!, $schedule: String!, $userEmail: String!, $startDate: String!, $endDate: String!, $color: String!, $contents: String) {
    editSchedule(scheduleId: $scheduleId, schedule: $schedule, userEmail: $userEmail, startDate: $startDate, endDate: $endDate, color: $color, contents: $contents) {
      ok
      error
    } 
  }
`