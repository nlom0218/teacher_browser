import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import RolesGraphContents from "./RolesGraphContents";

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

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  text-align: center;
`;

const Layout = styled.div`
  max-height: 100%;
  background-color: ${(props) => props.theme.contentBgColor};
  transition: background-color 1s ease;
  display: grid;
  row-gap: 2px;
  row-gap: 0.126rem;
  overflow: scroll;
`;

interface IHead {
  isAddStudent: boolean;
}

const Head = styled.div<IHead>`
  display: grid;
  grid-template-columns: ${(props) => (props.isAddStudent ? "1fr 3fr 1.5fr" : "1fr 3fr")};
  column-gap: 2px;
  column-gap: 0.126rem;
  font-weight: 700;
  input {
    background-color: ${(props) => props.theme.skyblue};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
  }
`;

interface IProps {
  isAddStudent?: boolean;
  roles?: { work: string; role: string }[];
  savedRoles?: null | { work: string; role: string }[];
  register: UseFormRegister<FieldValues>;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesGraph = ({ register, isAddStudent = false, roles, setMsg, savedRoles }: IProps) => {
  const [updateWork, setUpdateWork] = useState<null | { type: string; id?: number }>(null);
  const [randerRolesExample, setRanderRolesExample] = useState(rolesExample);

  useEffect(() => {
    if (!updateWork) return;
    const { type, id } = updateWork;
    if (type === "remove") setRanderRolesExample((prev) => prev.filter((role) => role.id !== id));
    if (type === "add") {
      const idx = randerRolesExample.findIndex((role) => role.id === id);
      const copyRoles = [...randerRolesExample];
      copyRoles.splice(idx + 1, 0, { role: "", work: "", id: Date.now() });
      setRanderRolesExample(copyRoles);
    }
  }, [updateWork]);

  return (
    <Container>
      <Layout>
        <Head isAddStudent={isAddStudent}>
          <input defaultValue={"역할"} />
          <input defaultValue={"하는 일"} />
          {isAddStudent && <input defaultValue={"이름"} />}
        </Head>
        {!savedRoles &&
          !isAddStudent &&
          randerRolesExample.map((role, idx) => {
            return (
              <RolesGraphContents key={role.id} {...role} idx={idx} register={register} setUpdateWork={setUpdateWork} />
            );
          })}
        {/* {savedRoles &&
          !isAddStudent &&
          savedRoles.map((role, idx) => {
            return (
              <RolesGraphContents key={idx} idx={idx} register={register} savedRole={role.role} savedWork={role.work} />
            );
          })}
        {isAddStudent &&
          roles?.map((role, idx) => {
            return (
              <RolesGraphContents
                register={register}
                idx={idx}
                key={idx}
                {...role}
                isAddStudent={isAddStudent}
                setMsg={setMsg}
              />
            );
          })} */}
      </Layout>
    </Container>
  );
};

export default RolesGraph;
