import React, { useMemo } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import { useTable } from "react-table";
import styled from "styled-components";
import ScheduleData from "../Components/Schedule/ScheduleData";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
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

const Schedule = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "시간표",
        accessor: "time[0]",
      },
      {
        Header: "월요일",
        accessor: "monday",
      },

      {
        Header: "화요일",
        accessor: "tuesday",
      },
      {
        Header: "수요일",
        accessor: "wednesday",
      },
      {
        Header: "목요일",
        accessor: "thursday",
      },
      {
        Header: "금요일",
        accessor: "friday",
      },
    ],

    []
  );
  const data = React.useMemo(() => ScheduleData(6), []);

  return (
    <BasicContainer menuItem={true}>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </BasicContainer>
  );
};

export default Schedule;
