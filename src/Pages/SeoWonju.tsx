import styled from "styled-components";
import BackgroundImage from "../Components/SeoWonju/BackgroundImage";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const SeoWonju = () => {
  const seoWonjuImage = [
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582646064492604/KakaoTalk_Photo_2022-12-25-23-40-29_010.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582645552795658/KakaoTalk_Photo_2022-12-25-23-40-29_009.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582611331457074/KakaoTalk_Photo_2022-12-25-23-40-28_008.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582610844921936/KakaoTalk_Photo_2022-12-25-23-40-28_007.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582610136072192/KakaoTalk_Photo_2022-12-25-23-40-27_006.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582609448214549/KakaoTalk_Photo_2022-12-25-23-40-27_005.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582608819073155/KakaoTalk_Photo_2022-12-25-23-40-26_004.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582608261226496/KakaoTalk_Photo_2022-12-25-23-40-26_003.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582607573364818/KakaoTalk_Photo_2022-12-25-23-40-25_002.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582607053258752/KakaoTalk_Photo_2022-12-25-23-40-24_001.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582647301812284/KakaoTalk_Photo_2022-12-25-23-40-50_002.jpeg",
    "https://cdn.discordapp.com/attachments/1056582422021554196/1056582646647488562/KakaoTalk_Photo_2022-12-25-23-40-49_001.jpeg",
  ];
  return (
    <Container>
      <Layout>
        {seoWonjuImage.map((image, index) => {
          return <BackgroundImage key={index} image={image} />;
        })}
      </Layout>
    </Container>
  );
};

export default SeoWonju;
