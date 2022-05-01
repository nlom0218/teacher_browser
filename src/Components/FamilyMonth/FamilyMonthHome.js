import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isFullScreenModeVar } from "../../apollo";
import routes from "../../routes";
import { customMedia } from "../../styles";
import mainImg from "./image/main.png";

const Container = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 20px;
  row-gap: 1.25rem;
  margin: 0 auto;
  max-width: 80%;
  min-width: 80%;
  ${customMedia.greaterThan(`desktop`)`
    max-width: ${(props) => (props.isfullScreenMode ? "40%" : "60%")};
    min-width: ${(props) => (props.isfullScreenMode ? "40%" : "60%")};
  `}
`;

const ImgContainer = styled.img`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const SubImg = styled.img`
  width: 100%;
`;

const TextContainer = styled.div`
  background-color: ${(props) => props.bgColor};
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
`;

const Text = styled.div`
  text-align: center;
  line-height: 120%;
  font-weight: 600;
`;

const Btn = styled.div`
  justify-self: center;
  background-color: ${(props) => props.btnColor};
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  color: #ffffff;
`;

const FamilyMonthHome = () => {
  const navigate = useNavigate();
  const isfullScreenMode = useReactiveVar(isFullScreenModeVar);
  return (
    <Container isfullScreenMode={isfullScreenMode}>
      <ImgContainer src={mainImg} />
      <Layout>
        <SubImg
          src={
            "https://images.unsplash.com/photo-1494599948593-3dafe8338d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
        <TextContainer bgColor="#ffe2e2">
          <Text>
            부모님, 자녀, 할머니, 할아버지 등 가족에 대한 여러분들의 가정의 달
            이야기를 적어주세요!🥳
          </Text>
          <Btn
            btnColor="#ff8989"
            onClick={() => {
              navigate(`${routes.familyMonth}/create`);
            }}
          >
            이야기 쓰기
          </Btn>
        </TextContainer>
      </Layout>
      <Layout>
        <TextContainer bgColor="#AA96DA">
          <Text>
            유튜브에서 이야기와 관련된 영상을 가져오면 티처캔에서 유튜브를
            재생할 수 있습니다.😁
          </Text>
          <Btn
            btnColor="#9166ff"
            onClick={() => {
              window.open("https://www.youtube.com");
            }}
          >
            유튜브로 이동
          </Btn>
        </TextContainer>
        <SubImg
          src={
            "https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
      </Layout>
      <Layout>
        <SubImg
          src={
            "https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
        <TextContainer bgColor="#FCE38A">
          <Text>
            다른 선생님들의 가정의 달 이야기도 함께 나누어 봐요! 좋아요도
            가능합니다.😍
          </Text>
          <Btn
            btnColor="#eab710"
            onClick={() => {
              navigate(`${routes.familyMonth}/list?page=1`);
            }}
          >
            이야기 보기
          </Btn>
        </TextContainer>
      </Layout>
      <Layout>
        <TextContainer bgColor="#EAFFD0">
          <Text>
            자세한 사용방법 및 이벤트 내용은 티처캔 인스타에서 확인하세요!
            팔로우 해주시면 너무 행복합니다.😊
          </Text>
          <Btn
            btnColor="#8dd32c"
            onClick={() => {
              window.open("https://www.instagram.com/teachercan_official/");
            }}
          >
            티처캔 인스타
          </Btn>
        </TextContainer>
        <SubImg
          src={
            "https://images.unsplash.com/photo-1633675254386-dc5bb4279d56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          }
        />
      </Layout>
      <div></div>
    </Container>
  );
};

export default FamilyMonthHome;
