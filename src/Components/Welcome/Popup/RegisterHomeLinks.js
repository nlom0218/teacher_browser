import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_HOME_LINKS_MUTATION, EDIT_HOME_LINK_MUTATION } from "../../../Graphql/User/mutation";
import { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import Loading from "../../Shared/Loading";

const Container = styled.form`
  letter-spacing: 0px;
  letter-spacing: 0rem;
  text-align: start;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`;

const Warpper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
`;

const Input = styled.input`
  padding: 15px 20px;
  padding: 0.938rem 1.25rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.originBgColor};
`;

const SubmitInput = styled.input`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const RegisterHomeLinks = ({ setMsg, setErrMsg, userEmail, links, userId, setLinks }) => {
  const homeLinkID = parseInt(localStorage.getItem("homeLinkID"));
  const [createID, setCreateID] = useState(undefined);
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });
  const [createHomeLinks, { loading }] = useMutation(CREATE_HOME_LINKS_MUTATION, {
    onCompleted: (result) => {
      const {
        createHomeLinks: { ok },
      } = result;
      if (ok) {
        outPopup();
        setMsg("즐겨찾기가 추가되었습니다.😀");
      }
    },
    update(
      cache,
      {
        data: {
          createHomeLinks: { ok },
        },
      },
    ) {
      if (ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            homeLinks(prev) {
              return [
                ...prev,
                {
                  ID: createID,
                  title: getValues("title"),
                  link: `https://www.${getValues("link")}`,
                },
              ];
            },
          },
        });
      }
    },
  });

  const [editHomeLink, { loading: editLoading }] = useMutation(EDIT_HOME_LINK_MUTATION, {
    onCompleted: (result) => {
      const {
        editHomeLink: { ok },
      } = result;
      if (ok) {
        outPopup();
        localStorage.removeItem("homeLinkID");
        setMsg("즐겨찾기가 수정되었습니다.😀");
      }
    },
    update(
      cache,
      {
        data: {
          editHomeLink: { ok },
        },
      },
    ) {
      if (ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            homeLinks(prev) {
              const copyHomeLinks = [...prev];
              const targetIndex = copyHomeLinks.findIndex((item) => item.ID === homeLinkID);
              return [
                ...copyHomeLinks.slice(0, targetIndex),
                {
                  ID: homeLinkID,
                  title: getValues("title"),
                  link: `https://www.${getValues("link")}`,
                },
                ...copyHomeLinks.slice(targetIndex + 1),
              ];
            },
          },
        });
      }
    },
  });

  const onSubmit = (data) => {
    const { title, link } = data;
    if (!title) {
      setErrMsg("이름를 입력하세요.😂");
      return;
    }
    if (!link) {
      setErrMsg("링크를 입력하세요.😂");
      return;
    }
    const ID = new window.Date().getTime();
    setCreateID(ID);
    if (homeLinkID) {
      setLinks((prev) => {
        const copyHomeLinks = [...prev];
        const targetIndex = copyHomeLinks.findIndex((item) => item.ID === homeLinkID);
        return [
          ...copyHomeLinks.slice(0, targetIndex),
          {
            ID: homeLinkID,
            title: getValues("title"),
            link: `https://www.${getValues("link")}`,
          },
          ...copyHomeLinks.slice(targetIndex + 1),
        ];
      });
      editHomeLink({
        variables: {
          userEmail,
          title,
          link: `https://www.${link}`,
          ID: homeLinkID,
        },
      });
    } else {
      setLinks((prev) => {
        return [
          ...prev,
          {
            ID,
            title: getValues("title"),
            link: `https://www.${getValues("link")}`,
          },
        ];
      });
      createHomeLinks({
        variables: {
          userEmail,
          title,
          link: `https://www.${link}`,
          ID,
        },
      });
    }
  };

  useEffect(() => {
    if (homeLinkID) {
      const curHomeLink = links.filter((item) => item.ID === homeLinkID)[0];
      setValue("title", curHomeLink?.title);
      setValue("link", curHomeLink?.link.substring(12));
    }
  }, [links]);

  if (loading || editLoading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title>바로가기 {homeLinkID ? "수정" : "추가"}</Title>
        <InputLayout>
          <Icon>
            <BsFillPencilFill />
          </Icon>
          <Input {...register("title")} autoComplete="off" placeholder="이름을 입력하세요." />
        </InputLayout>
        <InputLayout type="url">
          <Icon>
            <AiOutlineLink />
          </Icon>
          <Warpper>
            <div>https://www.</div>
            <Input {...register("link")} autoComplete="off" placeholder="나머지 URL을 입력하세요." />
          </Warpper>
        </InputLayout>
        <SubmitInput type="submit" value={homeLinkID ? "수정하기" : "추가하기"} />
      </Container>
    </PopupContainer>
  );
};

export default RegisterHomeLinks;
