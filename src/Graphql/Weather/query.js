import gql from "graphql-tag";

export const WEATHER_QUERY = gql`
  query Weather($lat: Float!, $lng: Float!) {
    weather(lat: $lat, lng: $lng) {
      address1
      address2
      temp
      icon
      pm10grade
    }
  }
`;
