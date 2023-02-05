import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { inPopup } from "../apollo";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";

let rolesExample = [
  { role: "에너지 지킴이", work: "교실을 이동할 때 불과 에어컨을 끄고 킵니다.", id: 1 },
  { role: "칠판청소", work: "칠판을 닦고 칠판지우개를 관리합니다.", id: 2 },
  { role: "앞, 뒤 청소", work: "교실의 앞, 뒤를 깨끗하게 청소합니다.", id: 3 },
  { role: "책상 줄 맞추기", work: "책상 줄을 맞춥니다.", id: 4 },
  { role: "안내장 번호 정리", work: "안내장을 번호순으로 정리합니다.", id: 5 },
  { role: "자료 나눔이", work: "안내장을 나누어 줍니다.", id: 6 },
  { role: "줄당번", work: "친구들이 줄을 잘 맞추어서 서게 돕습니다.", id: 7 },
  { role: "쓰레기통 관리", work: "쓰레기통 주변을 정리하고 쓰레기통을 비웁니다.", id: 8 },
  { role: "학급문고 관리", work: "학급 문고를 청결하게 정리합니다.", id: 9 },
  { role: "물걸레질", work: "교실을 물걸레로 청결하게 정리합니다.", id: 10 },
];

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

type RoleObj = {
  role: string;
  work: string;
  id: number;
  students: [] | [string];
};

const RolesSetting = ({ setErrMsg }: IProps) => {
  const [randerRolesExample, setRanderRolesExample] = useState(rolesExample);
  const [savedRoles, setSavedRoles] = useState<null | { work: string; role: string }[]>(
    JSON.parse(localStorage.getItem("roleDetails") || "{}").roles,
  );

  const { register, handleSubmit, setValue } = useForm({
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
    localStorage.setItem("roleDetails", JSON.stringify({ roles: rolesDetails }));
    inPopup("rolesPeriod");
  };

  const onError = (error: any) => {
    if (error) setErrMsg("빈 칸이 존재합니다. 😓");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
      <BtnContainer>
        <span>1인 1역 역할 작성 후 저장해 주세요.</span>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph
        register={register}
        savedRoles={savedRoles}
        randerRolesExample={randerRolesExample}
        setRanderRolesExample={setRanderRolesExample}
      />
    </Form>
  );
};

export default RolesSetting;
