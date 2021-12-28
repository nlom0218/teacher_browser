import React from "react";
import BasicContainer from "../Components/Shared/BasicContainer";

const Schedule = () => {
  return (
    <BasicContainer menuItem={true}>
      시간표
      <table class="scheduletable">
        <thead>
          <tr>
            <th scope="cols">시간표</th>
            <th scope="cols">월요일</th>
            <th scope="cols">화요일</th>
            <th scope="cols">수요일</th>
            <th scope="cols">목요일</th>
            <th scope="cols">금요일</th>
            <th scope="cols">토요일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1교시</th>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
          </tr>
          <tr>
            <th scope="row">2교시</th>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
          </tr>
          <tr>
            <th scope="row">3교시</th>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
          </tr>
          <tr>
            <th scope="row">4교시</th>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
          </tr>
          <tr>
            <th scope="row">5교시</th>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
            <td>과목/교사/장소</td>
          </tr>
          <tr>
            <th scope="row">6교시</th>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
          </tr>
          <tr>
            <th scope="row">방과후</th>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
            <td>
              과목
              <br />
              교사
              <br />
              장소
            </td>
          </tr>
        </tbody>
      </table>
    </BasicContainer>
  );
};

export default Schedule;
