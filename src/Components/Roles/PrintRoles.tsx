import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import { TRecentRole, TRolesDate } from "./RolesMain";

const colorTable = [
  ["#7272729f", "#5b5b5b97", "#7171718e", "#f9f9f996"],
  ["#fd1b1bd6", "#fd1b1b7f", "#fd1b1b35", "#f9f9f996"],
  ["#fd841bd5", "#fd9b1b7d", "#fd9b1b35", "#f9f9f996"],
  ["#fdea1bd5", "#f5fd1b7e", "#fddb1b35", "#f9f9f996"],
  ["#e6fd1bd5", "#c8fd1b7e", "#e3fd1b35", "#f9f9f996"],
  ["#6efd1bd5", "#75fd1b7e", "#84fd1b35", "#f9f9f996"],
  ["#1ffd1bd5", "#44fd1b7e", "#50fd1b35", "#f9f9f996"],
  ["#1bfdb2d4", "#1bfd887e", "#1bfda635", "#f9f9f996"],
  ["#1bb5fdd5", "#1beefd7e", "#1bfddf35", "#f9f9f996"],
  ["#1b1bfdd5", "#1b23fd7e", "#1b2afd35", "#f9f9f996"],
  ["#841bfdd5", "#b21bfd7e", "#c11bfd35", "#f9f9f996"],
  ["#fd1bb9d5", "#fd1bd07e", "#fd1bee35", "#f9f9f996"],
];

const fontTable = [
  { name: "땅스부대찌개", style: "TTTtangsbudaejjigaeB" },
  { name: "김정철명조", style: "KimjungchulMyungjo-Bold" },
  { name: "Rix할매의꽃담", style: "RixMomsBlanketR" },
  { name: "KCC무럭무럭체", style: "KCCMurukmuruk" },
  { name: "거친둘기마요", style: "Dovemayo_wild" },
  { name: "안성탕면체", style: "Ansungtangmyun-Bold" },
  { name: "웰컴체", style: "OTWelcomeRA" },
  { name: "코트라 희망체", style: "KOTRAHOPE" },
  { name: "함렛", style: "Hahmlet-Regular" },
  { name: "Gmarket Sans", style: "GmarketSansMedium" },
];

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
  row-gap: 2.5rem;
  padding: 40px;
  padding: 2.5rem;
  min-height: 100%;
`;

const PrintSetting = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  align-items: flex-start;
  .title {
    font-size: 1.5em;
    font-size: 1.5rem;
    font-weight: 700;
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

const Message = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  left: 0.625rem;
  opacity: 0.8;
  font-weight: 400;
  font-size: 1em;
  font-size: 1rem;
`;

const SelectedContainer = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  .sub-title {
    font-weight: 700;
  }
`;

interface IBackgrounds {
  isFullScreen: boolean;
}

const Backgrounds = styled.div<IBackgrounds>`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
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

const ColorBoxLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

interface IColorBox {
  selected: boolean;
}

const ColorBox = styled.div<IColorBox>`
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.selected && props.theme.originBgColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: repeat(4, auto);
  cursor: pointer;
  input {
    background-color: ${(props) => props.color};
    height: 40px;
  }
`;

interface IColor {
  color: string;
}

const Color = styled.div<IColor>`
  background-color: ${(props) => props.color};
  height: 40px;
`;

const FontLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

interface IFont {
  font: string;
  isSelected: boolean;
}

const Font = styled.div<IFont>`
  justify-self: flex-start;
  font-family: ${(props) => props.font};
  padding: 5px 20px;
  padding: 0.3125em 1.25rem;
  background-color: ${(props) => props.isSelected && props.theme.originBgColor};
  transition: background-color 1s ease;
  font-size: 1.25rem;
  font-size: 1.25em;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

interface IPrevViewRoles {
  font: string;
}

const PrevViewRoles = styled.div<IPrevViewRoles>`
  justify-self: center;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  .text {
    text-align: center;
    font-size: 1.25em;
    font-size: 1.25rem;
    font-weight: 700;
    font-family: ${(props) => props.font};
  }
  .btn {
    font-family: ${(props) => props.font};
    text-align: center;
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.bgColor};
    padding: 10px;
    padding: 0.625rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

interface IPrintContainer {
  bgUrl?: string;
  isLong: boolean;
  font: string;
}

const PrintContainer = styled.div<IPrintContainer>`
  color: black;
  justify-self: flex-end;
  width: 21cm;
  min-height: 29.7cm;
  background-image: ${(props) => `url(${props.bgUrl})`};
  background-position: center;
  background-size: contain;
  padding: ${(props) => (props.isLong ? "7.5cm 1cm 2cm" : "8.5cm 1.5cm 2cm")};
  break-after: page;

  @media print {
    display: grid;
    column-gap: 10px;
    column-gap: 0.625rem;
  }
  @page {
    size: A4;
  }
  font-family: ${(props) => props.font};
`;

interface IPrintLayout {
  borderColor: string;
  backgroundColor: string;
}

const PrintLayout = styled.div<IPrintLayout>`
  min-height: 100%;
  max-height: 100%;
  border: ${(props) => `2px solid ${props.borderColor}`};
  display: grid;
  .main-table {
    border-bottom: ${(props) => `2px solid ${props.borderColor}`};
    background-color: ${(props) => props.backgroundColor};
  }
`;

interface ITableLayout {
  borderColor: string;
  backgroundColor1: string;
  backgroundColor2: string;
}

const TableLayout = styled.div<ITableLayout>`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  text-align: center;
  font-size: 0.825rem;
  font-size: 0.825em;
  line-height: 160%;
  :nth-child(2n + 3) {
    background-color: ${(props) => props.backgroundColor1};
  }
  :nth-child(2n) {
    background-color: ${(props) => props.backgroundColor2};
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
      border-right: ${(props) => `2px solid ${props.borderColor}`};
      border-left: ${(props) => `2px solid ${props.borderColor}`};
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
  const [color, setColor] = useState<string[]>(colorTable[0]);
  const [font, setFont] = useState(fontTable[0]);

  const onClickBackground = (bg: string) => {
    setBgUrl(bg);
  };

  const onClickPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container>
      <PrintSetting>
        <div className="title">
          <div>1인 1역 프린트</div>
          <Message>
            <div>1인 1역 인쇄는 A4용지에 최적화 되어있습니다.</div>
          </Message>
        </div>
        <SelectedContainer>
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
        </SelectedContainer>
        <SelectedContainer>
          <div className="sub-title">🎨 칼라 선택</div>
          <ColorBoxLayout>
            {colorTable.map(([color1, color2, color3, color4], index) => {
              return (
                <ColorBox key={index} onClick={() => setColor(colorTable[index])} selected={color1 === color[0]}>
                  <Color color={color1}></Color>
                  <Color color={color2}></Color>
                  <Color color={color3}></Color>
                  <Color color={color4}></Color>
                </ColorBox>
              );
            })}
          </ColorBoxLayout>
        </SelectedContainer>
        <SelectedContainer>
          <div className="sub-title">✍️ 폰트 선택</div>
          <FontLayout>
            {fontTable.map(({ name, style }, index) => {
              return (
                <Font
                  key={index}
                  isSelected={font.name === name}
                  font={style}
                  onClick={() => setFont(fontTable[index])}
                >
                  가나다라마
                </Font>
              );
            })}
          </FontLayout>
        </SelectedContainer>
      </PrintSetting>
      {bgUrl && (
        <PrevViewRoles font={font.style}>
          <div className="text">⭐️ 미리보기 ⭐️</div>
          <PrintContainer ref={componentRef} bgUrl={bgUrl} isLong={bgUrl !== BG_ONE} font={font.style}>
            {roles && (
              <PrintLayout borderColor={color[0]} backgroundColor={color[1]}>
                <TableLayout
                  className="main-table"
                  borderColor={color[0]}
                  backgroundColor1={color[2]}
                  backgroundColor2={color[3]}
                >
                  <div className="main">역할</div>
                  <div className="main">하는 일</div>
                  <div className="main">이름</div>
                </TableLayout>
                {roles?.map((item, key) => (
                  <TableLayout key={key} borderColor={color[0]} backgroundColor1={color[2]} backgroundColor2={color[3]}>
                    <div>{item.title}</div>
                    <div>{item.detail}</div>
                    <div>{item.students.map((item) => item.studentName).join(", ")}</div>
                  </TableLayout>
                ))}
                {new Array(25 - roles?.length).fill(null).map((item, key) => {
                  return (
                    <TableLayout
                      key={key}
                      borderColor={color[0]}
                      backgroundColor1={color[2]}
                      backgroundColor2={color[3]}
                    >
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
          <div className="btn" onClick={onClickPrint}>
            인쇄하기
          </div>
        </PrevViewRoles>
      )}
    </Container>
  );
};

export default PrintRoles;
