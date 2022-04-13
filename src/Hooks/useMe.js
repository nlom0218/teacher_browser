import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar } from "../apollo";
import Loading from "../Components/Shared/Loading";

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
      allergy
      tag
      favoriteNews
      agreePolicy
      link {
        siteName
        memo
      }
      dDay {
        title
        date
        ID
      }
      isMoveDDay
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
