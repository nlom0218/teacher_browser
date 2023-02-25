import { useRef, useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import media from "styled-media-query";
import { TRecentRole, TRolesDate } from "./RolesMain";

const BG_ONE = "https://media.discordapp.net/attachments/1012001449854648480/1078821175309897829/rolesBackground1.png";
const BG_TWO = "https://media.discordapp.net/attachments/1012001449854648480/1078821175599317083/rolesBackground2.png";
const BG_THREE =
  "https://media.discordapp.net/attachments/1012001449854648480/1078821175796437042/rolesBackground3.png";
const BG_FOUR = "https://media.discordapp.net/attachments/1012001449854648480/1078821176048103544/rolesBackground4.png";
const BG_FIVE = "https://media.discordapp.net/attachments/1012001449854648480/1078821176266211451/rolesBackground5.png";
const BG_SIX = "https://media.discordapp.net/attachments/1012001449854648480/1078821176522051704/rolesBackground6.png";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  padding: 40px;
  min-height: 100%;
`;

const PrintSetting = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 40px;
  align-items: flex-start;
  .title {
    font-size: 1.5em;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const SelectedBackground = styled.div`
  display: grid;
  row-gap: 20px;
`;

interface IBackgrounds {
  isFullScreen: boolean;
}

const Backgrounds = styled.div<IBackgrounds>`
  display: grid;
  row-gap: 20px;
  justify-items: flex-start;
  grid-template-columns: ${(props) => (props.isFullScreen ? "repeat(6, 1fr)" : "repeat(4, 1fr)")};
`;

interface IRolesBackground {
  url: string;
}

interface IRolesBackground {
  isSelected: boolean;
}

const RolesBackground = styled.div<IRolesBackground>`
  position: relative;
  background-image: ${(props) => `url(${props.url})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 210px;
  height: 290px;
  border: 2px solid ${(props) => (props.isSelected ? props.theme.redColor : "none")};
  cursor: pointer;
`;

const Message = styled.div`
  justify-self: flex-end;
  left: 0.625rem;
  opacity: 0.8;
  font-size: 700;
`;

interface IPrintContainer {
  bgUrl?: string;
  isLong: boolean;
}

const PrintContainer = styled.div<IPrintContainer>`
  justify-self: flex-end;
  width: 21cm;
  min-height: 29.7cm;
  background-image: ${(props) => `url(${props.bgUrl})`};
  background-position: center;
  background-size: contain;
  padding: ${(props) => (props.isLong ? "7.5cm 1.5cm 2cm" : "8.5cm 1.5cm 2cm")};
  break-after: page;

  @media print {
    display: grid;
    column-gap: 10px;
  }
  @page {
    size: A4;
  }
`;

const PrintLayout = styled.div`
  min-height: 100%;
  max-height: 100%;
  border: 2px solid #fd1b1bcf;
  display: grid;
  .main-table {
    border-bottom: 2px solid #fd1b1b9f;
    background-color: #ff9191;
  }
`;

const TableLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  text-align: center;
  font-size: 0.825rem;
  font-size: 0.825em;
  line-height: 160%;
  :nth-child(2n + 3) {
    background-color: #ff919198;
  }
  :nth-child(2n) {
    background-color: #f9f9f996;
  }
  .hidden {
    opacity: 0;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0px;
    :nth-child(2) {
      border-right: 2px solid #fd1b1b9f;
      border-left: 2px solid #fd1b1b9f;
    }
  }
  .main {
    font-size: 1em;
    font-size: 1rem;
    font-weight: 700;
  }
`;

interface IProps {
  roles?: TRecentRole[];
  date?: TRolesDate;
}

const PrintRoles = ({ roles, date }: IProps) => {
  const componentRef = useRef(null);
  const isFullScreen = localStorage.getItem("fullScreen");
  const [bgUrl, setBgUrl] = useState<string | undefined>();

  const onClickBackground = (bg: string) => {
    setBgUrl(bg);
  };

  const onClickPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(roles, date);
  return (
    <Container>
      <PrintSetting>
        <div className="title">1인 1역 프린트</div>
        <SelectedBackground>
          <div className="sub-title">🖼️ 배경화면 선택</div>
          <Backgrounds isFullScreen={Boolean(isFullScreen)}>
            <RolesBackground
              isSelected={bgUrl === BG_ONE}
              onClick={() => {
                onClickBackground(BG_ONE);
              }}
              url={BG_ONE}
            ></RolesBackground>
            <RolesBackground
              isSelected={bgUrl === BG_TWO}
              onClick={() => {
                onClickBackground(BG_TWO);
              }}
              url={BG_TWO}
            ></RolesBackground>
            <RolesBackground
              isSelected={bgUrl === BG_THREE}
              onClick={() => {
                onClickBackground(BG_THREE);
              }}
              url={BG_THREE}
            ></RolesBackground>
            <RolesBackground
              isSelected={bgUrl === BG_FOUR}
              onClick={() => {
                onClickBackground(BG_FOUR);
              }}
              url={BG_FOUR}
            ></RolesBackground>
            <RolesBackground
              isSelected={bgUrl === BG_FIVE}
              onClick={() => {
                onClickBackground(BG_FIVE);
              }}
              url={BG_FIVE}
            ></RolesBackground>
            <RolesBackground
              isSelected={bgUrl === BG_SIX}
              onClick={() => {
                onClickBackground(BG_SIX);
              }}
              url={BG_SIX}
            ></RolesBackground>
          </Backgrounds>
        </SelectedBackground>
        <Message>
          <div onClick={onClickPrint}>인쇄하기</div>
          <div>1인 1역 인쇄는 A4용지에 최적화 되어있습니다.</div>
        </Message>
      </PrintSetting>
      <PrintContainer ref={componentRef} bgUrl={bgUrl} isLong={bgUrl !== BG_ONE}>
        {roles && (
          <PrintLayout>
            <TableLayout className="main-table">
              <div className="main">역할</div>
              <div className="main">하는 일</div>
              <div className="main">이름</div>
            </TableLayout>
            {roles?.map((item, key) => (
              <TableLayout key={key}>
                <div>{item.title}</div>
                <div>{item.detail}</div>
                <div>{item.students.map((item) => item.studentName).join(", ")}</div>
              </TableLayout>
            ))}
            {new Array(25 - roles?.length - 1).fill(null).map((item, key) => {
              return (
                <TableLayout key={key}>
                  <div>
                    <div className="hidden">sss</div>
                  </div>
                  <div>
                    <div className="hidden">sss</div>
                  </div>
                  <div>
                    <div className="hidden">sss</div>
                  </div>
                </TableLayout>
              );
            })}
          </PrintLayout>
        )}
      </PrintContainer>
    </Container>
  );
};

export default PrintRoles;
