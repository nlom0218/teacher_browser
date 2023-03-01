import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import BtnContainer from "./Register/BtnContainer";
import Form from "./Register/Form";
import Title from "./Register/Title";
import RolesGraph from "./RolesGraph";

let rolesExample = [
  { role: "에너지 지킴이", work: "교실을 이동할 때 불과 에어컨을 끄고 킵니다.", id: 1 },
  { role: "줄 도우미", work: "이동 시에 친구들이 바르게 줄 설 수 있도록 돕습니다.", id: 2 },
  { role: "자료 나눔이", work: "안내장, 학습 자료를 친구들에게 나눠줍니다.", id: 3 },
  { role: "학급 문고 관리", work: "학급 문고를 청결하게 관리합니다.", id: 4 },
  { role: "우유 배달부", work: "우유를 가져오고 정리합니다.", id: 5 },
  { role: "날씨 알리미", work: "오늘의 날씨, 미세먼지 정도를 친구들에게 알려줍니다.", id: 6 },
  { role: "약사", work: "다친 친구들이기 있으면 치료해줍니다.", id: 7 },
  { role: "숙제 안내", work: "교과별로 해야 할 숙제를 친구들에게 안내합니다.", id: 8 },
  { role: "진도 안내", work: "선생님께 오늘의 수업 진도를 알려드립니다.", id: 9 },
  { role: "안내장 번호 정리", work: "안내장을 번호 순서별로 정리합니다.", id: 10 },
  { role: "판서 도우미", work: "선생님의 판서를 도와드립니다.", id: 11 },
  { role: "칠판", work: "쉬는 시간마다 칠판을 지우고 칠판 주변과 지우개를 청결하게 관리합니다.", id: 12 },
  { role: "앞, 뒤 청소", work: "교실의 앞, 뒤를 쓸어 청소합니다.", id: 13 },
  { role: "물걸레질", work: "바닥을 물걸레로 닦습니다.", id: 14 },
  { role: "손걸레 담당", work: "교실 창틀, 서랍 주변에 먼지가 쌓이지 않게 손걸레질을 합니다.", id: 15 },
  { role: "책상 줄 맞추기", work: "책상 줄을 반듯하게 정리합니다.", id: 16 },
  { role: "특별실 청소", work: "우리반이 맡은 특별 청소 구역을 청소합니다.", id: 17 },
  { role: "쓰레기통 관리", work: "쓰레기통 및 그 주변을 깨끗하게 관리합니다.", id: 18 },
  { role: "신발장 청소", work: "신발장을 청소합니다.", id: 19 },
  { role: "분리 수거 담당", work: "분리수거를 합니다.", id: 20 },
];

const ResetBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 5px 20px;
  padding: 0.3125rem 1.25em;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

type RoleObj = {
  role: string;
  work: string;
  id: number;
  students: [] | [string];
};

const AddRoles = ({ setErrMsg }: IProps) => {
  const [randerRolesExample, setRanderRolesExample] = useState(rolesExample);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    const rolesDetails: RoleObj[] = [];
    randerRolesExample.forEach((item) => {
      rolesDetails.push({
        role: data[`role${item.id}`],
        work: data[`work${item.id}`],
        id: item.id,
        students: [],
      });
    });
    const roles = new Set(rolesDetails.map((item) => item.role));
    if (roles.size !== rolesDetails.length) return setErrMsg("중복된 역할이 존재합니다. 😓");
    localStorage.setItem("roleDetails", JSON.stringify({ roles: rolesDetails }));
    inPopup("rolesPeriod");
  };

  const onError = (error: any) => {
    if (error) setErrMsg("빈 칸이 존재합니다. 😓");
  };

  const onClickResetBtn = () => setRanderRolesExample(rolesExample);

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roleDetails") || "{}");
    if (savedRoles.roles) {
      setRanderRolesExample(savedRoles.roles);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
      <BtnContainer>
        <span>1인 1역 역할 작성 후 저장해 주세요.</span>
        <ResetBtn onClick={onClickResetBtn}>초기화</ResetBtn>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph
        setErrMsg={setErrMsg}
        register={register}
        randerRolesExample={randerRolesExample}
        setRanderRolesExample={setRanderRolesExample}
      />
    </Form>
  );
};

export default AddRoles;
