import React, { useMemo,useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import { useTable } from "react-table";
import styled from "styled-components";
import { DivideLeftContents } from "../Components/Shared/styled/DivideContents";
import { customMedia } from "../styles";
import { inputLine } from "../Animations/InputLine";
import { BtnFadeIn } from "../Animations/Fade";
import { inPopup, isPopupVar } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { useForm } from "react-hook-form";
import makeSchedule from "../Components/Schedule/MakeSchedule";


const Container = styled.div`
  min-height: ${props => props.seeResultType==="ONE"&&"100%"};
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
  ${customMedia.greaterThan("desktop")`
   padding:0`}
`;
const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  ${customMedia.greaterThan("tablet")`
   grid-template-columns: 1fr auto;
   column-gap:20px;
   column-gap:1.25rem;
  `}
  ${customMedia.greaterThan("desktop")`
   grid-template-columns: 1fr;
   padding : 20px 20px 0px 0px;
  padding : 1.25rem 1.25rem 0rem 0rem;
  `}
`;
const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
   grid-row : 1/2;
  `}
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`;

const InputLayout = styled.div``;

const LineBox = styled.div`
  position: relative;
`;
const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;
const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease;
`;



const Schedule = () => {

  const media = useMedia();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(undefined);

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "선생님의 시간표" },
  });


  const onClickInput = () => {setIsEdit(true);};
  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit({ title });
  };
  
  const Styles = styled.div`
    padding: 1rem;
    table {
      border-spacing: 0;
      border: 2px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 20px;
        }
      }
    }
    th,
    td {
      margin: 2px;
      padding: 20px;
      border-bottom: 1px solid black;
      border-right: 2px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


const columns = React.useMemo(
  () => [
    {
      Header: "<시간표>",
      accessor: "time"
    },
    {
      Header: "월요일",
      accessor: "monday"
    },

    {
      Header: "화요일",
      accessor: "tuesday"
    },
    {
      Header: "수요일",
      accessor: "wednesday"
    },
    {
      Header: "목요일",
      accessor: "thursday"
    },
    {
      Header: "금요일",
      accessor: "friday"
    }
  ],

  []
);

const data = React.useMemo(() => makeSchedule(6), []);



  return (
    <BasicContainer>
      <DivideLeftContents>
        <Container>
          <TopContents>
            <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
            <InputLayout>
            <Input
            {...register("title",{
              required:true,
              onChange : () => setIsEdit(true),
            })}
            type="text"
            placeholder="제목을 입력하세요"
            autoComplete="off"
            onClick={onClickInput} />
            {isEdit && (
                <LineBox>
                  <Line></Line>
                </LineBox>
              )}
            </InputLayout>
            {isEdit && <SubmitInput type="submit" value="저장" />}
          </Title>
        </TopContents>

    <Styles>
          <Table columns={columns} data={data} />
       </Styles>

        </Container>
      </DivideLeftContents>
    </BasicContainer>
  )
}

export default Schedule;
