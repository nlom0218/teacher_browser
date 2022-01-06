import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar } from "../apollo";

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      email
      schoolName
      schoolCode
      areaCode
      schoolAdress
      studentNum
      bgTheme
      alergy
      tag
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (!loading) {
      // localStorage에 있는 토큰 변경시 자동 로그아웃 구현하기......
    }
  }, [data]);
  return data?.me;
};

export default useMe;
