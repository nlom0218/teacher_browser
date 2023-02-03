import { useQuery } from "@apollo/client";
import useMe from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import Loading from "../../Shared/Loading";
import GuideDefaultList from "./GuideDefaultList";

const SetStudent = () => {
  const me = useMe();
  //   console.log(me?.defaultStudentListId);
  //   console.log(me?.email);

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer maxHeight={true}>{me?.defaultStudentListId ? <div></div> : <GuideDefaultList />}</PopupContainer>
  );
};

export default SetStudent;
