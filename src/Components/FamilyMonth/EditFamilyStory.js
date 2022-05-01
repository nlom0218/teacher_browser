import React from "react";
import MainContentsLayout from "./MainContentsLayout";

const EditFamilyStory = ({ userEmail }) => {
  console.log(userEmail);
  // 로그인 한 유저와 수정하는 게시물의 유저가 다르다면 홈 화면으로 이동하기
  return <MainContentsLayout></MainContentsLayout>;
};

export default EditFamilyStory;
