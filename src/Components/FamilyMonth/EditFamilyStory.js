import React, { useEffect } from "react";
import MainContentsLayout from "./MainContentsLayout";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { SEE_FAMILY_STORY_QERUY } from "../../Graphql/FamilyStory/query";
import routes from "../../routes";

const EditFamilyStory = ({ userEmail, setErrMsg }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(SEE_FAMILY_STORY_QERUY, {
    variables: {
      id,
    },
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      if (userEmail !== data?.seeFamilyStory.userEmail) {
        window.alert("잘못된 접근입니다.🤨");
        navigate(routes.home);
      }
    }
  }, [data]);
  return <MainContentsLayout></MainContentsLayout>;
};

export default EditFamilyStory;
