import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import PopupContainer from "../../Shared/PopupContainer";
import { Btn, Item, List } from "../styled/PopupSeeStudent";
import useMe from "../../../Hooks/useMe";
import { outPopup } from "../../../apollo";
import { SEE_ALL_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { ADD_STUDENT_MUTATION } from "../../../Graphql/StudentList/mutation";
import Loading from "../../Shared/Loading";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  height: 96%;
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0);
`;

const SelectedAll = styled.div`
  grid-column: 1 / -1;
  padding: 10px;
  padding: 0.625rem;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  cursor: pointer;
  svg {
    font-size: 1.25rem;
    font-size: 1.25em;
    cursor: pointer;
    display: flex;
  }
`;

const SelectedAllBtn = styled.div``;

const AddManyStudent = ({ inStudent, listId, setSuccessMsg, listName }) => {
  const selectedTag = JSON.parse(localStorage.getItem("selectedTag"))
    ? JSON.parse(localStorage.getItem("selectedTag"))
    : [];
  const selectedSort = localStorage.getItem("selectedSort") ? localStorage.getItem("selectedSort") : undefined;
  const me = useMe();
  const [addStudentId, setAddStudentId] = useState([]);
  const [outStudent, setOutStudent] = useState([]);
  const { data, loading, refetch } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag }),
      ...(selectedSort && { sort: selectedSort }),
      trash: false,
    },
  });

  const onCompleted = (result) => {
    const {
      addStudent: { ok },
    } = result;
    if (ok) {
      outPopup();
      setSuccessMsg(`${addStudentId.length}명의 학생이 ${listName}에 추가되었습니다. 😅`);
    }
  };

  const [addStudent, { loading: addLoading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    update: (
      cache,
      {
        data: {
          addStudent: { ok },
        },
      },
    ) => {
      if (ok) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeStudentList() {},
          },
        });
      }
    },
  });

  const checkStudent = (id) => {
    if (addStudentId.length === 0) {
      setAddStudentId([id]);
    } else {
      const newAddStudentId = [...addStudentId, id];
      setAddStudentId(newAddStudentId);
    }
  };

  const delStudentId = (id) => {
    const newAddStudentId = addStudentId.filter((item) => item !== id);
    setAddStudentId(newAddStudentId);
  };

  const onClickStudent = (id) => {
    const exist = addStudentId.includes(id);
    if (exist) {
      delStudentId(id);
    } else {
      checkStudent(id);
    }
  };

  const onClickAddBtn = () => {
    if (addStudentId.length === 0) {
      return;
    }
    addStudent({
      variables: {
        teacherEmail: me?.email,
        studentId: addStudentId,
        listId,
      },
    });
  };

  const onClickSeletedAllBtn = () => {
    const newAddStudentId = outStudent.map((item) => item._id);
    if (addStudentId.length === outStudent.length) {
      setAddStudentId([]);
    } else {
      setAddStudentId(newAddStudentId);
    }
  };

  const processSeleteAll = () => {
    if (addStudentId.length === outStudent.length) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (data && inStudent) {
      const inStudentName = inStudent.map((item) => item.studentName);
      const newOutStudent = data?.seeAllStudent.filter((item) => {
        return !inStudentName.includes(item.studentName);
      });
      setOutStudent(newOutStudent);
      return;
    }
    if (data) {
      setOutStudent(data?.seeAllStudent);
    }
  }, [data, inStudent]);

  useEffect(() => {
    refetch();
  }, [selectedTag, selectedSort]);

  if (addLoading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer maxHeight={true}>
      <Container>
        <List>
          {data?.seeAllStudent?.length !== 0 ? (
            outStudent.length === 0 ? (
              <div className="noStudnet">학생들이 모두 포함되어 있습니다.</div>
            ) : (
              <React.Fragment>
                <SelectedAll onClick={onClickSeletedAllBtn}>
                  <div>모두 선택하기</div>
                  <SelectedAllBtn>{processSeleteAll() ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</SelectedAllBtn>
                </SelectedAll>
                {outStudent.map((item, index) => {
                  return (
                    <Item key={index} addStudent={true} onClick={() => onClickStudent(item._id)}>
                      <div>{item.studentName}</div>
                      <div>{addStudentId.includes(item._id) ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}</div>
                    </Item>
                  );
                })}
              </React.Fragment>
            )
          ) : (
            <div className="noStudnet">생성된 학생이 없습니다.</div>
          )}
        </List>
        {outStudent.length !== 0 && <Btn onClick={onClickAddBtn}>학생 추가하기</Btn>}
      </Container>
    </PopupContainer>
  );
};

export default AddManyStudent;
