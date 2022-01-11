import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import routes from '../../../routes';
import PopupContainer from '../../Shared/PopupContainer';
import SortTagBtn from '../SortTagBtn';
import { Btn, Container, Item, List } from '../styled/PopupSeeStudent';

const StudentName = styled.div`
`

const StudentNum = styled.div`
  font-size: 0.85em;
  font-size: 0.85rem;
  opacity: 0.8;
`

const SeeStudents = ({ meTag, selectedTag, seeNum, selectedSort }) => {
  const navigate = useNavigate()

  const { data } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag }),
      ...(selectedSort && { sort: selectedSort })
    }
  })

  const onClickName = (id) => {
    outPopup()
    navigate(`${routes.list}/student/${id}`)
  }

  const onClickAddBtn = () => {
    window.alert("학생 추가하기, 팝업안의 팝업")
  }
  return (<PopupContainer maxHeight={true}>
    <SortTagBtn meTag={meTag} />
    <Container>
      <List>
        {data?.seeAllStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          data?.seeAllStudent?.map((item, index) => {
            return <Item
              key={index}
              onClick={() => onClickName(item._id)}
            >
              <StudentName>{item.studentName}</StudentName>
              {seeNum && <StudentNum>{item.studentNumber ? item.studentNumber : "번호가 없습니다."}</StudentNum>}
            </Item>
          })}
      </List>
      <Btn onClick={onClickAddBtn}>학생 생성하기</Btn>
    </Container>
  </PopupContainer>);
}

export default SeeStudents;