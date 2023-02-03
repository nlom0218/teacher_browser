import { useQuery } from "@apollo/client";
import useMe from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";

const SetStudent = () => {
  const me = useMe();
  //   console.log(me?.defaultStudentListId);
  //   console.log(me?.email);

  const { data } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  console.log(data);
  return <PopupContainer maxHeight={true}></PopupContainer>;
};

export default SetStudent;
