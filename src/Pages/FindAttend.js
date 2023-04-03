import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import useMe from "../Hooks/useMe";
import { format } from "date-fns";

const SEE_TEACHER_ATTENDANCE_QUERY = gql`
  query FindAttendances($userEmail: String!) {
    findAttendances(userEmail: $userEmail) {
      data {
        contents
        date
        type
      }
      studentId
    }
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
  overflow: auto;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

const Layout = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const List = styled.div`
  background: rgba(230, 230, 230, 0.5);
  padding: 20px;
  border-radius: 10px;
`;

const Student = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const AttendList = styled.div`
  display: grid;
  row-gap: 10px;
`;

const FindAttend = () => {
  const me = useMe();

  const { data } = useQuery(SEE_TEACHER_ATTENDANCE_QUERY, {
    variables: { userEmail: me?.email },
    skip: !me,
  });

  return (
    <Container>
      <Title>출결 확인하기 - {me ? me.email : "로그인이 필요합니다."}</Title>
      <Layout>
        {data?.findAttendances.map((attend, idx) => {
          return (
            <List key={idx}>
              <Student>학생{idx + 1}</Student>
              <AttendList>
                {attend.data.map((item, index) => {
                  return (
                    <div key={index}>
                      {format(item.date, "yy/MM/dd")} {item.type} {item.contents}
                    </div>
                  );
                })}
              </AttendList>
            </List>
          );
        })}
      </Layout>
    </Container>
  );
};

export default FindAttend;
