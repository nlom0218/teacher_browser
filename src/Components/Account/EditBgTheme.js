import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { BsCheckLg } from "react-icons/bs";
import { UPDATE_USER_BGTHEME_MUTATION } from "../../Graphql/User/mutation";
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import { customMedia } from "../../styles";
import { bgThemeAniVar, bgThemeVar, editBgTheme, enableBgThemeAni } from "../../apollo";
import Loading from "../Shared/Loading";

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
  /* cursor: ${props => props.bgThemeAni ? "progress" : "pointer"}; */
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;
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
  /* cursor: ${props => props.bgThemeAni ? "progress" : "pointer"}; */
  cursor: pointer;
  svg {
    margin-right: 10px;
    margin-right: 0.625rem;
  }
`

const EditBg = ({ userEmail, setMsg }) => {
  const bgThemeAni = useReactiveVar(bgThemeAniVar)
  const bgTheme = useReactiveVar(bgThemeVar)
  const bgColorArr = [
    "#F44336", "#E91E62", "#9C27B0", "#673AB6", "#3F50B5", "#2096F3",
    "#00A8F4", "#00BCD4", "#009688", "#4CAF4F", "#8BC24A", "#CDDC39",
    "#FFEB3A", "#FFC007", "#FF9800", "#FF5721", "#795548", "#607D8A"
  ]

  const onCompleted = (result) => {
    const { updateUser: { ok } } = result
    if (ok) {
      setMsg("??????????????? ?????????????????????. ????")
    }
  }

  const [updateBgTheme, { loading }] = useMutation(UPDATE_USER_BGTHEME_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });

  //select??? default value??? user collection??? ????????? bgTheme ????????? ??????
  //useForm??? defaultValues?????? ??? ??????... useMe()??? db?????? ??????????????? ???????????? ???????????
  const [check, setCheck] = useState(true);
  if (check && bgTheme) {
    setCheck(false);
    setValue("bgTheme", bgTheme);
  }


  const onClickColorBgTheme = (color) => {
    // if (!bgThemeAni) {
    enableBgThemeAni()
    editBgTheme(color)
    updateBgTheme({
      variables: {
        userEmail: userEmail,
        bgTheme: color,
      },
    });
    // }
  }

  const onClickBgTheme = (bgTheme) => {
    // if (!bgThemeAni) {
    if (bgTheme) {
      // ??????????????? ???????????? ?????? ??? ??? ?????????? refetchQuery??? me????????? ?????? ?????????????
      // ?????? ???????????? ?????? ?????? ????????? ????????? ??? ????????? ??? ?????? ?????? ???????????? ??? ??????????
      editBgTheme(bgTheme)
      updateBgTheme({
        variables: {
          userEmail: userEmail,
          bgTheme: bgTheme,
        },
      });
    }
    // }
  };

  const handleClick = () => {
    //?????? ?????? ??????
    //<GlobalStyle> ??????????????? ????????? ???????????? ??? ??????????
    console.log("?????? ??? ???");
  };

  return (
    <Container>
      <ColorBgTheme>
        <Title>??? ??????</Title>
        {bgColorArr.map((item, index) => {
          return <ColorBgThemeItem
            key={index}
            color={item}
            onClick={() => onClickColorBgTheme(item)}
            bgThemeAni={bgThemeAni}
          >
            {bgTheme === item && <BsCheckLg />}
          </ColorBgThemeItem>
        })}
      </ColorBgTheme>
      <RandomBgTheme>
        <Title>??? ?????? ?????????</Title>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("nature")}>
          {bgTheme === "nature" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("city")}>
          {bgTheme === "city" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("cat")}>
          {bgTheme === "cat" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>?????????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("dog")}>
          {bgTheme === "dog" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>?????????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("space")}>
          {bgTheme === "space" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("cafe")}>
          {bgTheme === "cafe" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("food")}>
          {bgTheme === "food" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
        <BgThemeItem bgThemeAni={bgThemeAni} onClick={() => onClickBgTheme("school")}>
          {bgTheme === "school" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>??????</div>
        </BgThemeItem>
      </RandomBgTheme>
      {/* <Form onChange={handleSubmit(onChange)}>
        <select {...register("bgTheme")}>
          <option value="">???????????? ????????? ??????????????????.</option>
          <option value="nature">??????</option>
          <option value="cat">?????????</option>
          <option value="dog">?????????</option>
        </select>
      </Form>
      <RegisterBtn onClick={handleClick}>???????????? ????????????</RegisterBtn> */}
      {loading && <Loading page="center" />}
    </Container>
  );
};

export default EditBg;
