import { outPopup } from "../../../apollo";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

interface IProps {
  studentVaild: boolean;
  rolesVaild: boolean;
}

const ComfirmRolesSave = ({ studentVaild, rolesVaild }: IProps) => {
  const onClickCancelBtn = () => {
    outPopup();
  };
  return (
    <BtnPopupContainer preventOutPoup={true}>
      <div onClick={onClickCancelBtn}>ddd</div>
    </BtnPopupContainer>
  );
};

export default ComfirmRolesSave;
