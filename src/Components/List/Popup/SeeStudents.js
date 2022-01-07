import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { outPopup } from '../../../apollo';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import routes from '../../../routes';
import PopupContainer from '../../Shared/PopupContainer';
import { Btn, Container, Item, List } from '../styled/PopupSeeStudent';

const SeeStudents = () => {
  const navigate = useNavigate()

  const { data } = useQuery(SEE_ALL_STUDENT_QUERY)

  const onClickName = (id) => {
    outPopup()
    navigate(`${routes.list}/student/${id}`)
  }

  const onClickAddBtn = () => {
    window.alert("학생 추가하기, 팝업안의 팝업")
  }
  return (<PopupContainer maxHeight={true}>
    <Container>
      <List>
        {data?.seeAllStudent?.length === 0 ?
          <div className="noStudnet">생성된 학생이 없습니다.</div>
          :
          data?.seeAllStudent?.map((item, index) => {
            return <Item
              onClick={() => onClickName(item._id)} key={index}>
              {item.studentName}
            </Item>
          })}
      </List>
      <Btn onClick={onClickAddBtn}>학생 생성하기</Btn>
    </Container>
  </PopupContainer>);
}

export default SeeStudents;