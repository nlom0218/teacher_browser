import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_ALLERGY_STUDENT_QUERY } from '../../Graphql/Student/query';

const SAllergyItem = styled.div`
  margin-right: 10px;
  margin-right: 0.625rem;
  opacity: ${props => props.myAllergy ? 1 : 0.6};
  cursor: ${props => props.myAllergy && "pointer"};
  color: ${props => props.myAllergy && props.theme.redColor};
  position: relative;
  transition: ${props => props.myAllergy && "color 1s ease"};
`

const SeeAlleryStudent = styled.div`
  position: absolute;
  min-width: 320px;
  min-width: 20rem;
  z-index: 2;
  line-height: 120%;
  display: grid;
  justify-items: flex-start;
`

const HoverContent = styled.div`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const AllergyItem = ({ item, me }) => {

  const [isHover, setIsHover] = useState(false)
  const [hoverContent, setHoverContent] = useState(undefined)

  const { data, loading, refetch } = useQuery(SEE_ALLERGY_STUDENT_QUERY, {
    variables: {
      allergy: parseInt(item)
    }
  })

  // 알러지를 가지고 있는 학생 보기 팝업
  const onClickAllergy = (allergy) => {
    if (me?.allergy.includes(parseInt(allergy))) {
      inPopup("seeAllergy")
      localStorage.setItem("AllergyNum", allergy)
    }
  }

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (data?.seeAllStudent) {
      const students = data?.seeAllStudent?.map((item) => item.studentName)
      if (students.length !== 0) {
        const studentName = [students[0], students[1], students[2]]
          .filter(item => item)
          .join(", ")
        const studentNum = students.length
        setHoverContent({ studentName, studentNum })
      }
    } else {
      return
    }
  }, [data])

  return (<SAllergyItem
    myAllergy={me ? me?.allergy.includes(parseInt(item)) : false}
    onClick={() => onClickAllergy(item)}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
  >
    {item}
    {isHover && (hoverContent && <SeeAlleryStudent>
      <HoverContent>
        {hoverContent.studentName}{hoverContent.studentNum > 3 && `, +${hoverContent.studentNum - 3}`}
      </HoverContent>
    </SeeAlleryStudent>)}
  </SAllergyItem>);
}

export default AllergyItem;