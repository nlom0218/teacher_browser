import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import RolesGraphContents from "./RolesGraphContents";

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
  roles?: { work: string; role: string; id: number }[];
  randerRolesExample?: { work: string; role: string; id: number }[];
  register: UseFormRegister<FieldValues>;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
  setRanderRolesExample?: React.Dispatch<React.SetStateAction<{ work: string; role: string; id: number }[]>>;
}

const RolesGraph = ({
  register,
  isAddStudent = false,
  roles,
  setMsg,
  randerRolesExample,
  setRanderRolesExample,
}: IProps) => {
  const [updateWork, setUpdateWork] = useState<null | { type: string; id?: number }>(null);

  useEffect(() => {
    if (!updateWork || !setRanderRolesExample || !randerRolesExample) return;
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
          <input defaultValue={"역할"} readOnly />
          <input defaultValue={"하는 일"} readOnly />
          {isAddStudent && <input defaultValue={"이름"} readOnly />}
        </Head>
        {!isAddStudent &&
          randerRolesExample?.map((role) => {
            return <RolesGraphContents key={role.id} {...role} register={register} setUpdateWork={setUpdateWork} />;
          })}
        {isAddStudent &&
          roles?.map((role) => {
            return (
              <RolesGraphContents
                register={register}
                key={role.id}
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
