import { useEffect, useState } from "react";

const useTitle = (iniitialTitle) => {
  const [title, setTitle] = useState(iniitialTitle); // useTitle의 매개변수 iniitialTitle를 초기값으로 설정
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]); // 컴포넌트가 마운트 될 때와 title이 업데이트 될 때, updateTitle 실행
  return setTitle;
};

export default useTitle;
