import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import PopupContainer from '../../Shared/PopupContainer';
import { Btn, Container, Item, List } from '../styled/PopupSeeStudent';
import useMe from '../../../Hooks/useMe';
import { outPopup } from '../../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../../../Graphql/StudentList/query';
import { ADD_STUDENT_MUTATION } from '../../../Graphql/StudentList/mutation';
import Loading from '../../Shared/Loading';

const AddManyStudent = ({ inStudent, listId }) => {
  const selectedTag = JSON.parse(localStorage.getItem("selectedTag")) ? JSON.parse(localStorage.getItem("selectedTag")) : []
  const selectedSort = localStorage.getItem("selectedSort") ? localStorage.getItem("selectedSort") : undefined
  const me = useMe()
  const [addStudentId, setAddStudentId] = useState([])
  const [outStudent, setOutStudent] = useState([])
  const { data, loading, refetch } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag }),
      ...(selectedSort && { sort: selectedSort }),
      trash: false,
    }
  })

  const onCompleted = (result) => {
    const { addStudent: { ok } } = result
    if (ok) {
      outPopup()
    }
  }

  const [addStudent, { loading: addLoading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [{
      query: SEE_ONE_STUDENT_LIST_QUERY,
      variables: {
        listId
      }
    }]
  })

  const checkStudent = (id) => {
    if (addStudentId.length === 0) {
      setAddStudentId([id])
    } else {
      const newAddStudentId = [...addStudentId, id]
      setAddStudentId(newAddStudentId)
    }
  }

  const delStudentId = (id) => {
    const newAddStudentId = addStudentId.filter((item) => item !== id)
    setAddStudentId(newAddStudentId)
  }

  const onClickStudent = (id) => {
    const exist = addStudentId.includes(id)
    if (exist) {
      delStudentId(id)
    } else {
      checkStudent(id)
    }
  }

  const onClickAddBtn = () => {
    if (addStudentId.length === 0) {
      return
    }
    addStudent({
      variables: {
        teacherEmail: me?.email,
        studentId: addStudentId,
        listId
      }
    })
  }

  useEffect(() => {
    if (data && inStudent) {
      const inStudentName = inStudent.map(item => item.studentName)
      const newOutStudent = data?.seeAllStudent.filter(item => {
        return !inStudentName.includes(item.studentName)
      })
      setOutStudent(newOutStudent)
      return
    }
    if (data) {
      setOutStudent(data?.seeAllStudent)
    }
  }, [data, inStudent])

  useEffect(() => {
    refetch()
  }, [selectedTag, selectedSort])

  if (loading) {
    return <Loading />
  }

  return (<PopupContainer maxHeight={true}>
    <Container>
      <List>
        {data?.seeAllStudent?.length !== 0 ? (outStudent.length === 0 ? <div className="noStudnet">학생들이 모두 포함되어 있습니다.</div>
          :
          outStudent.map((item, index) => {
            return <Item key={index} addStudent={true} onClick={() => onClickStudent(item._id)} >
              <div>{item.studentName}</div>
              <div>
                {addStudentId.includes(item._id) ?
                  <RiCheckboxLine />
                  :
                  <RiCheckboxBlankLine />
                }
              </div>
            </Item>
          })) : <div className="noStudnet">생성된 학생이 없습니다.</div>
        }
      </List>
      {outStudent.length !== 0 && <Btn onClick={onClickAddBtn}>학생 추가하기</Btn>}
    </Container>
  </PopupContainer>);
}

export default AddManyStudent;