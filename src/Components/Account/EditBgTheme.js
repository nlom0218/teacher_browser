import { useMutation } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { ME_QUERY } from "../../Hooks/useMe";
import { useForm } from "react-hook-form";
import BtnContainer from "./styled/BtnContainer";
import RegisterBtn from "./styled/RegisterBtn";
import { UPDATE_USER_BGTHEME_MUTATION } from "../../Graphql/User/mutation";

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Form = styled.form`
  padding: 10px;
  padding: 0.625rem;
`;

const EditBg = ({ userEmail, bgTheme }) => {
  const [updateBgTheme] = useMutation(UPDATE_USER_BGTHEME_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });

  //select의 default value를 user collection에 저장된 bgTheme 값으로 설정
  //useForm의 defaultValues로는 안 된다... useMe()로 db값을 불러오는데 딜레이가 있어서??
  const [check, setCheck] = useState(true);
  if (check && bgTheme) {
    setCheck(false);
    setValue("bgTheme", bgTheme);
  }

  const onChange = ({ bgTheme }) => {
    if (bgTheme) {
      // 배경화면만 리렌더링 되는 거 왜 그럴까? refetchQuery로 me쿼리를 다시 불러와서?
      // 값을 변경했다 다시 원래 값으로 변경할 때 사진이 왜 바로 다른 사진으로 안 바뀌지?
      updateBgTheme({
        variables: {
          userEmail: userEmail,
          bgTheme: bgTheme,
        },
      });
    }
  };

  const handleClick = () => {
    //기능 구현 예정
    //<GlobalStyle> 컴포넌트를 어떻게 리렌더링 할 것인가?
    console.log("아직 안 됨");
  };

  return (
    <Container>
      <BtnContainer>
        <Form onChange={handleSubmit(onChange)}>
          <select {...register("bgTheme")}>
            <option value="">배경화면 테마를 선택해주세요.</option>
            {/* 원하는 값을 아래에 추가 */}
            <option value="nature">자연</option>
            <option value="cat">고양이</option>
            <option value="dog">강아지</option>
          </select>
        </Form>
        <RegisterBtn onClick={handleClick}>배경화면 새로고침</RegisterBtn>
      </BtnContainer>
    </Container>
  );
};

export default EditBg;
