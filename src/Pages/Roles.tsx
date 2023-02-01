import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AlertMessage from "../Components/Shared/AlertMessage";
import RolesSetting from "./RolesSetting";

const Roles = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // 데이터 베이스에서 현재 기간의 1인 1역을 가져와야 함
  // 이를 바탕으로 1인 1역 디테일로 이동 - 3번째 창

  // 저장된 1인 1역이 없으면 초기 설정 부터 해야 함 - 1번째 창

  useEffect(() => {
    navigate("/roles/setting", { replace: true });
  }, []);
  return (
    <React.Fragment>
      <Routes>
        <Route path=":id" element={<div>디테일</div>} />
        <Route path="setting" element={<RolesSetting setErrMsg={setErrMsg} />} />
      </Routes>
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
    </React.Fragment>
  );
};

export default Roles;
