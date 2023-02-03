import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import RolesGraphContents from "./RolesGraphContents";

let rolesExample = [
  { role: "에너지 지킴이", work: "교실을 이동할 때 불과 에어컨을 끄고 킵니다." },
  { role: "칠판청소", work: "칠판을 닦고 칠판지우개를 관리합니다." },
  { role: "앞, 뒤 청소", work: "교실의 앞, 뒤를 깨끗하게 청소합니다." },
  { role: "책상 줄 맞추기", work: "책상 줄을 맞춥니다." },
  { role: "안내장 번호 정리", work: "안내장을 번호순으로 정리합니다." },
  { role: "자료 나눔이", work: "안내장을 나누어 줍니다." },
  { role: "줄당번", work: "친구들이 줄을 잘 맞추어서 서게 돕습니다." },
  { role: "쓰레기통 관리", work: "쓰레기통 주변을 정리하고 쓰레기통을 비웁니다." },
  { role: "학급문고 관리", work: "학급 문고를 청결하게 정리합니다." },
  { role: "물걸레질", work: "교실을 물걸레로 청결하게 정리합니다." },
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
  lineNums?: number;
  isAddStudent?: boolean;
  roles?: { work: string; role: string }[];
  register: UseFormRegister<FieldValues>;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesGraph = ({ lineNums = 9, register, isAddStudent = false, roles, setMsg }: IProps) => {
  const [randerRolesExample, setRanderRolesExample] = useState(rolesExample);

  useEffect(() => {
    if (lineNums < 10) {
      return setRanderRolesExample(rolesExample.slice(0, lineNums + 1));
    }
  }, [lineNums]);
  return (
    <Container>
      <Layout>
        <Head isAddStudent={isAddStudent}>
          <input defaultValue={"역할"} />
          <input defaultValue={"하는 일"} />
          {isAddStudent && <input defaultValue={"이름"} />}
        </Head>
        {!isAddStudent &&
          randerRolesExample.map((role, idx) => {
            return <RolesGraphContents key={idx} {...role} idx={idx} register={register} />;
          })}
        {!isAddStudent &&
          lineNums > 9 &&
          new Array(lineNums - 9).fill(null).map((_, idx) => {
            return <RolesGraphContents key={idx} idx={idx + 10} register={register} />;
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
          })}
      </Layout>
    </Container>
  );
};

export default RolesGraph;
