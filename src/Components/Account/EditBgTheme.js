import { useMutation } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { ME_QUERY } from "../../Hooks/useMe";
import { useForm } from "react-hook-form";
import { BsCheckLg } from "react-icons/bs";
import { UPDATE_USER_BGTHEME_MUTATION } from "../../Graphql/User/mutation";
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { customMedia } from "../../styles";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const ColorBgTheme = styled.div`
  row-gap: 10px;
  row-gap: 0.625rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(9, 1fr);
  `}
`

const Title = styled.div`
  grid-column: 1 / -1;
`

const ColorBgThemeItem = styled.div`
  height: 35px;
  height: 2.1875rem;
  background-color: ${props => props.color};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;
  svg {
    /* filter: drop-shadow(0px 0px 2px rgb(255, 255, 255)) */
  }
`

const RandomBgTheme = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: flex-start;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`

const BgThemeItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 10px;
    margin-right: 0.625rem;
  }
`

const Form = styled.form`
  padding: 10px;
  padding: 0.625rem;
`;

const EditBg = ({ userEmail, bgTheme }) => {
  const bgColorArr = [
    "#F44336", "#E91E62", "#9C27B0", "#673AB6", "#3F50B5", "#2096F3",
    "#00A8F4", "#00BCD4", "#009688", "#4CAF4F", "#8BC24A", "#CDDC39",
    "#FFEB3A", "#FFC007", "#FF9800", "#FF5721", "#795548", "#607D8A"
  ]
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

  const onClickColorBgTheme = (color) => {
    updateBgTheme({
      variables: {
        userEmail: userEmail,
        bgTheme: color,
      },
    });
  }

  const onClickBgTheme = (bgTheme) => {
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
      <ColorBgTheme>
        <Title>✲ 단색</Title>
        {bgColorArr.map((item, index) => {
          return <ColorBgThemeItem
            key={index}
            color={item}
            onClick={() => onClickColorBgTheme(item)}
          >
            {bgTheme === item && <BsCheckLg />}
          </ColorBgThemeItem>
        })}
      </ColorBgTheme>
      <RandomBgTheme>
        <Title>✲ 랜덤 이미지</Title>
        <BgThemeItem onClick={() => onClickBgTheme("nature")}>
          {bgTheme === "nature" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>자연</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("city")}>
          {bgTheme === "city" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>도시</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("cat")}>
          {bgTheme === "cat" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>고양이</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("dog")}>
          {bgTheme === "dog" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>강아지</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("space")}>
          {bgTheme === "space" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>우주</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("cafe")}>
          {bgTheme === "cafe" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>카페</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("food")}>
          {bgTheme === "food" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>음식</div>
        </BgThemeItem>
        <BgThemeItem onClick={() => onClickBgTheme("school")}>
          {bgTheme === "school" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>학교</div>
        </BgThemeItem>
      </RandomBgTheme>
      {/* <Form onChange={handleSubmit(onChange)}>
        <select {...register("bgTheme")}>
          <option value="">배경화면 테마를 선택해주세요.</option>
          <option value="nature">자연</option>
          <option value="cat">고양이</option>
          <option value="dog">강아지</option>
        </select>
      </Form>
      <RegisterBtn onClick={handleClick}>배경화면 새로고침</RegisterBtn> */}
    </Container>
  );
};

export default EditBg;
