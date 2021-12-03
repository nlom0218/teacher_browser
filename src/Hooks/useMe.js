import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { useEffect, useState } from "react"
import { isLoggedInVar, logOutUser } from "../apollo"

const ME_QUERY = gql`
  query Me {
    me  {  
      email
      school
    }
  }
`

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar)
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  })
  // useEffect(() => {
  //   if (!loading) {
  //     // localStorage에 있는 토큰 변경시 자동 로그아웃 구현하기......
  //   }
  // }, [data])
  return data?.me
}

export default useMe