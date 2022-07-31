import gql from "graphql-tag";

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation Mutation(
    $schedule: String!
    $userEmail: String!
    $startDate: Float!
    $endDate: Float!
    $contents: String
    $color: String!
    $months: [Int]!
  ) {
    createSchedule(
      schedule: $schedule
      userEmail: $userEmail
      startDate: $startDate
      endDate: $endDate
      contents: $contents
      color: $color
      months: $months
    ) {
      ok
      error
      schedule {
        _id
        schedule
        userEmail
        contents
        startDate
        endDate
        color
        term
        sort
        allDate
        months
      }
    }
  }
`;

export const EDIT_SCHEDULE_MUTATION = gql`
  mutation EditSchedule(
    $scheduleId: ID!
    $schedule: String!
    $userEmail: String!
    $startDate: Float!
    $endDate: Float!
    $color: String!
    $contents: String
    $months: [Int]!
  ) {
    editSchedule(
      scheduleId: $scheduleId
      schedule: $schedule
      userEmail: $userEmail
      startDate: $startDate
      endDate: $endDate
      color: $color
      contents: $contents
      months: $months
    ) {
      ok
      error
      schedule {
        _id
        schedule
        userEmail
        contents
        startDate
        endDate
        color
        term
        sort
        allDate
        months
      }
      delSchedule {
        _id
      }
    }
  }
`;

export const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteSchedule($userEmail: String!, $scheduleId: ID!) {
    deleteSchedule(userEmail: $userEmail, scheduleId: $scheduleId) {
      ok
      error
      schedule {
        _id
        schedule
        userEmail
        contents
        startDate
        endDate
        color
        term
        sort
        allDate
        months
      }
    }
  }
`;

export const UPDATE_SCHEDULE_SORT_MUTATION = gql`
  mutation UpdateScheduleSort($userEmail: String!, $scheduleId: ID!, $sort: Int!) {
    updateScheduleSort(userEmail: $userEmail, scheduleId: $scheduleId, sort: $sort) {
      ok
      error
    }
  }
`;
