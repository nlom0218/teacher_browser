import gql from "graphql-tag";

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation Mutation($schedule: String!, $userEmail: String!, $startDate: String!, $endDate: String!, $contents: String, $color: String!) {
    createSchedule(schedule: $schedule, userEmail: $userEmail, startDate: $startDate, endDate: $endDate, contents: $contents, color: $color) {
      ok
      error
    }
  }
`