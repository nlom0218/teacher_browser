import { useMutation } from "@apollo/client";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { SET_DEFAULT_STUDENT_LIST_ID } from "../../Graphql/User/mutation";

interface IIconProps {
  isRepresent: boolean;
}

const Container = styled.div``;

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div<IIconProps>`
  margin-right: 10px;
  margin-right: 0.625rem;
  color: ${(props) => props.isRepresent && props.theme.redColor};
  cursor: pointer;
  svg {
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const Message = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  font-weight: 600;
`;

interface IProps {
  listId: string;
  userEmail: string;
  defaultStudentList: string;
}

const SetRepresentList = ({ listId, userEmail, defaultStudentList }: IProps) => {
  const [isRepresent, setIsRepresent] = useState(listId === defaultStudentList);

  const [setDefaultStudentListId, { loading }] = useMutation(SET_DEFAULT_STUDENT_LIST_ID);

  const onClickIcon = () => {
    setDefaultStudentListId({
      variables: {
        listId,
        userEmail,
      },
    });
  };
  return (
    <Container>
      {isRepresent ? (
        <Layout>
          <Icon isRepresent={isRepresent} onClick={onClickIcon}>
            <AiFillStar />
          </Icon>
          <Message>대표 명렬표</Message>
        </Layout>
      ) : (
        <Layout>
          <Icon isRepresent={isRepresent} onClick={onClickIcon}>
            <AiOutlineStar />
          </Icon>
        </Layout>
      )}
    </Container>
  );
};

export default SetRepresentList;
