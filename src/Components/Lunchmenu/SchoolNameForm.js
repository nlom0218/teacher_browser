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
  &:active {
    margin-left: 15px;
    margin-right: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
    box-shadow: none;
  }
`;

export const SchoolNameForm = ({ setSchoolCode }) => {
  const { register, handleSubmit, setValue } = useForm();

  //학교 설정하기
  const searchSchool = ({ schoolName, setMenu }) => {
    fetch(
      `https://open.neis.go.kr/hub/schoolInfo` +
        `?KEY=${process.env.REACT_APP_MENU_API_KEY}` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&SCHUL_NM=${schoolName}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.RESULT) {
          setValue("schoolName", json.RESULT.MESSAGE);
          setMenu(["검색 결과가 없습니다."]);
        } else if (json.schoolInfo[1].row.length === 1) {
          setValue(
            "schoolName",
            `${json.schoolInfo[1].row[0].SCHUL_NM}(${json.schoolInfo[1].row[0].ATPT_OFCDC_SC_NM})`
          );
          setSchoolCode([
            json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
            json.schoolInfo[1].row[0].SD_SCHUL_CODE,
          ]);
        } else if (json.schoolInfo) {
          setValue("schoolName", "검색 결과가 너무 많습니다.");
        }
      });
  };

  return (
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
  );
};
