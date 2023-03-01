import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import { TRecentRole, TRolesDate } from "./RolesMain";

const colorTable = [
  ["#fd1b1bd6", "#fd1b1b7f", "#fd1b1b35", "#f9f9f996"],
  ["rgb(126, 40, 26)", "rgb(227, 107, 88, 0.8)", "rgb(249, 179, 168, 0.8)", "rgb(253, 228, 224, 0.7)"],
  ["rgb(230, 0, 115)", "rgb(255, 51, 153, 0.8)", "rgb(255, 128, 191, 0.8)", "rgb(255, 204, 230, 0.7)"],
  ["rgb(19, 57, 38)", "rgb(32, 96, 64, 0.8)", "rgb(51, 153, 102, 0.8)", "rgb(217, 242, 230, 0.7)"],
  ["rgb(92, 118, 21)", "rgb(140, 176, 41, 0.8)", "rgb(191, 217, 60, 0.8)", "rgb(250, 252, 224, 0.7)"],
  ["rgb(39, 129, 107)", "rgb(73, 191, 162, 0.8)", "rgb(156, 237, 217, 0.8)", "rgb(223, 252, 245, 0.7)"],
  ["rgb(0, 107, 230)", "rgb(23, 131, 226, 0.8)", "rgb(77, 160, 255, 0.8)", "rgb(216, 239, 250, 0.7)"],
  ["rgb(0, 153, 204)", "rgb(26, 198, 255, 0.8)", "rgb(102, 217, 255, 0.8)", "rgb(179, 236, 255, 0.7)"],
  ["rgb(124, 105, 10)", "rgb(247, 204, 30, 0.8)", "rgb(252, 221, 97, 0.8)", "rgb(255, 254, 214, 0.7)"],
  ["rgb(204, 136, 0)", "rgb(255, 170, 0, 0.8)", "rgb(255, 195, 77, 0.8)", "rgb(255, 238, 204, 0.7)"],
  ["rgb(204, 68, 0)", "rgb(255, 102, 26, 0.8)", "rgb(255, 136, 77, 0.8)", "rgb(255, 221, 204, 0.7)"],
  ["rgb(255, 132, 0)", "rgb(255, 156, 51, 0.8)", "rgb(255, 193, 128, 0.8)", "rgb(255, 243, 230, 0.7)"],
  ["rgb(77, 25, 51)", "rgb(135, 44, 89, 0.8)", "rgb(205, 101, 153, 0.8)", "rgb(249, 236, 242, 0.7)"],
  ["rgb(54, 45, 74)", "rgb(116, 97, 162, 0.8)", "rgb(203, 184, 247, 0.8)", "rgb(242, 239, 249, 0.7)"],
  ["rgb(94, 100, 133)", "rgb(125, 132, 180, 0.8)", "rgb(126, 139, 222, 0.8)", "rgb(221, 225, 253, 0.7)"],
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

const BG_ONE = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398236994514984/06.png";
const BG_TWO = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398236017250456/02.png";
const BG_THREE = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398236252123206/03.png";
const BG_FOUR = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398236474413136/04.png";
const BG_FIVE = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398236730282074/05.png";
const BG_SIX = "https://cdn.discordapp.com/attachments/1012001449854648480/1080398235690086400/01.png";

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
  .info {
    opacity: 0.8;
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
  grid-template-columns: repeat(5, 1fr);
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
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
  padding: 5.6cm 1cm 2cm;
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
  grid-template-rows: auto 1fr;
  .main-table {
    border-bottom: ${(props) => `2px solid ${props.borderColor}`};
    background-color: ${(props) => props.backgroundColor};
  }
`;

interface ITbles {
  length: number;
}

const Tables = styled.div<ITbles>`
  min-height: 100%;
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.length}, auto)`};
`;

interface ITableLayout {
  borderColor: string;
  backgroundColor1: string;
  backgroundColor2: string;
}

const TableLayOutTitle = styled.div<ITableLayout>`
  display: grid;
  grid-template-columns: 0.8fr 2fr 1fr;
  text-align: center;
  font-size: 0.825rem;
  font-size: 0.825em;
  line-height: 160%;
  background-color: ${(props) => props.backgroundColor1};
  div {
    :nth-child(2) {
      border-right: ${(props) => `2px solid ${props.borderColor}`};
      border-left: ${(props) => `2px solid ${props.borderColor}`};
    }
  }
`;

const TableLayout = styled.div<ITableLayout>`
  display: grid;
  grid-template-columns: 0.8fr 2fr 1fr;
  text-align: center;
  font-size: 0.825rem;
  font-size: 0.825em;
  line-height: 160%;
  :nth-child(2n - 3) {
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
          <div className="info">배경화면을 선택하면 아래에 미리보기가 생성됩니다.</div>
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
          <PrintContainer ref={componentRef} bgUrl={bgUrl} font={font.style}>
            {roles && (
              <PrintLayout borderColor={color[0]} backgroundColor={color[1]}>
                <TableLayOutTitle
                  className="main-table"
                  borderColor={color[0]}
                  backgroundColor1={color[2]}
                  backgroundColor2={color[3]}
                >
                  <div className="main">역할</div>
                  <div className="main">하는 일</div>
                  <div className="main">이름</div>
                </TableLayOutTitle>
                <Tables length={roles?.length}>
                  {roles?.map((item, key) => (
                    <TableLayout
                      key={key}
                      borderColor={color[0]}
                      backgroundColor1={color[2]}
                      backgroundColor2={color[3]}
                    >
                      <div>{item.title}</div>
                      <div>{item.detail}</div>
                      <div>{item.students.map((item) => item.studentName).join(", ")}</div>
                    </TableLayout>
                  ))}
                </Tables>
                {/* {new Array(25 - roles?.length).fill(null).map((item, key) => {
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
                })} */}
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
