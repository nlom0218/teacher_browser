import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcSearch } from "react-icons/fc";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  height: 50px;
  vertical-align: top;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const SchoolNameInput = styled.input`
  background-color: white;
  padding: 10px;
  margin: 10px;
  width: 250px;
  height: 30px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  box-shadow: 5px 5px 5px;
  transition: 0.1s;
  svg {
    font-size: 1.5em;
  }
  &:active {
    margin-left: 15px;
    margin-right: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
    box-shadow: none;
  }
`;

const School = styled.div`
  background-color: white;
  font-size: 1.1em;
  margin: 2px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
`;

export const SchoolNameForm = ({ schoolName, setSchoolCode, setMenu }) => {
  const [schoolList, setSchoolList] = useState();
  const [check, setCheck] = useState(true);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  });

  //학교 정보가 넘어오면 처음에 한번만 학교 표시
  if (schoolName && check) {
    setCheck(false);
    setValue("schoolName", schoolName);
  }

  //학교 검색하기
  const searchSchool = ({ schoolName }) => {
    fetch(
      `https://open.neis.go.kr/hub/schoolInfo` +
      `?KEY=954dac30b088454d9a95700f044ce620` +
      `&Type=json` +
      `&pIndex=1` +
      `&pSize=100` +
      `&SCHUL_NM=${schoolName}`
    )
      .then((response) => response.json())
      .then((json) => {
        setSchoolList();
        //검색 결과가 없을 경우
        if (json.RESULT) {
          setValue("schoolName", json.RESULT.MESSAGE);
          setMenu(["검색 결과가 없습니다."]);
          //검색 결과가 1개일 경우 바로 setSchoolCode
        } else if (json.schoolInfo[1].row.length === 1) {
          setValue("schoolName", `${json.schoolInfo[1].row[0].SCHUL_NM}`);
          setSchoolCode([
            json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
            json.schoolInfo[1].row[0].SD_SCHUL_CODE,
          ]);
          //검색 결과가 2개 이상일 경우
        } else if (json.schoolInfo) {
          setSchoolList(json.schoolInfo[1].row);
          setValue("schoolName", "학교를 선택해주세요.");
          setMenu([]);
        }
      });
  };

  // 검색 결과 학교가 여러 개일 경우 학교 선택 기능
  const onClickSchool = (SCHUL_NM, ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE) => {
    setSchoolCode([ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE]);
    setValue("schoolName", `${SCHUL_NM}`);
    setSchoolList();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(searchSchool)}>
        <SchoolNameInput
          {...register("schoolName")}
          placeholder="학교 이름을 입력해주세요."
          autoComplete="off"
          required
          minLength="3"
          onClick={(obj) => (obj.target.value = "")}
          autoFocus
        />
        <Button>
          <FcSearch />
        </Button>
      </Form>
      {schoolList &&
        schoolList.map((element, index) => (
          <School
            key={index}
            onClick={() =>
              onClickSchool(
                element.SCHUL_NM,
                element.ATPT_OFCDC_SC_CODE,
                element.SD_SCHUL_CODE
              )
            }
          >
            {element.SCHUL_NM}({element.ORG_RDNMA})
          </School>
        ))}
    </>
  );
};
