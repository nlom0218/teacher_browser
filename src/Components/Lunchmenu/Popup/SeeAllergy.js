import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SEE_ALLERGY_STUDENT_QUERY } from "../../../Graphql/Student/query";
import routes from "../../../routes";
import { customMedia } from "../../../styles";
import Loading from "../../Shared/Loading";
import PopupContainer from "../../Shared/PopupContainer";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const AllergyName = styled.div`
  font-weight: 600;
`;

const AllergyStudent = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  a {
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.hoverColor};
      transition: background-color 0.6s ease;
    }
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const SeeAllergy = () => {
  const allergyNum = parseInt(localStorage.getItem("AllergyNum"));
  const { data, loading, refetch } = useQuery(SEE_ALLERGY_STUDENT_QUERY, {
    variables: {
      allergy: allergyNum,
    },
  });

  const processAllergyInfo = () => {
    if (allergyNum === 1) {
      return "1. 난류";
    } else if (allergyNum === 2) {
      return "2. 우유";
    } else if (allergyNum === 3) {
      return "3. 메밀";
    } else if (allergyNum === 4) {
      return "4. 땅콩";
    } else if (allergyNum === 5) {
      return "5. 대두";
    } else if (allergyNum === 6) {
      return "6. 밀";
    } else if (allergyNum === 7) {
      return "7. 고등어";
    } else if (allergyNum === 8) {
      return "8. 게";
    } else if (allergyNum === 9) {
      return "9. 새우";
    } else if (allergyNum === 10) {
      return "10. 돼지고기";
    } else if (allergyNum === 11) {
      return "11. 복숭아";
    } else if (allergyNum === 12) {
      return "12. 토마토";
    } else if (allergyNum === 13) {
      return "13. 아황산염";
    } else if (allergyNum === 14) {
      return "14. 호두";
    } else if (allergyNum === 15) {
      return "15. 닭고기";
    } else if (allergyNum === 16) {
      return "16. 쇠고기";
    } else if (allergyNum === 17) {
      return "17. 오징어";
    } else if (allergyNum === 18) {
      return "18. 조개류(굴, 전복, 홍합 등)";
    }
  };

  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <Container>
        <AllergyName>{processAllergyInfo()}</AllergyName>
        {/* <RefetchBtn onClick={onClickRefetch}><FcSynchronize /></RefetchBtn> */}
        <AllergyStudent>
          {data?.seeAllStudent
            .filter((item) => !item.trash)
            .map((item, index) => {
              return (
                <Link to={`${routes.list}/student/${item._id}`} key={index}>
                  {item.studentName}
                </Link>
              );
            })}
        </AllergyStudent>
      </Container>
    </PopupContainer>
  );
};

export default SeeAllergy;
