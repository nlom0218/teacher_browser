import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { SEE_SCHEDULE_QUERY } from '../../Graphql/Schedule/query';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`

const CalendarDetail = ({ userEmail, urlDate, setScreen, screen }) => {
  const { data, loading, refetch } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      date: new Date(parseInt(urlDate))
    }
  })
  console.log(data);
  useEffect(() => {
    if (screen === "full") {
      setScreen("small")
    }
  }, [])
  return (<Container></Container>);
}

export default CalendarDetail;

// const CalendarDetail = () => {
//   const { date } = useParams()
//   const { data, loading, refetch } = useQuery(SEE_SCHEDULE_QUERY, {
//     variables: {
//       date: new Date(date)
//     }
//   })
//   console.log(data);
//   return (<Container></Container>);
// }

// export default CalendarDetail;