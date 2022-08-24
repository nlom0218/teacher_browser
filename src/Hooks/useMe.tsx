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
      homeLinks {
        title
        link
        ID
      }
    }
  }
`;

export interface IMe {
  me?: {
    _id: string;
    email: string;
    schoolName: string;
    schoolCode: string;
    areaCode: string;
    schoolAdress: string;
    studentNum: number;
    bgTheme: string;
    allergy: number[];
    tag: string[];
    favoriteNews: string[];
    agreePolicy: boolean;
    link: {
      siteName: string;
      memo: string;
    };
    dDay: {
      title: string;
      date: number;
      ID: number;
    };
    isMoveDDay: boolean;
    homeLinks: {
      title: string;
      link: string;
      ID: number;
    };
  };
}

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<IMe>(ME_QUERY, {
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
